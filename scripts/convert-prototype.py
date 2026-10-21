#!/usr/bin/env python3
"""One-shot converter: Claude Design prototype template (design/PetSocial App.dc.html)
-> React TSX components. Keeps every inline style verbatim so the UI stays pixel-identical.

Usage: npm run convert   (python3 scripts/convert-prototype.py)
Writes src/screens/*, src/components/* and src/styles/interactions.css. Re-running
overwrites them, so re-apply any hand edits made to those files afterwards.
"""
import html, json, os, re, sys
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'design', 'PetSocial App.dc.html')
OUT = os.path.join(ROOT, 'src')

VOID = {'img', 'input', 'br', 'hr', 'meta', 'link', 'source'}
CAMEL = 'sc-camel-'

class Node:
    def __init__(self, tag, attrs=None, parent=None):
        self.tag, self.attrs, self.parent, self.children = tag, attrs or [], parent, []

class Text:
    def __init__(self, text): self.text = text

class Comment:
    def __init__(self, text): self.text = text

class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node('#root'); self.cur = self.root
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.cur); self.cur.children.append(n)
        if tag not in VOID: self.cur = n
    def handle_startendtag(self, tag, attrs):
        self.cur.children.append(Node(tag, attrs, self.cur))
    def handle_endtag(self, tag):
        if tag in VOID: return
        n = self.cur
        while n is not None and n.tag != tag: n = n.parent
        if n is None: raise SystemExit('unbalanced </%s>' % tag)
        self.cur = n.parent
    def handle_data(self, d): self.cur.children.append(Text(d))
    def handle_comment(self, d): self.cur.children.append(Comment(d.strip()))

def encode_camel(s):
    return re.sub(r'(\s)([a-z]+[A-Z][A-Za-z0-9]*)(\s*=)',
                  lambda m: m.group(1) + CAMEL + re.sub(r'[A-Z]', lambda c: '-' + c.group().lower(), m.group(2)) + m.group(3), s)

def kebab_to_camel(s): return re.sub(r'-([a-z])', lambda m: m.group(1).upper(), s)

# ---------- pseudo-class utility classes ----------
PSEUDO = {}  # (pseudo, css) -> class name
def pseudo_class(pseudo, css):
    k = (pseudo, css)
    if k not in PSEUDO:
        m = re.fullmatch(r'transform:scale\(\.(\d+)\)', css)
        if pseudo == 'active' and m: name = 'tap-' + m.group(1)
        else: name = '%s-%d' % (pseudo, sum(1 for p, _ in PSEUDO if p == pseudo) + 1)
        PSEUDO[k] = name
    return PSEUDO[k]

def important(css):
    return ';'.join(d.strip() + ' !important' for d in css.split(';') if d.strip())

# ---------- expressions ----------
INTERP = re.compile(r'\{\{([\s\S]+?)\}\}')

def path_expr(p, scope):
    p = p.strip()
    m = re.match(r'[A-Za-z_$][A-Za-z0-9_$]*', p)
    if not m or not re.fullmatch(r'[A-Za-z_$][A-Za-z0-9_$]*(\.[A-Za-z_$0-9][A-Za-z0-9_$]*)*', p):
        raise SystemExit('unsupported expression: ' + p)
    head, rest = m.group(), p[m.end():]
    rest = rest.replace('.', '?.')
    base = head if head in scope else 'v.' + head
    return base + rest

def attr_value(raw, scope):
    """Returns a JSX attribute value source (with braces) or a quoted string."""
    whole = re.fullmatch(r'\s*\{\{([\s\S]+?)\}\}\s*', raw)
    if whole: return '{' + path_expr(whole.group(1), scope) + '}'
    if '{{' in raw:
        parts = INTERP.split(raw)
        out = ''
        for i, s in enumerate(parts):
            if i & 1: out += '${' + path_expr(s, scope) + ' ?? ""}'
            else: out += s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
        return '{`' + out + '`}'
    return json.dumps(raw, ensure_ascii=False) if ('"' in raw or '\\' in raw) else '"' + raw + '"'

def css_obj_static(css):
    items = []
    for decl in css.split(';'):
        if ':' not in decl: continue
        k, val = decl.split(':', 1)
        k = k.strip(); val = val.strip()
        key = k if k.startswith('--') else kebab_to_camel(k)
        if not re.fullmatch(r'[A-Za-z_$][A-Za-z0-9_$]*', key): key = json.dumps(key)
        items = [it for it in items if it[0] != key]  # later declarations win, as in CSS
        items.append((key, json.dumps(val, ensure_ascii=False)))
    items = ['%s: %s' % it for it in items]
    return '{{ ' + ', '.join(items) + ' }}'

def style_value(raw, scope):
    raw = raw.strip()
    if '{{' not in raw: return css_obj_static(raw)
    whole = re.fullmatch(r'\{\{([\s\S]+?)\}\}', raw)
    if whole: return '{sx(' + path_expr(whole.group(1), scope) + ')}'
    return '{sx(' + attr_value(raw, scope)[1:-1] + ')}'

SVG_KEEP = {'viewBox', 'preserveAspectRatio'}

def convert_attrs(n, scope, ctx):
    out, classes = [], []
    for name, value in n.attrs:
        value = '' if value is None else value
        if name.startswith(CAMEL): name = kebab_to_camel(name[len(CAMEL):])
        if name in ('hint-placeholder-count', 'hint-placeholder-val', 'data-dc-tpl', 'sc-name'): continue
        if name.startswith('style-'):
            classes.append(pseudo_class(name[6:], value)); continue
        if name == 'style':
            out.append('style=' + style_value(value, scope)); continue
        if name == 'class': name = 'className'
        elif name == 'for': name = 'htmlFor'
        elif name == 'autofocus': name = 'autoFocus'
        elif name.startswith('on'): name = 'on' + name[2].upper() + name[3:]
        elif '-' in name and not name.startswith(('data-', 'aria-')): name = kebab_to_camel(name)
        elif name == 'clip-path': name = 'clipPath'
        if name in ('value', 'checked') and n.tag in ('input', 'textarea', 'select'):
            whole = re.fullmatch(r'\s*\{\{([\s\S]+?)\}\}\s*', value)
            if whole:
                dflt = 'false' if name == 'checked' else '""'
                out.append('%s={%s ?? %s}' % (name, path_expr(whole.group(1), scope), dflt)); continue
        if name in ('rows', 'maxLength', 'cols') and value.isdigit():
            out.append('%s={%s}' % (name, value)); continue
        if value == '' and name in ('autoFocus', 'multiple', 'disabled', 'readOnly', 'required'):
            out.append(name); continue
        out.append(name + '=' + attr_value(value, scope))
    if classes:
        out.append('className="%s"' % ' '.join(classes))
    return out

def static_style(n):
    for k, v in n.attrs:
        if k == 'style': return v or ''
    return ''

def is_flex_parent(n):
    st = static_style(n).replace(' ', '')
    return 'display:flex' in st or 'display:grid' in st or 'display:inline-flex' in st

def eff_children(n):
    return [c for c in n.children if not isinstance(c, Comment) and not (isinstance(c, Node) and c.tag == 'metadata')]

def jsx_text(s):
    s = re.sub(r'\s+', ' ', s)
    if re.search(r'[{}<>"\'&]', s) or s != s.strip() or not s:
        return '{' + json.dumps(s, ensure_ascii=False) + '}'
    return s

class Gen:
    def __init__(self):
        self.uses_txt = False; self.uses_sx = False; self.uses_list = False; self.uses_fragment = False

    def children(self, n, scope, ind, flex_parent=None):
        if flex_parent is None: flex_parent = is_flex_parent(n)
        kids = eff_children(n)
        lines = []
        for i, c in enumerate(kids):
            first, last = i == 0, i == len(kids) - 1
            if isinstance(c, Text):
                t = c.text
                if not t.strip():
                    if first or last or flex_parent or '\n' in t and self._block_neighbors(kids, i): continue
                    if ' ' not in t and '\n' not in t: continue
                    lines.append(ind + '{" "}'); continue
                if '{{' in t:
                    parts = INTERP.split(t)
                    only = len(kids) == 1 and not parts[0].strip() and not parts[-1].strip() and len(parts) == 3
                    if only:
                        lines.append(ind + '{' + path_expr(parts[1], scope) + '}'); continue
                    segs = []
                    for j, s in enumerate(parts):
                        if j & 1:
                            self.uses_txt = True
                            segs.append('{txt(' + path_expr(s, scope) + ')}')
                        elif s:
                            if j == 0 and first: s = s.lstrip()
                            if j == len(parts) - 1 and last: s = s.rstrip()
                            if s: segs.append(jsx_text(s))
                    lines.append(ind + ''.join(segs))
                else:
                    s = t
                    if first: s = s.lstrip()
                    if last: s = s.rstrip()
                    lines.append(ind + jsx_text(s))
            elif isinstance(c, Node):
                lines.extend(self.node(c, scope, ind))
        return lines

    def _block_neighbors(self, kids, i):
        blocks = {'div', 'p', 'h1', 'h2', 'h3', 'section', 'header', 'nav', 'sc-if', 'sc-for', 'svg', 'label', 'textarea', 'button', 'img', 'input', 'span', 'b'}
        prev = next((k for k in reversed(kids[:i]) if not isinstance(k, Text) or k.text.strip()), None)
        nxt = next((k for k in kids[i + 1:] if not isinstance(k, Text) or k.text.strip()), None)
        # whitespace containing a newline between two elements: the prototype rendered it,
        # so keep it only when an inline neighbour could make it visible
        def inline(k): return isinstance(k, Text) or (isinstance(k, Node) and k.tag in ('span', 'b', 'a', 'img', 'button', 'input', 'svg', 'label') and 'display:block' not in static_style(k) and 'display:flex' not in static_style(k) and 'position:absolute' not in static_style(k))
        return not (inline(prev) and inline(nxt))

    def node(self, n, scope, ind):
        if n.tag == 'sc-if':
            cond = path_expr(re.fullmatch(r'\s*\{\{([\s\S]+?)\}\}\s*', dict(n.attrs)['value']).group(1), scope)
            inner = self.wrap(n, scope, ind + '  ')
            return [ind + '{' + cond + ' ? ('] + inner + [ind + ') : null}']
        if n.tag == 'sc-for':
            a = dict(n.attrs)
            lst = path_expr(re.fullmatch(r'\s*\{\{([\s\S]+?)\}\}\s*', a['list']).group(1), scope)
            var = a.get('as', 'item')
            sub = scope | {var}
            self.uses_list = True
            els = [c for c in eff_children(n) if isinstance(c, Node)]
            texts = [c for c in eff_children(n) if isinstance(c, Text) and c.text.strip()]
            idx = '$i' if var != '$i' else '$j'
            if len(els) == 1 and not texts and els[0].tag not in ('sc-if', 'sc-for'):
                body = self.element(els[0], sub, ind + '  ', key=idx)
            else:
                self.uses_fragment = True
                body = [ind + '  <Fragment key={%s}>' % idx] + self.children(n, sub, ind + '    ', flex_parent=is_flex_parent(n.parent)) + [ind + '  </Fragment>']
            return [ind + '{list(%s).map((%s: any, %s: number) => (' % (lst, var, idx)] + body + [ind + '))}']
        return self.element(n, scope, ind)

    def wrap(self, n, scope, ind):
        kids = [c for c in eff_children(n) if not (isinstance(c, Text) and not c.text.strip())]
        if len(kids) == 1 and isinstance(kids[0], Node) and kids[0].tag not in ('sc-if', 'sc-for'):
            return self.element(kids[0], scope, ind)
        return [ind + '<>'] + self.children(n, scope, ind + '  ', flex_parent=is_flex_parent(n.parent) if n.parent else False) + [ind + '</>']

    def element(self, n, scope, ind, key=None):
        if n.tag in ('sc-if', 'sc-for'): return self.node(n, scope, ind)
        tag = n.tag
        if tag == 'clippath': tag = 'clipPath'
        attrs = convert_attrs(n, scope, self)
        if any(a.startswith('style={sx(') for a in attrs): self.uses_sx = True
        if key: attrs.insert(0, 'key={%s}' % key)
        open_ = '<' + tag + (' ' + ' '.join(attrs) if attrs else '')
        kids = eff_children(n)
        if tag in VOID or not kids or all(isinstance(k, Text) and not k.text.strip() for k in kids):
            if tag == 'textarea' or not kids or tag in VOID:
                return [ind + open_ + ' />']
        body = self.children(n, scope, ind + '  ')
        if not body: return [ind + open_ + ' />']
        one = len(body) == 1 and len(ind + open_ + body[0].strip()) < 150 and '\n' not in body[0]
        if one: return [ind + open_ + '>' + body[0].strip() + '</' + tag + '>']
        return [ind + open_ + '>'] + body + [ind + '</' + tag + '>']

def module(name, body_lines, gen, props_doc=None, extra_imports=''):
    imps = []
    if gen.uses_fragment: imps.append("import { Fragment } from 'react'")
    helpers = [h for h, u in (('list', gen.uses_list), ('sx', gen.uses_sx), ('txt', gen.uses_txt)) if u]
    imp_line = "import type { Vals } from '%s/lib/view'" % props_doc
    if helpers: imp_line = "import { %s, type Vals } from '%s/lib/view'" % (', '.join(helpers), props_doc)
    imps.append(imp_line)
    return '\n'.join(imps) + '\n' + extra_imports + '\nexport function %s({ v }: { v: Vals }) {\n  return (\n' % name + '\n'.join(body_lines) + '\n  )\n}\n'

# The prototype drew a fake 47px iPhone status bar and a home indicator. On device those are
# the real safe-area insets: --sb (top) and --sab (bottom), defined in global.css.
SB = 'var(--sb)'
BOTTOM = 'var(--sab)'
SAFE_AREA = [
    ('position:absolute;top:47px;', 'position:absolute;top:%s;' % SB, 2),
    ('padding-top:47px', 'padding-top:' + SB, 1),
    ('padding:47px 0 40px', 'padding:%s 0 40px' % SB, 1),
    ('position:sticky;top:46px', 'position:sticky;top:max(calc(%s - 1px),0px)' % SB, 1),
    ('position:absolute;top:56px;', 'position:absolute;top:calc(%s + 9px);' % SB, 5),
    ('left:50%;top:60px;', 'left:50%%;top:calc(%s + 13px);' % SB, 1),
    ('right:20px;top:170px;', 'right:20px;top:calc(%s + 123px);' % SB, 1),
    ('padding: 59px 20px 0;', 'padding:calc(%s + 12px) 20px 0;' % SB, 1),
    ('padding-bottom:22px">', 'padding-bottom:max(22px,%s)">' % BOTTOM, 1),
    ('padding:10px 16px 30px', 'padding:10px 16px max(30px,%s)' % BOTTOM, 1),
    ('padding:12px 20px 30px', 'padding:12px 20px max(30px,%s)' % BOTTOM, 6),
    ('padding:12px 20px 34px', 'padding:12px 20px max(34px,%s)' % BOTTOM, 4),
    ('padding:10px 16px 26px', 'padding:10px 16px max(26px,%s)' % BOTTOM, 1),
]

def main():
    src = open(SRC, encoding='utf-8').read()
    a = src.index('<x-dc>') + len('<x-dc>'); b = src.rindex('</x-dc>')
    tpl = src[a:b]
    tpl = re.sub(r'<metadata>[\s\S]*?</metadata>', '', tpl)
    for old, new, count in SAFE_AREA:
        n = tpl.count(old)
        if n != count: raise SystemExit('safe-area pattern %r found %d times, expected %d' % (old, n, count))
        tpl = tpl.replace(old, new)
    p = P(); p.feed(encode_camel(tpl)); p.close()
    root = p.root

    def find(n, pred):
        if isinstance(n, Node):
            if pred(n): return n
            for c in n.children:
                r = find(c, pred)
                if r: return r
    phone = find(root, lambda n: dict(n.attrs).get('data-screen-label') == 'Phone')
    screen_box = [c for c in phone.children if isinstance(c, Node)][0]
    scroll = [c for c in screen_box.children if isinstance(c, Node) and dict(c.attrs).get('ref')][0]

    def groups(container):
        out, label, cur = [], None, []
        for c in container.children:
            if isinstance(c, Comment):
                if cur: out.append((label, cur))
                label, cur = c.text, []
            elif isinstance(c, Node):
                cur.append(c)
        if cur: out.append((label, cur))
        return out

    SCREEN_NAMES = {
        'SPLASH': 'SplashScreen', 'ONBOARDING': 'OnboardingScreen', 'AUTH': 'AuthScreen', 'PET SETUP': 'PetSetupScreen',
        'HOME': 'HomeScreen', 'EXPLORE': 'ExploreScreen', 'LOCATION PERMISSION': 'LocationPermission', 'SEARCH': 'SearchScreen',
        'SEARCH RESULTS': 'SearchResultsScreen', 'DETAIL': 'ProviderDetailScreen', 'BOOKING': 'BookingScreen',
        'RESERVATIONS': 'ReservationsScreen', 'LIVE SERVICE': 'LiveServiceScreen', 'MESSAGES': 'MessagesScreen',
        'PET DETAIL': 'PetDetailScreen', 'PET FORM': 'PetFormScreen', 'PAYMENTS': 'PaymentsScreen', 'HELP': 'HelpScreen',
        'REVIEW': 'ReviewScreen', 'REVIEW DONE': 'ReviewDoneScreen', 'CERT REQUEST': 'CertRequestScreen',
        'CERT VIEW': 'CertViewScreen', 'FAVORITES': 'FavoritesScreen', 'PROFILE': 'ProfileScreen',
        'CHAT / PET AI': 'ChatScreen', 'SOS': 'SOSScreen',
    }
    OVERLAY_NAMES = {'showTabs': 'TabBar', 'sosOpen': 'SOSSheet', 'placeSheet': 'PlaceSheet', 'petSheet': 'PetSheet',
                     'certQrOpen': 'CertQrOverlay', 'locMapOpen': 'LocationMapOverlay', 'extrasSheet': 'ExtrasSheet',
                     'cardSheet': 'CardSheet'}
    BAR_NAMES = {'isDetail': 'DetailBar', 'isCert': 'CertBar', 'isReview': 'ReviewBar', 'liveComposer': 'LiveComposerBar',
                 'isPetForm': 'PetFormBar', 'toast': 'Toast', 'isStep12': 'BookingBar'}

    os.makedirs(os.path.join(OUT, 'screens'), exist_ok=True)
    os.makedirs(os.path.join(OUT, 'components'), exist_ok=True)
    shell_screens = []
    for label, nodes in groups(scroll):
        name = SCREEN_NAMES[label]
        g = Gen()
        ifs = [n for n in nodes if n.tag == 'sc-if']
        if len(ifs) == 1:
            cond = re.search(r'\{\{\s*(\w+)\s*\}\}', dict(ifs[0].attrs)['value']).group(1)
            body = g.wrap(ifs[0], set(), '    ')
            shell_screens.append((cond, name))
        else:
            body = ['    <>'] + sum((g.node(n, set(), '      ') for n in nodes), []) + ['    </>']
            shell_screens.append((None, name))
        open(os.path.join(OUT, 'screens', name + '.tsx'), 'w').write(module(name, body, g, props_doc='..'))

    overlays, bars = [], []
    for c in screen_box.children:
        if not isinstance(c, Node) or c.tag != 'sc-if': continue
        cond = re.search(r'\{\{\s*(\w+)\s*\}\}', dict(c.attrs)['value']).group(1)
        name = OVERLAY_NAMES.get(cond) or BAR_NAMES.get(cond)
        g = Gen()
        body = g.wrap(c, set(), '    ')
        open(os.path.join(OUT, 'components', name + '.tsx'), 'w').write(module(name, body, g, props_doc='..'))
        (bars if cond in BAR_NAMES else overlays).append((cond, name))

    css = '/* Generated from the prototype\'s style-active / style-hover / style-focus attributes. */\n'
    for (pseudo, rule), name in PSEUDO.items():
        sel = '.%s:%s' % (name, pseudo)
        if pseudo == 'hover': css += '@media (hover: hover) {\n  %s { %s }\n}\n' % (sel, important(rule))
        else: css += '%s { %s }\n' % (sel, important(rule))
    open(os.path.join(OUT, 'styles', 'interactions.css'), 'w').write(css)
    json.dump({'screens': shell_screens, 'overlays': overlays, 'bars': bars},
              open(os.path.join(ROOT, 'scripts', 'layout.json'), 'w'), indent=1)
    print('screens', len(shell_screens), 'overlays', len(overlays), 'bars', len(bars), 'pseudo', len(PSEUDO))

main()
