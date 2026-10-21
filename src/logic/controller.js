// App state and behaviour (ported from the prototype's logic class).
import React from 'react'
import { copyText, openExternal, saveFile } from '../lib/native'
import {
  PROVIDERS, POS, SVC, PETS, SEM, CATS, TIMES, CARD_BG,
  CARD_LABEL, CARDS, SUPPORT_AVATAR, EXTRAS, CERT_TYPES, CERT_PROS, CERT_COUNTRIES, CERT_AIRLINES,
  CERT_DOMESTIC, isoDate, qrMatrix, qrDataUrl, CERT_ICON, pdfEsc, buildPdf, wrapTxt,
  RV_LABELS, RV_TAGS, FAQS, HELP_TOPICS, PROMOS, TABS, ONB, MAIN,
  fmt, DEF_PHOTO, DOW, MON, dayAt, hhmm, minAgo, REGIONS,
  placeOf, inRegion, flowOf, LIVE_START, AI_HELLO, REQ_ST,
} from './data'

export class Controller extends React.Component {
  scrollRef = React.createRef();
  state = {
    screen: ((this.props && this.props.startScreen) || 'splash').replace('petai', 'chat'), hist: [],
    onb: 0, loc: null, locAsk: false, setup: { species: 'Perro', name: '', photo: null }, setupTried: false, authMode: 'login', auth: { name: '', email: '', password: '', confirm: '' }, authLoading: false, pid: 'prv-petspa', dtab: 'description', step: 1, petId: null, petView: 'pet-max', pets: PETS.map(p => ({ ...p })), form: null, formTried: false, toast: '', petSheet: false, sq: '', sqCommitted: '', rCat: null, rFilter: '', rSort: 0, recent: ['Hotel para perros','Paseo canino','Veterinaria 24hrs','Guardería gatos','Peluquería canina'], day: null, time: null, notes: '',
    card: 'visa', petTab: 'resumen', histFilter: 'all', resSub: 'all', favSort: 'used', favCat: 'all', certs: [{ id:'cert-seed', petId:'pet-max', type:'intl', country:'Argentina', airline:'LATAM', travel: dayAt(6), proId:'vet', slot:'', status:'issued', stage:3, folio:'PS-INT-48217', createdAt: dayAt(-3), issuedAt: dayAt(-2), total: 35900, chip:false }], certForm: null, certId: null, certQr: false, locMap: false, homeCat: 'todos', hFilter: '', hSort: 0, readAt: {}, extras: {}, extrasSheet: false, extrasSeen: false, cards: CARDS.map(c => ({ ...c })), cf: { num:'', name:'', exp:'', cvv:'' }, cfTried: false, helpQ: '', helpTopic: 'all', helpOpen: 0, rv: null, rvDone: null, myReviews: [], mapRegion: 'rm', mapComuna: '', placeSheet: false, placeDraft: null, liveId: 'r0', liveInput: '', liveTyping: false, cardSheet: false, sosOpen: false, sosMode: 'emergency',
    cat: 'todos', query: '', liked: { 'prv-happy': Date.now() - 2 * 864e5, 'prv-petspa': Date.now() - 12 * 864e5, 'prv-peludo': Date.now() - 20 * 864e5, 'prv-casa': Date.now() - 3600e3 }, activePet: 0, promo: 0,
    chatId: 'ai', input: '', typing: false, notif: true, coins: 250, code: 'PS-T2HVRM',
    threads: {
      ai: [AI_HELLO],
      'prv-happy': [{ role:'them', text:'¡Hola Diego! Mañana paso por Max a las 9:00. ¿Tiene alguna indicación especial?' }],
      'prv-patitas': [{ role:'them', text:'Tu reserva de 3 noches quedó registrada. Te enviaremos fotos diarias 🐾' }],
    },
    resTab: 'upcoming',
    reservations: [
      { id:'r0', pid:'prv-petspa', petId:'pet-max', date: dayAt(0), time: hhmm(LIVE_START), price:22900, status:'live', stage:1, start: LIVE_START.getTime(), tip:0, rating:0, rated:false, receipt:'PS-8K2QW',
        feed: [
          { kind:'event', stage:0, time: hhmm(LIVE_START) },
          { kind:'msg', role:'them', text:'¡Hola! Max ya está con nosotros. Te iré contando por aquí cómo va todo.', time: hhmm(minAgo(24)) },
          { kind:'msg', role:'user', text:'¡Gracias! Recuerda que es alérgico al pollo, no le den premios.', time: hhmm(minAgo(23)) },
          { kind:'msg', role:'them', text:'Anotado, lo vimos en su ficha. Solo usamos premios hipoalergénicos.', time: hhmm(minAgo(22)) },
          { kind:'event', stage:1, time: hhmm(minAgo(9)) },
        ] },
      { id:'r1', pid:'prv-happy', pet:'Max', date: dayAt(1), time:'09:00', price:8000, status:'upcoming', approval:'accepted' },
      { id:'r4', pid:'prv-petspa', pet:'Luna', date: dayAt(3), time:'11:30', price:22900, status:'upcoming', approval:'pending' },
      { id:'r2', pid:'prv-patitas', pet:'Max', date: dayAt(7), time:'10:00', price:54000, status:'upcoming', approval:'accepted' },
      { id:'r5', pid:'prv-amigos', pet:'Max', date: dayAt(2), time:'15:00', price:9000, status:'cancelled', approval:'accepted', cancelledAt: dayAt(-4), cancelBy:'Tú' },
      { id:'r3', pid:'prv-peludo', pet:'Luna', date: dayAt(-3), time:'16:00', price:30000, status:'completed' },
    ],
  };

  top() { requestAnimationFrame(() => { const el = this.scrollRef.current; if (el) el.scrollTop = 0; }); }
  go = (screen, extra = {}) => {
    if (screen === 'petai') { screen = 'chat'; extra = { chatId: 'ai', ...extra }; }
    if (screen === 'explore' && this.state.loc !== 'granted') extra = { locAsk: this.state.loc == null, ...extra };
    if (screen === 'splash') { clearTimeout(this._splash); this._splash = setTimeout(this.startOnb, 1600); }
    if (screen !== this.state.screen) extra = { locMap: false, certQr: false, ...extra };
    if (screen === 'booking' && extra.step == null) extra = { step: 1, extras: {}, extrasSeen: false, ...extra }; this.setState(s => ({ hist: MAIN.includes(screen) ? [] : [...s.hist, s.screen], screen, sosOpen: false, ...extra })); this.top(); };
  back = () => { this.setState(s => { const h = [...s.hist]; const prev = h.pop() || 'home'; return { hist: h, screen: prev }; }); this.top(); };
  toggleLike = id => e => { e && e.stopPropagation(); const was = !!this.state.liked[id]; this.setState(s => { const l = { ...s.liked }; if (l[id]) delete l[id]; else l[id] = Date.now(); return { liked: l }; }); const p = PROVIDERS.find(x => x.id === id); this.flash(was ? 'Quitado de favoritos' : (p ? p.name : 'Servicio') + ' agregado a favoritos'); };

  send = text => {
    text = (text || '').trim(); if (!text) return;
    const id = this.state.chatId;
    this.setState(s => ({ input: '', typing: true, threads: { ...s.threads, [id]: [...s.threads[id], { role:'user', text }] } }));
    const delay = this.props.aiDelay ?? 1800;
    clearTimeout(this._t);
    this._t = setTimeout(() => {
      const reply = id === 'ai'
        ? { role:'ai', suggest:true, text:'Entiendo. Lo que describes podría tener varias causas. No puedo diagnosticar — solo un veterinario puede hacerlo — pero te recomiendo agendar una consulta presencial dentro de las próximas 24 horas.' }
        : id === 'support' ? { role:'them', text:'Gracias por escribirnos. Ya tomé tu caso: te respondo por aquí en unos minutos con la solución.' } : { role:'them', text:'¡Perfecto! Lo tengo anotado. Cualquier cosa me escribes por aquí.' };
      this.setState(s => ({ typing: false, threads: { ...s.threads, [id]: [...s.threads[id], reply] } }));
      const el = this.scrollRef.current; if (el) el.scrollTop = el.scrollHeight;
    }, delay);
    requestAnimationFrame(() => { const el = this.scrollRef.current; if (el) el.scrollTop = el.scrollHeight; });
  };
  componentWillUnmount() { clearInterval(this._liveTick); clearTimeout(this._liveReply); clearTimeout(this._splash); clearTimeout(this._auth); clearTimeout(this._t); clearTimeout(this._toast); clearTimeout(this._certA); clearTimeout(this._certB); }

  card(p, i) {
    const liked = !!this.state.liked[p.id];
    return { ...p, delay: Math.min(i || 0, 8) * 55 + 'ms', price: fmt(p.price), tagLabel: p.tag, service: SVC[p.service],
      heartFill: liked ? '#F35843' : 'none', heartStroke: liked ? '#F35843' : '#34343D', heartStrokeList: liked ? '#F35843' : '#A5A5AD',
      onClick: () => this.go('detail', { pid: p.id, dtab: 'description' }), onLike: this.toggleLike(p.id) };
  }

  formVals() {
    const s = this.state, f = s.form;
    if (!f) return { f: {}, fOn: {}, fSw: {} };
    const t = k => e => this.setF(k, e.target.value);
    const swv = k => ({ [k + 'Bg']: f[k] ? '#4700D8' : '#E3E3E7', [k + 'Left']: f[k] ? '23px' : '3px' });
    const nameError = s.formTried && !f.name.trim();
    return {
      f: { ...f, photoShown: f.photo || DEF_PHOTO[f.species] },
      fOn: { name: t('name'), breed: t('breed'), age: t('age'), weight: t('weight'), allergies: t('allergies'),
        vaccinated: () => this.setF('vaccinated', !f.vaccinated), sterilized: () => this.setF('sterilized', !f.sterilized) },
      fSw: { ...swv('vaccinated'), ...swv('sterilized') },
      formTitle: f.id ? 'Editar mascota' : 'Nueva mascota', saveLabel: f.id ? 'Guardar cambios' : 'Añadir mascota',
      photoHint: f.photo ? 'Toca para cambiar la foto' : 'Toca para subir una foto',
      nameError, nameBorder: nameError ? '#DC2626' : '#E3E3E7',
      canDelete: !!f.id && s.pets.length > 1,
      speciesOpts: ['Perro', 'Gato', 'Otro'].map(label => { const on = f.species === label; return { label, bg: on ? '#FFFFFF' : 'transparent', color: on ? '#0F0F12' : '#7E7E87', shadow: on ? '0 1px 3px rgba(15,15,18,0.06)' : 'none', onClick: () => this.setF('species', label) }; }),
      onPhoto: e => { const file = e.target.files && e.target.files[0]; if (!file) return; const r = new FileReader(); r.onload = () => this.setF('photo', r.result); r.readAsDataURL(file); },
    };
  }

  mapVals(all) {
    const s = this.state, reg = REGIONS.find(r => r.id === s.mapRegion);
    const results = all.map((p, i) => ({ ...p, comuna: placeOf(p, i, reg), _i: i })).filter(p => inRegion(p._i, reg) && (!s.mapComuna || p.comuna === s.mapComuna));
    const placeName = s.mapComuna || reg.name;
    const d = s.placeDraft || { region: s.mapRegion, comuna: s.mapComuna }, dreg = REGIONS.find(r => r.id === d.region);
    const chip = on => ({ bg: on ? '#1C1C22' : '#FFFFFF', color: on ? '#FFFFFF' : '#34343D', border: on ? '#1C1C22' : '#E3E3E7' });
    const setD = x => this.setState(st => ({ placeDraft: { ...(st.placeDraft || { region: st.mapRegion, comuna: st.mapComuna }), ...x } }));
    const place = {
      mapPh: 'Buscar en ' + placeName, placeName, mapEmpty: results.length === 0,
      placeSheet: s.placeSheet && s.screen === 'explore',
      openPlace: () => this.setState({ placeSheet: true, placeDraft: { region: s.mapRegion, comuna: s.mapComuna } }),
      closePlace: () => this.setState({ placeSheet: false, placeDraft: null }),
      placeRegions: REGIONS.map(r => { const on = r.id === d.region; return { name: r.name, count: r.comunas.length + ' comunas', bg: on ? '#F4EEFE' : '#FFFFFF', border: on ? '2px solid #4700D8' : '1px solid #E3E3E7', checkBg: on ? '#4700D8' : 'transparent', checkBorder: on ? 'none' : '2px solid #E3E3E7', check: on ? '✓' : '', onClick: () => setD({ region: r.id, comuna: '' }) }; }),
      placeComunas: ['', ...dreg.comunas].map(c => ({ label: c || 'Todas', ...chip(d.comuna === c), onClick: () => setD({ comuna: c }) })),
      placeDraftName: d.comuna || dreg.name,
      applyPlace: () => { this.setState({ mapRegion: d.region, mapComuna: d.comuna, placeSheet: false, placeDraft: null, mapSel: null }); this.flash('Mostrando ' + (d.comuna || dreg.name)); },
      placeUseMine: () => { this.setState({ mapRegion: 'rm', mapComuna: 'Vitacura', placeSheet: false, placeDraft: null, mapSel: null }); this.flash('Mostrando Vitacura'); },
    };
    const sel = results.find(p => p.id === s.mapSel) || results[0];
    return {
      pins: results.map(p => { const on = sel && p.id === sel.id; const pos = POS[p.id];
        return { x: pos[0], y: pos[1], z: on ? 3 : 2, price: p.price, short: p.name.split(' ').slice(0, 2).join(' '),
          bg: on ? '#4700D8' : '#FFFFFF', border: on ? '2px solid #3300A8' : '2px solid #FFFFFF',
          priceColor: on ? '#FFFFFF' : '#4700D8', nameColor: on ? '#FFFFFF' : '#7E7E87',
          onClick: () => this.setState({ mapSel: p.id }) }; }),
      ...place,
      mapCard: sel || null,
      compassBottom: results.length ? '330px' : '220px',
      mapCats: CATS.map(([id, label]) => { const on = s.cat === id; return { label, bg: on ? '#1C1C22' : '#FFFFFF', color: on ? '#FFFFFF' : '#34343D', onClick: () => this.setState({ cat: id }) }; }),
    };
  }

  openForm = id => {
    const p = id && this.state.pets.find(x => x.id === id);
    const form = p ? { id: p.id, name: p.name, species: p.species, breed: p.breed, age: String(parseInt(p.age) || ''), weight: String(p.weight ?? ''), allergies: p.allergies.join(', '), vaccinated: p.vaccinated, sterilized: p.sterilized, photo: p.photo }
      : { id: null, name: '', species: 'Perro', breed: '', age: '', weight: '', allergies: '', vaccinated: true, sterilized: false, photo: null };
    this.go('petForm', { form, formTried: false });
  };
  setF = (k, v) => this.setState(s => ({ form: { ...s.form, [k]: v } }));
  flash = msg => { clearTimeout(this._toast); this.setState({ toast: msg }); this._toast = setTimeout(() => this.setState({ toast: '' }), 2000); };
  savePet = () => {
    const f = this.state.form;
    if (!f.name.trim()) { this.setState({ formTried: true }); const el = this.scrollRef.current; if (el) el.scrollTop = 0; return; }
    const n = parseInt(f.age);
    const pet = { id: f.id || 'pet-' + Date.now().toString(36), name: f.name.trim(), species: f.species, breed: f.breed.trim() || 'Mestizo',
      age: isNaN(n) ? 'Edad no indicada' : n === 1 ? '1 año' : n + ' años', weight: parseFloat(f.weight) || 0,
      allergies: f.allergies.split(',').map(a => a.trim()).filter(Boolean), vaccinated: f.vaccinated, sterilized: f.sterilized,
      photo: f.photo || DEF_PHOTO[f.species] };
    this.setState(s => {
      const pets = f.id ? s.pets.map(p => p.id === f.id ? pet : p) : [...s.pets, pet];
      const hist = [...s.hist]; if (hist[hist.length - 1] === 'petDetail') hist.pop();
      return { pets, petView: pet.id, screen: 'petDetail', hist, form: null };
    });
    this.flash(f.id ? 'Cambios guardados' : pet.name + ' fue añadido');
    this.top();
  };
  deletePet = () => {
    const id = this.state.form.id, name = this.state.form.name;
    this.setState(s => { const pets = s.pets.filter(p => p.id !== id); return { pets, screen: 'profile', hist: [], form: null, activePet: 0, petId: s.petId === id ? null : s.petId, petView: pets[0].id }; });
    this.flash(name + ' fue eliminado');
    this.top();
  };

  submitSearch = q => {
    q = (q || '').trim(); if (!q) return;
    this.setState(s => { const hist = [...s.hist]; if (s.screen === 'search') { /* replace search with results */ } return { recent: [q, ...s.recent.filter(r => r.toLowerCase() !== q.toLowerCase())].slice(0, 5) }; });
    this.go('results', { sq: q, sqCommitted: q, rCat: null, rFilter: '', rSort: 0 });
  };
  searchVals() {
    const s = this.state;
    const words = s.sqCommitted.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/\s+/).filter(w => w.length > 2 && !['para','con','los','las','del'].includes(w));
    const alias = { hotel:'hotel', hoteles:'hotel', paseo:'walk', paseos:'walk', canino:'walk', perro:'walk', perros:'hotel', veterinaria:'vet', veterinario:'vet', vet:'vet', '24hrs':'vet', guarderia:'boarding', gatos:'boarding', peluqueria:'grooming', bano:'grooming', banos:'grooming', grooming:'grooming', spa:'grooming' };
    const norm = t => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let list = s.rCat ? PROVIDERS.filter(p => p.service === s.rCat) : PROVIDERS.filter(p => !words.length || words.some(w => norm(p.name + ' ' + p.comuna + ' ' + SVC[p.service]).includes(w) || alias[w] === p.service));
    if (s.rFilter === 'offers') list = list.filter(p => p.price <= 15000);
    const SORTS = ['Relevancia', 'Menor precio', 'Más cercano'];
    if (s.rFilter === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    else if (s.rSort === 1) list = [...list].sort((a, b) => a.price - b.price);
    else if (s.rSort === 2) list = [...list].sort((a, b) => a.km - b.km);
    const cards = list.map((p, i) => this.card(p, i));
    const sponsored = PROVIDERS.filter(p => p.tag === 'Top rated').map((p, i) => this.card(p, i));
    const chip = (on) => ({ bg: on ? '#1C1C22' : '#FFFFFF', color: on ? '#FFFFFF' : '#34343D', border: on ? '#1C1C22' : '#E3E3E7' });
    const q = norm(s.sq.trim());
    const sugg = q ? [...PROVIDERS.filter(p => norm(p.name).includes(q)).map(p => ({ label: p.name, kind: SVC[p.service], onClick: () => this.go('detail', { pid: p.id, dtab: 'description' }) })),
      ...Object.values(SVC).filter(v => norm(v).includes(q)).map(v => ({ label: v, kind: 'Categoría', onClick: () => this.submitSearch(v) }))].slice(0, 5) : [];
    return {
      goSearch: () => this.go('search', { sq: '' }),
      sq: s.sq, sqHas: !!s.sq.trim(), sqEmpty: !s.sq.trim(),
      onSq: e => this.setState({ sq: e.target.value }), onSqKey: e => { if (e.key === 'Enter') this.submitSearch(s.sq); },
      clearSq: () => this.setState({ sq: '' }), submitSq: () => this.submitSearch(s.sq),
      suggestions: sugg,
      recent: s.recent.map(label => ({ label, onClick: () => this.submitSearch(label) })), clearRecent: () => this.setState({ recent: [] }),
      newest: PROVIDERS.slice(0, 4).map((p, i) => this.card(p, i)),
      sqCommitted: s.sqCommitted,
      editSearch: () => { this.setState(x => ({ sq: x.sqCommitted, hist: x.hist.filter(h => h !== 'search') })); this.go('search', { sq: s.sqCommitted }); },
      rFilters: [
        { label: '% Ofertas', ...chip(s.rFilter === 'offers'), onClick: () => this.setState(x => ({ rFilter: x.rFilter === 'offers' ? '' : 'offers' })) },
        { label: 'Mayor calificación', ...chip(s.rFilter === 'rating'), onClick: () => this.setState(x => ({ rFilter: x.rFilter === 'rating' ? '' : 'rating' })) },
        { label: 'Ordenar: ' + SORTS[s.rSort] + ' ▾', ...chip(s.rSort > 0), onClick: () => this.setState(x => ({ rSort: (x.rSort + 1) % SORTS.length })) },
      ],
      rCount: cards.length === 1 ? '1 resultado' : cards.length + ' resultados',
      rTop: cards.slice(0, 3), rRest: cards.slice(3),
      rSponsored: sponsored, rShowSponsored: cards.length > 0 && sponsored.length > 0,
      rEmpty: cards.length === 0,
    };
  }

  componentDidMount() {
    this.armSplash();
    this._liveTick = setInterval(() => { const s = this.state; if (s.screen === 'live' && !s.liveTyping) this.advanceLive(s.liveId); }, this.props.liveStepMs ?? 9000);
  }
  componentDidUpdate(pp) {
    if (pp.startScreen !== this.props.startScreen && this.props.startScreen) this.go(this.props.startScreen);
    const s = this.state;
    if (s.screen === 'live') { const r = s.reservations.find(x => x.id === s.liveId);
      if (r && r.feed) { const n = r.feed.filter(f => !(f.kind === 'msg' && f.role === 'user')).length; if ((s.readAt[r.id] || 0) !== n) this.setState(x => ({ readAt: { ...x.readAt, [r.id]: n } })); } }
  }
  armSplash() { clearTimeout(this._splash); if (this.state.screen === 'splash') this._splash = setTimeout(() => this.startOnb(), 1600); }
  startOnb = () => { clearTimeout(this._splash); this.setState({ screen: 'onboarding', hist: [], onb: 0 }); };
  toAuth = () => this.setState({ screen: 'auth', hist: [], authLoading: false });
  authSubmit = () => {
    if (this.state.authLoading) return;
    this.setState({ authLoading: true });
    this._auth = setTimeout(() => { this.setState({ screen: 'petSetup', hist: [], authLoading: false, setup: { species: 'Perro', name: '', photo: null }, setupTried: false }); this.top(); }, 600);
  };
  setupSave = () => {
    const f = this.state.setup;
    if (!f.name.trim()) { this.setState({ setupTried: true }); return; }
    const pet = { id: 'pet-' + Date.now().toString(36), name: f.name.trim(), species: f.species, breed: f.species === 'Gato' ? 'Doméstico' : 'Mestizo', age: 'Edad no indicada', weight: 0, allergies: [], vaccinated: false, sterilized: false, photo: f.photo || DEF_PHOTO[f.species] };
    this.setState(s => ({ pets: [pet], activePet: 0, petId: null, petView: pet.id, screen: 'home', hist: [] }));
    this.flash('¡Bienvenido, ' + pet.name + '!'); this.top();
  };
  setupVals() {
    const s = this.state, f = s.setup, err = s.setupTried && !f.name.trim();
    const set = (k, v) => this.setState(x => ({ setup: { ...x.setup, [k]: v } }));
    return {
      isSetup: s.screen === 'petSetup', setup: f,
      setupSpecies: [['Perro', 'Perro'], ['Gato', 'Gato'], ['Otro', 'Otra']].map(([id, label]) => { const on = f.species === id; return { label, photo: DEF_PHOTO[id], bg: on ? '#F4EEFE' : '#FFFFFF', border: on ? '#4700D8' : '#E3E3E7', color: on ? '#4700D8' : '#34343D', onClick: () => set('species', id) }; }),
      onSetupName: e => set('name', e.target.value), onSetupKey: e => { if (e.key === 'Enter') this.setupSave(); },
      setupNameError: err, setupNameBorder: err ? '#DC2626' : '#E3E3E7',
      setupHasPhoto: !!f.photo, setupNoPhoto: !f.photo, setupPhotoTitle: f.photo ? 'Cambiar foto' : 'Subir una foto',
      onSetupPhoto: e => { const file = e.target.files && e.target.files[0]; if (!file) return; const r = new FileReader(); r.onload = () => set('photo', r.result); r.readAsDataURL(file); },
      setupSave: this.setupSave,
      setupCtaBg: f.name.trim() ? '#4700D8' : '#B9A3F3',
    };
  }
  liveInputRef = React.createRef();
  updLive = (id, fn) => this.setState(s => ({ reservations: s.reservations.map(r => r.id === id ? fn(r, s) : r) }));
  livePetOf = (r, s) => s.pets.find(p => p.id === r.petId) || s.pets.find(p => p.name === r.pet) || s.pets[0];
  liveBottom = () => requestAnimationFrame(() => { const el = this.scrollRef.current; if (el) el.scrollTop = el.scrollHeight; });
  advanceLive = id => {
    const r = this.state.reservations.find(x => x.id === id); if (!r || r.status !== 'live') return;
    const stage = r.stage + 1, now = new Date();
    if (stage < 4) { this.updLive(id, x => ({ ...x, stage, feed: [...x.feed, { kind:'event', stage, time: hhmm(now) }] })); return; }
    const pet = this.livePetOf(r, this.state);
    this.setState(s => ({
      reservations: s.reservations.map(x => x.id === id ? { ...x, stage, status:'completed', doneAt: hhmm(now), prevWeight: pet.weight, feed: [...x.feed, { kind:'event', stage, time: hhmm(now) }] } : x),
      pets: s.pets.map(p => p.id === pet.id ? { ...p, weight: Math.round(((p.weight || 0) + 0.4) * 10) / 10, visits: [{ title:'Baño y corte de uñas', date:'Hoy', place:'PetSpa Premium, Vitacura' }, ...(p.visits || [])] } : p),
    }));
    this.flash('Ficha de ' + pet.name + ' actualizada');
  };
  liveSend = text => {
    text = (text || '').trim(); const id = this.state.liveId; if (!text) return;
    const r = this.state.reservations.find(x => x.id === id); if (!r || (r.status !== 'live' && r.status !== 'upcoming')) return;
    const pet = this.livePetOf(r, this.state), t = text.toLowerCase();
    const eta = hhmm(new Date(r.start + 90 * 60000));
    const reply = /foto/.test(t) ? { text:'¡Claro! Así va ' + pet.name + ' ahora mismo.', photo: pet.photo }
      : /port|compor|c[oó]mo (est|va)/.test(t) ? { text:'Se ha portado increíble, muy tranquilo durante todo el proceso.' }
      : /hora|retir|buscar|list/.test(t) ? { text:'Calculamos que estará listo cerca de las ' + eta + '. Te avisamos por aquí apenas termine.' }
      : { text:'Anotado, se lo comento a Camila. ¡Gracias por avisar!' };
    this.updLive(id, x => ({ ...x, feed: [...x.feed, { kind:'msg', role:'user', text, time: hhmm(new Date()) }] }));
    this.setState({ liveInput: '', liveTyping: true }); this.liveBottom();
    clearTimeout(this._liveReply);
    this._liveReply = setTimeout(() => {
      this.updLive(id, x => ({ ...x, feed: [...x.feed, { kind:'msg', role:'them', time: hhmm(new Date()), ...reply }] }));
      this.setState({ liveTyping: false }); this.liveBottom();
    }, this.props.aiDelay ?? 1600);
  };
  liveVals() {
    const s = this.state, sc = s.screen;
    const liveRes = s.reservations.find(r => r.status === 'live');
    const out = {
      homeLive: liveRes ? (() => { const p = this.livePetOf(liveRes, s), pv = PROVIDERS.find(x => x.id === liveRes.pid);
        return { photo: p.photo, prov: pv.name, title: flowOf(liveRes.pid).stages[liveRes.stage].head(p.name), pct: Math.round((liveRes.stage + 1) / 4 * 100) + '%', onClick: () => this.go('live', { liveId: liveRes.id }) }; })() : null,
      isLive: false, liveComposer: false, liveInputRef: this.liveInputRef,
    };
    const r = s.reservations.find(x => x.id === s.liveId);
    if (sc !== 'live' || !r || !r.feed) return out;
    const pet = this.livePetOf(r, s), pv = PROVIDERS.find(x => x.id === r.pid), n = pet.name;
    const done = r.status === 'completed', sched = r.status === 'upcoming', eta = hhmm(new Date(r.start + 90 * 60000));
    const total = r.price + (r.tip || 0), flow = flowOf(r.pid), STG = flow.stages;
    const isToday = r.date.toDateString() === new Date().toDateString();
    const dLabel = d => DOW[d.getDay()] + ' ' + d.getDate() + ' ' + MON[d.getMonth()];
    const days = Math.round((new Date(r.date).setHours(0,0,0,0) - new Date().setHours(0,0,0,0)) / 86400000);
    const card = (s.cards.find(c => c.id === s.card) || s.cards[0]);
    return { ...out, isLive: true, liveComposer: !done,
      livePadBottom: done ? '40px' : '150px',
      liveSched: sched ? [['Fecha', dLabel(r.date) + ' · ' + r.time], ['Mascota', n], ['Servicio', flow.visit], ...(r.extras && r.extras.length ? [['Adicionales', r.extras.join(', ')]] : []), ['A cargo de', flow.staff + ' · ' + flow.role]].map(([k, v], i, a) => ({ k, v, border: i < a.length - 1 ? '1px solid #EFEFF2' : 'none' })) : [],
      liveCancelRes: () => { this.setState(x => ({ reservations: x.reservations.map(y => y.id === r.id ? { ...y, status:'cancelled', cancelledAt: new Date(), cancelBy:'Tú' } : y), screen: 'reservations', resTab: 'upcoming', resSub: 'cancelled', hist: [] })); this.flash('Reserva cancelada sin costo'); this.top(); },
      live: { isLive: !done && !sched, isDone: done, isScheduled: sched, canChat: !done, card: CARD_LABEL[card.brand] + ' •••• ' + card.last4, petName: n, petPhoto: pet.photo, provName: pv.name, provCover: pv.cover, provSub: flow.role + ': ' + flow.staff + ' · ★ ' + pv.rating, staff: flow.staff,
        pill: done ? 'FINALIZADO' : sched ? 'PROGRAMADO' : 'EN VIVO', pillBg: done ? '#D1FAE5' : '#FFFFFF', pillColor: done ? '#047857' : '#0F0F12', pillDot: done ? '#047857' : sched ? '#10B981' : '#F35843',
        eyebrow: done ? 'Finalizado a las ' + r.doneAt : sched ? '✓ Aceptada · ' + dLabel(r.date) + ' · ' + r.time : 'Paso ' + (r.stage + 1) + ' de 4 · termina aprox. ' + eta, eyebrowColor: done || sched ? '#047857' : '#4700D8',
        title: sched ? (days <= 0 ? 'Comienza hoy a las ' + r.time : days === 1 ? 'Comienza mañana a las ' + r.time : 'Comienza en ' + days + ' días') : STG[r.stage].head(n), doneAt: r.doneAt,
        dateLabel: sched ? 'Antes del servicio' : (isToday ? 'Hoy' : dLabel(r.date)) + ' · desde ' + r.time,
        total: fmt(total), receipt: r.receipt, canTip: !r.rated,
        rateTitle: r.rated ? '¡Gracias! Calificaste con ' + r.rating + (r.rating === 1 ? ' estrella' : ' estrellas') : '¿Cómo le fue a ' + n + '?',
        canReview: !r.reviewed, showRateBtn: !r.rated, rateBg: r.rating ? '#4700D8' : '#B9A3F3' },
      liveSteps: STG.slice(0, 4).map((st, i) => { const on = !sched && i <= r.stage; return { label: st.label, bar: done ? '#10B981' : on ? '#4700D8' : '#E3E3E7', color: on ? '#0F0F12' : '#A5A5AD' }; }),
      liveFeed: r.feed.map((f, i, arr) => {
        if (f.kind === 'event' && f.custom) return { isEvent: true, isMsg: false, title: f.title, text: f.text, time: f.time, photo: '', dot: '#10B981', ring: 'transparent', railOpacity: i === arr.length - 1 ? 0 : 1 };
        if (f.kind === 'event') { const [title, text] = STG[f.stage].ev(n, pv.name); const last = f.stage === r.stage;
          return { isEvent: true, isMsg: false, title, text, time: f.time, photo: STG[f.stage].photo || '', dot: f.stage === 4 ? '#10B981' : last && !done ? '#4700D8' : '#C5AEF5', ring: last && !done ? '#E5DAFB' : 'transparent', railOpacity: i === arr.length - 1 ? 0 : 1 }; }
        const u = f.role === 'user';
        return { isEvent: false, isMsg: true, text: f.text, time: f.time, photo: f.photo || '', who: u ? 'Tú' : pv.name, align: u ? 'flex-end' : 'flex-start',
          bg: u ? '#4700D8' : '#F7F7F9', color: u ? '#FFFFFF' : '#0F0F12', border: 'none', radius: u ? '20px 20px 6px 20px' : '20px 20px 20px 6px' };
      }),
      liveTyping: s.liveTyping,
      liveRecord: done ? [
        { k:'Peso', v: String(pet.weight).replace('.', ',') + ' kg', note: r.prevWeight != null ? '(antes ' + String(r.prevWeight).replace('.', ',') + ')' : '' },
        ...flow.record.map(([k, v]) => ({ k, v, note:'' })),
        ...(r.extras && r.extras.length ? [{ k:'Adicionales', v: r.extras.join(', '), note:'' }] : []),
      ].map((x, i, a) => ({ ...x, border: i === a.length - 1 ? 'none' : '1px solid #EFEFF2' })) : [],
      livePay: [{ k: flow.pay, v: fmt(r.price - 900) }, { k:'Tarifa de servicio', v: fmt(900) }, ...(r.tip ? [{ k:'Propina', v: fmt(r.tip) }] : [])],
      liveTips: [0, 1000, 2000, 3000].map(v => { const on = (r.tip || 0) === v; return { label: v ? fmt(v) : 'Sin', bg: on ? '#1C1C22' : '#FFFFFF', color: on ? '#FFFFFF' : '#34343D', border: on ? '#1C1C22' : '#E3E3E7', onClick: () => this.updLive(r.id, x => ({ ...x, tip: v })) }; }),
      liveStars: [1, 2, 3, 4, 5].map(v => ({ color: v <= (r.rating || 0) ? '#FFB800' : '#E3E3E7', onClick: () => { if (!r.rated) this.updLive(r.id, x => ({ ...x, rating: v })); } })),
      liveReview: () => this.openReview(r.pid, r.id, r.rating),
      liveRate: () => { if (!r.rating) return; this.updLive(r.id, x => ({ ...x, rated: true })); this.flash('Gracias por calificar a ' + pv.name); },
      livePetFile: () => this.go('petDetail', { petView: pet.id, petTab: 'historial', histFilter: 'all' }),
      liveCall: () => this.flash('Llamando a ' + pv.name + '…'),
      liveFocusChat: () => { const el = this.liveInputRef.current; if (el) el.focus(); this.liveBottom(); },
      liveInput: s.liveInput, liveInputPh: 'Escribe a ' + pv.name + '…',
      onLiveInput: e => this.setState({ liveInput: e.target.value }), onLiveKey: e => { if (e.key === 'Enter') this.liveSend(s.liveInput); },
      liveSendBtn: () => this.liveSend(s.liveInput),
      liveQuick: ['¿Me envías una foto?', '¿Cómo se ha portado?', '¿A qué hora lo retiro?'].map(label => ({ label, onClick: () => this.liveSend(label) })),
    };
  }
  schedFeed = r => { const pv = PROVIDERS.find(x => x.id === r.pid), fl = flowOf(r.pid); return [
    { kind:'event', custom:true, title:'Reserva aceptada', text: pv.name + ' confirmó tu reserva. ' + fl.staff + ' (' + fl.role.toLowerCase() + ') estará a cargo.', time: hhmm(minAgo(140)) },
    { kind:'msg', role:'them', text:'¡Hola! Ya tenemos todo listo para recibirlos. Si tienes alguna indicación especial, escríbenos por aquí.', time: hhmm(minAgo(138)) },
  ]; };
  openScheduled = id => {
    const r = this.state.reservations.find(x => x.id === id); if (!r) return;
    if (!r.feed) {
      const [hh, mm] = (r.time || '10:00').split(':').map(Number);
      const t0 = new Date(r.date); t0.setHours(hh, mm, 0, 0);
      this.updLive(id, x => ({ ...x, start: t0.getTime(), stage: -1, receipt: 'PS-' + id.toUpperCase().padEnd(5, 'X').slice(0, 5), tip: 0, rating: 0, rated: false, feed: this.schedFeed(x) }));
    }
    this.go('live', { liveId: id, liveInput: '' });
  };
  openConv = r => r.status === 'live' ? this.go('live', { liveId: r.id, liveInput: '' }) : r.status === 'completed' ? this.openServiceDetail(r.id) : this.openScheduled(r.id);
  convVals() {
    const s = this.state;
    const feedOf = r => r.feed || (r.status === 'upcoming' && r.approval !== 'pending' ? this.schedFeed(r) : null);
    const lastText = (f, r, n) => f.kind === 'msg' ? (f.role === 'user' ? 'Tú: ' : '') + (f.photo && !f.text ? '📷 Foto' : f.text) : f.custom ? f.title : flowOf(r.pid).stages[f.stage].ev(n, PROVIDERS.find(x => x.id === r.pid).name)[0];
    const items = s.reservations.filter(r => r.status !== 'cancelled').map(r => { const feed = feedOf(r); if (!feed || !feed.length) return null;
      const pv = PROVIDERS.find(x => x.id === r.pid), pet = this.livePetOf(r, s), fl = flowOf(r.pid);
      const theirs = feed.filter(f => !(f.kind === 'msg' && f.role === 'user')).length;
      const unread = r.status === 'completed' ? 0 : Math.max(0, theirs - (s.readAt[r.id] || 0));
      const last = feed[feed.length - 1], dLbl = DOW[r.date.getDay()] + ' ' + r.date.getDate() + ' ' + MON[r.date.getMonth()];
      const st = r.status === 'live' ? ['● En vivo', '#4700D8', '#FFFFFF'] : r.status === 'completed' ? ['Finalizado', '#EFEFF2', '#56565F'] : ['✓ Aceptada', '#D1FAE5', '#047857'];
      return { r, unread, row: { name: pv.name, avatar: pv.cover, petPhoto: pet.photo, badge: st[0], badgeBg: st[1], badgeColor: st[2],
        sub: pet.name + ' · ' + (r.status === 'live' ? fl.visit : dLbl + ' · ' + r.time),
        last: lastText(last, r, pet.name), time: r.status === 'completed' ? dLbl : last.time,
        hasUnread: unread > 0, unread: String(unread), nameWeight: unread ? '800' : '700', lastWeight: unread ? '700' : '500', lastColor: unread ? '#0F0F12' : '#7E7E87', timeWeight: unread ? '800' : '500', timeColor: unread ? '#F35843' : '#A5A5AD',
        onClick: () => this.openConv(r) } }; }).filter(Boolean);
    const order = { live: 0, upcoming: 1, completed: 2 };
    items.sort((a, b) => order[a.r.status] - order[b.r.status] || (a.r.status === 'completed' ? b.r.date - a.r.date : a.r.date - b.r.date));
    const active = items.filter(x => x.r.status !== 'completed'), past = items.filter(x => x.r.status === 'completed');
    const activePids = new Set(active.map(x => x.r.pid));
    const other = Object.keys(s.threads).filter(k => k !== 'ai' && !activePids.has(k)).map(k => {
      const p = PROVIDERS.find(x => x.id === k); const arr = s.threads[k]; const l = arr[arr.length - 1];
      return { name: k === 'support' ? 'Soporte PetSocial' : p ? p.name : k, avatar: k === 'support' ? SUPPORT_AVATAR : p ? p.cover : '', petPhoto: '', badge: '', last: (l.role === 'user' ? 'Tú: ' : '') + l.text, time: 'hoy', hasUnread: false, unread: '', nameWeight: '700', lastWeight: '500', lastColor: '#7E7E87', timeWeight: '500', timeColor: '#A5A5AD', onClick: () => this.go('chat', { chatId: k }) }; });
    const dl = (arr) => arr.map((x, i) => ({ ...x, delay: Math.min(i, 8) * 50 + 'ms' }));
    return { convActive: dl(active.map(x => x.row)), convPast: dl(past.map(x => x.row)), convOther: dl(other),
      convActiveHas: active.length > 0, convPastHas: past.length > 0, convOtherHas: other.length > 0,
      convUnread: active.reduce((a, x) => a + x.unread, 0) };
  }
  openServiceDetail = id => {
    const r = this.state.reservations.find(x => x.id === id); if (!r) return;
    if (!r.feed) {
      const [hh, mm] = (r.time || '10:00').split(':').map(Number);
      const t0 = new Date(r.date); t0.setHours(hh, mm, 0, 0);
      const at = m => hhmm(new Date(t0.getTime() + m * 60000));
      const fl = flowOf(r.pid);
      const feed = [
        { kind:'event', stage:0, time: at(0) },
        { kind:'msg', role:'them', text:'¡Hola! Ya estamos con tu mascota. Te iremos contando por aquí.', time: at(2) },
        { kind:'event', stage:1, time: at(15) },
        { kind:'msg', role:'user', text:'¿Cómo va todo?', time: at(30) },
        { kind:'msg', role:'them', text:'¡Muy bien! Se ha portado increíble.', time: at(31) },
        { kind:'event', stage:2, time: at(45) },
        { kind:'event', stage:3, time: at(70) },
        { kind:'event', stage:4, time: at(80) },
      ];
      this.updLive(id, x => ({ ...x, feed, stage:4, start: t0.getTime(), doneAt: at(80), receipt: 'PS-' + id.toUpperCase().replace(/[^A-Z0-9]/g, '').padEnd(5, 'X').slice(0, 5), tip: x.tip || 0, rating: x.rating || 0, rated: !!x.rated || !!x.reviewed }));
    }
    this.go('live', { liveId: id, liveInput: '' });
  };
  openReview = (pid, resId, stars) => this.go('review', { rv: { pid, resId, stars: stars || 0, tags: [], text: '', photos: [] } });
  setRv = x => this.setState(s => ({ rv: { ...s.rv, ...x } }));
  saveCard = () => {
    const f = this.state.cf, digits = f.num.replace(/\D/g, '');
    const ok = digits.length >= 15 && f.name.trim() && /^(0[1-9]|1[0-2])\/\d{2}$/.test(f.exp) && f.cvv.length >= 3;
    if (!ok) { this.setState({ cfTried: true }); return; }
    const brand = /^4/.test(digits) ? 'VISA' : /^5/.test(digits) ? 'MC' : /^3/.test(digits) ? 'AMEX' : 'CARD';
    const c = { id: 'c' + Date.now().toString(36), brand, last4: digits.slice(-4), exp: f.exp, holder: f.name.trim().toUpperCase(), bg: CARD_BG[brand] };
    this.setState(s => ({ cards: [...s.cards, c], card: c.id, cardSheet: false }));
    this.flash('Tarjeta •••• ' + c.last4 + ' guardada');
  };
  extraVals() {
    const s = this.state, sc = s.screen;
    const def = s.cards.find(c => c.id === s.card) || s.cards[0];
    const f = s.cf, digits = f.num.replace(/\D/g, '');
    const brand = /^4/.test(digits) ? 'VISA' : /^5/.test(digits) ? 'MC' : /^3/.test(digits) ? 'AMEX' : 'CARD';
    const cfOk = digits.length >= 15 && f.name.trim() && /^(0[1-9]|1[0-2])\/\d{2}$/.test(f.exp) && f.cvv.length >= 3;
    const setCf = (k, v) => this.setState(x => ({ cf: { ...x.cf, [k]: v } }));
    const chip = on => ({ bg: on ? '#1C1C22' : '#FFFFFF', color: on ? '#FFFFFF' : '#34343D', border: on ? '#1C1C22' : '#E3E3E7' });
    const nq = t => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const faqs = FAQS.filter(q => (s.helpTopic === 'all' || q.t === s.helpTopic) && (!s.helpQ.trim() || nq(q.q + ' ' + q.a).includes(nq(s.helpQ.trim()))));
    const out = {
      isPayments: sc === 'payments', isHelp: sc === 'help', isReview: sc === 'review' && !!s.rv, isReviewDone: sc === 'reviewDone' && !!s.rvDone,
      goPayments: () => this.go('payments'), goHelp: () => this.go('help', { helpOpen: 0 }),
      payShort: CARD_LABEL[def.brand] + ' •••• ' + def.last4,
      payDefault: { ...def, holder: def.holder || 'DIEGO PÉREZ' },
      payCards: s.cards.map(c => { const d = c.id === def.id; return { ...c, label: CARD_LABEL[c.brand], isDefault: d, notDefault: !d, canDelete: !d && s.cards.length > 1, border: d ? '2px solid #4700D8' : '1px solid #EFEFF2',
        makeDefault: () => { this.setState({ card: c.id }); this.flash(CARD_LABEL[c.brand] + ' •••• ' + c.last4 + ' es tu tarjeta predeterminada'); },
        remove: () => { this.setState(x => ({ cards: x.cards.filter(y => y.id !== c.id) })); this.flash('Tarjeta eliminada'); } }; }),
      payHistory: s.reservations.filter(r => r.status === 'completed' || r.status === 'live').slice(0, 4).map((r, i, a) => { const p = PROVIDERS.find(x => x.id === r.pid); return { name: p.name, cover: p.cover, date: DOW[r.date.getDay()] + ' ' + r.date.getDate() + ' ' + MON[r.date.getMonth()] + (r.status === 'live' ? ' · retenido' : ''), card: 'Visa •••• 4532', amount: fmt(r.price + (r.tip || 0)), border: i < a.length - 1 ? '1px solid #EFEFF2' : 'none' }; }),
      cf: { ...f, bg: CARD_BG[brand], brand: brand === 'CARD' ? 'TARJETA' : brand, numShown: (digits.padEnd(16, '•').match(/.{1,4}/g) || []).join(' '), nameShown: f.name.trim().toUpperCase() || 'NOMBRE TITULAR', expShown: f.exp || 'MM/AA', ctaBg: cfOk ? '#4700D8' : '#B9A3F3' },
      cfOn: {
        num: e => setCf('num', e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})(?=.)/g, '$1 ')),
        name: e => setCf('name', e.target.value),
        exp: e => { let v = e.target.value.replace(/\D/g, '').slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2); setCf('exp', v); },
        cvv: e => setCf('cvv', e.target.value.replace(/\D/g, '').slice(0, 4)),
      },
      cfError: s.cfTried && !cfOk, saveCard: this.saveCard,
      helpQ: s.helpQ, onHelpQ: e => this.setState({ helpQ: e.target.value, helpOpen: -1 }),
      helpTopics: HELP_TOPICS.map(([id, label]) => ({ label, ...chip(s.helpTopic === id), onClick: () => this.setState({ helpTopic: id, helpOpen: -1 }) })),
      helpFaqs: faqs.map((q, i, a) => { const open = s.helpOpen === i; return { q: q.q, a: q.a, open, rot: open ? 'rotate(180deg)' : 'none', border: i < a.length - 1 ? '1px solid #EFEFF2' : 'none', onClick: () => this.setState({ helpOpen: open ? -1 : i }) }; }),
      helpEmpty: faqs.length === 0,
      helpChat: () => { if (!this.state.threads.support) this.setState(x => ({ threads: { ...x.threads, support: [{ role:'them', text:'¡Hola! Soy Fernanda del equipo PetSocial. ¿En qué te puedo ayudar?' }] } })); this.go('chat', { chatId: 'support' }); },
      helpCall: () => this.flash('Llamando a soporte…'), helpMail: () => this.flash('Abriendo tu correo…'),
      rv: {}, rvStars: [], rvTags: [], rvPhotos: [], rvDone: {},
    };
    if (s.rv) {
      const r = s.rv, pv = PROVIDERS.find(x => x.id === r.pid), res = s.reservations.find(x => x.id === r.resId);
      const petName = res ? (res.petId ? this.livePetOf(res, s).name : res.pet) : null;
      Object.assign(out, {
        rv: { cover: pv.cover, name: pv.name, sub: SVC[pv.service] + (res ? ' · ' + (res.date.getDate() + ' ' + MON[res.date.getMonth()]) + ' · ' + petName : ''), text: r.text, count: r.text.length,
          label: RV_LABELS[r.stars] || 'Toca una estrella', labelColor: r.stars ? '#4700D8' : '#A5A5AD', photoCount: r.photos.length, canAddPhoto: r.photos.length < 4, ctaBg: r.stars ? '#4700D8' : '#B9A3F3' },
        rvStars: [1, 2, 3, 4, 5].map(v => ({ color: v <= r.stars ? '#FFB800' : '#E3E3E7', onClick: () => this.setRv({ stars: v }) })),
        rvTags: RV_TAGS.map(t => { const on = r.tags.includes(t); return { label: t, bg: on ? '#F4EEFE' : '#FFFFFF', color: on ? '#4700D8' : '#34343D', border: on ? '#4700D8' : '#E3E3E7', onClick: () => this.setRv({ tags: on ? r.tags.filter(x => x !== t) : [...r.tags, t] }) }; }),
        rvPhotos: r.photos.map((src, i) => ({ src, remove: () => this.setRv({ photos: r.photos.filter((_, j) => j !== i) }) })),
        onRvText: e => this.setRv({ text: e.target.value.slice(0, 500) }),
        onRvPhotos: e => { const files = Array.from(e.target.files || []).slice(0, 4 - r.photos.length); e.target.value = '';
          files.forEach(file => { const fr = new FileReader(); fr.onload = () => this.setState(x => ({ rv: { ...x.rv, photos: [...x.rv.photos, fr.result].slice(0, 4) } })); fr.readAsDataURL(file); }); },
        rvPublish: () => {
          if (!r.stars) { this.flash('Elige de 1 a 5 estrellas'); return; }
          const m = { pid: r.pid, stars: r.stars, tags: r.tags, text: r.text.trim(), photos: r.photos };
          this.setState(x => ({ myReviews: [m, ...x.myReviews], rvDone: m, rv: null, screen: 'reviewDone', hist: [],
            reservations: x.reservations.map(y => y.id === r.resId ? { ...y, reviewed: true, rating: y.rating || r.stars } : y) }));
          this.top();
        },
      });
    }
    if (s.rvDone) { const pv = PROVIDERS.find(x => x.id === s.rvDone.pid);
      out.rvDone = { ...s.rvDone, name: pv.name, stars: '★'.repeat(s.rvDone.stars) + '☆'.repeat(5 - s.rvDone.stars), hasPhotos: s.rvDone.photos.length > 0 };
      out.rvSeeProfile = () => this.go('detail', { pid: pv.id, dtab: 'reviews' }); }
    return out;
  }
  openCert = petId => this.go('cert', { certForm: { step: 1, petId: petId || (this.state.pets[0] || {}).id, type: 'cabin', country: '', airline: '', travel: isoDate(dayAt(10)), proId: '', slot: '', agree: false } });
  setCertF = x => this.setState(s => ({ certForm: { ...s.certForm, ...x } }));
  updCert = (id, x) => this.setState(s => ({ certs: s.certs.map(c => c.id === id ? { ...c, ...x } : c) }));
  certCalc = f => { const s = this.state; const pet = s.pets.find(p => p.id === f.petId) || s.pets[0]; const pro = CERT_PROS.find(p => p.id === f.proId && p.types.includes(f.type)); const chip = f.type === 'intl' && !pet.microchip; return { pet, pro, chip, total: pro ? pro.price + (chip ? 18000 : 0) + 900 : 0 }; };
  submitCert = () => {
    const f = this.state.certForm, k = this.certCalc(f); if (!k.pro) return;
    const id = 'cert' + Date.now().toString(36);
    const folio = 'PS-' + (f.type === 'intl' ? 'INT' : 'CAB') + '-' + (10000 + Math.floor(Math.random() * 89999));
    const cert = { id, petId: k.pet.id, type: f.type, country: f.country, airline: f.airline, travel: new Date(f.travel + 'T12:00:00'), proId: f.proId, slot: f.slot, status: 'review', stage: 1, folio, createdAt: new Date(), issuedAt: null, total: k.total, chip: k.chip };
    this.setState(s => ({ certs: [cert, ...s.certs], certForm: null, certId: id, screen: 'certView' }));
    this.top(); this.flash('Solicitud enviada a ' + k.pro.name);
    clearTimeout(this._certA); clearTimeout(this._certB);
    this._certA = setTimeout(() => this.updCert(id, { stage: 2 }), 3500);
    this._certB = setTimeout(() => {
      this.setState(s => ({ certs: s.certs.map(x => x.id === id ? { ...x, status: 'issued', stage: 3, issuedAt: new Date() } : x),
        pets: cert.chip ? s.pets.map(p => p.id === cert.petId ? { ...p, microchip: '985 112 007 ' + (100 + Math.floor(Math.random() * 899)) + ' ' + (100 + Math.floor(Math.random() * 899)) } : p) : s.pets }));
      this.flash('Certificado emitido · ya puedes descargarlo');
    }, 8000);
  };
  certDocData = c => {
    const s = this.state, pet = s.pets.find(p => p.id === c.petId) || s.pets[0], T = CERT_TYPES[c.type], pro = CERT_PROS.find(x => x.id === c.proId) || CERT_PROS[0];
    const dl = d => { d = new Date(d); return d.getDate() + ' ' + MON[d.getMonth()] + ' ' + d.getFullYear(); };
    const until = c.issuedAt ? new Date(new Date(c.issuedAt).getTime() + T.valid * 864e5) : null;
    const petRows = [['Nombre', pet.name], ['Especie', pet.species], ['Raza', pet.breed], ['Edad', pet.age], ['Peso', String(pet.weight).replace('.', ',') + ' kg'], ['Microchip', pet.microchip || (c.chip ? 'Se implanta en la cita' : 'No registrado')], ['Antirrábica', pet.vaccinated ? 'Vigente' : 'Pendiente'], ['Tutor', 'Diego Pérez']];
    const tripRows = [['Modalidad', c.type === 'intl' ? 'Vuelo internacional' : 'En cabina con su tutor'], ['Destino', c.country], ['Aerolínea', c.airline], ['Fecha de viaje', dl(c.travel)], ['Emisión', c.issuedAt ? dl(c.issuedAt) : 'Pendiente'], ['Válido hasta', until ? dl(until) : 'Al emitirse']];
    const decl = c.type === 'intl'
      ? 'Certifico que ' + pet.name + ' fue examinado clínicamente, se encuentra sano, sin signos de enfermedades infectocontagiosas ni parasitarias, y cumple los requisitos sanitarios declarados para viajar a ' + c.country + '. Documento sujeto a validación del Servicio Agrícola y Ganadero (SAG).'
      : 'Certifico que ' + pet.name + ' fue evaluado clínicamente y en su comportamiento, se encuentra sano, sin signos de enfermedades infectocontagiosas, y es apto para viajar en cabina junto a su tutor, dentro de su transportín.';
    return { pet, T, pro, until, dl, petRows, tripRows, decl };
  };
  downloadCertPdf = c => {
    const D = this.certDocData(c); let o = '';
    const rgb = hex => [1, 3, 5].map(i => (parseInt(hex.slice(i, i + 2), 16) / 255).toFixed(3)).join(' ');
    const T = (x, y, size, font, txt, col) => { o += 'BT /F' + font + ' ' + size + ' Tf ' + rgb(col || '#0F0F12') + ' rg ' + x + ' ' + y + ' Td (' + pdfEsc(txt) + ') Tj ET\n'; };
    const rect = (x, y, w, hh, col) => { o += rgb(col) + ' rg ' + x + ' ' + y + ' ' + w + ' ' + hh + ' re f\n'; };
    const line = (x1, y1, x2, y2, col) => { o += rgb(col) + ' RG 0.8 w ' + x1 + ' ' + y1 + ' m ' + x2 + ' ' + y2 + ' l S\n'; };
    rect(0, 762, 595, 80, '#4700D8');
    T(40, 806, 22, 2, 'PetSocial', '#FFFFFF'); T(40, 788, 9, 1, 'Documento verificable · petsocial.cl/verificar', '#E5DAFB');
    T(420, 806, 9, 1, 'FOLIO', '#E5DAFB'); T(420, 790, 13, 2, c.folio, '#FFFFFF');
    T(40, 728, 9, 2, D.T.short.toUpperCase(), '#4700D8'); T(40, 708, 17, 2, D.T.doc);
    line(40, 692, 555, 692, '#E3E3E7');
    T(40, 670, 9, 2, 'DATOS DE LA MASCOTA', '#7E7E87');
    D.petRows.forEach(([k, v], i) => { T(40, 648 - i * 20, 10, 1, k, '#7E7E87'); T(120, 648 - i * 20, 10, 2, v); });
    T(320, 670, 9, 2, 'DATOS DEL VIAJE', '#7E7E87');
    D.tripRows.forEach(([k, v], i) => { T(320, 648 - i * 20, 10, 1, k, '#7E7E87'); T(400, 648 - i * 20, 10, 2, v); });
    rect(40, 380, 515, 96, '#F7F7F9');
    T(56, 456, 9, 2, 'DECLARACIÓN DEL PROFESIONAL', '#7E7E87');
    wrapTxt(D.decl, 88).forEach((l, i) => T(56, 438 - i * 14, 10, 1, l, '#34343D'));
    T(40, 318, 24, 3, D.pro.name, '#3300A8'); line(40, 308, 300, 308, '#C9C9CF');
    T(40, 292, 11, 2, D.pro.name); T(40, 278, 10, 1, D.pro.role, '#56565F'); T(40, 264, 9, 1, D.pro.reg + ' · Firma digital', '#7E7E87');
    const m = qrMatrix(c.folio), qs = 4.4, qx = 444, qy = 240;
    o += rgb('#0F0F12') + ' rg\n';
    m.forEach((row, y) => row.forEach((on, x) => { if (on) o += (qx + x * qs).toFixed(1) + ' ' + (qy + (24 - y) * qs).toFixed(1) + ' ' + qs + ' ' + qs + ' re\n'; }));
    o += 'f\n'; T(450, 226, 8, 1, 'Escanea para verificar', '#7E7E87');
    rect(40, 160, 515, 44, '#F4EEFE');
    T(56, 186, 10, 2, 'Válido hasta ' + (D.until ? D.dl(D.until) : 'su emisión'), '#3300A8');
    T(56, 172, 9, 1, 'Preséntalo en el check-in de ' + c.airline + (c.type === 'intl' ? ' después de validarlo en el SAG.' : ' junto al carnet de vacunas.'), '#34343D');
    line(40, 80, 555, 80, '#E3E3E7');
    T(40, 64, 8, 1, 'Documento emitido a través de PetSocial. Verifica su autenticidad con el código QR o el folio en petsocial.cl/verificar.', '#7E7E87');
    T(40, 52, 8, 1, 'Prototipo de diseño: documento de ejemplo sin validez oficial.', '#A5A5AD');
    const blob = new Blob([buildPdf(o)], { type: 'application/pdf' });
    saveFile(blob, 'Certificado-' + D.pet.name + '-' + c.folio + '.pdf').catch(() => this.flash('No se pudo guardar el certificado'));
    this.flash('Certificado descargado');
  };
  certVals() {
    const s = this.state, sc = s.screen;
    const out = { isCert: false, isCertView: false, certQrOpen: false, ct: {}, cv: {}, openCert: () => this.openCert(s.petView) };
    const f = s.certForm;
    if (sc === 'cert' && f) {
      const k = this.certCalc(f), pet = k.pet, T = CERT_TYPES[f.type];
      const chip = on => ({ bg: on ? '#1C1C22' : '#FFFFFF', color: on ? '#FFFFFF' : '#34343D', border: on ? '#1C1C22' : '#E3E3E7' });
      const countries = f.type === 'intl' ? CERT_COUNTRIES : ['Chile', ...CERT_COUNTRIES];
      const airlines = f.country === 'Chile' ? CERT_DOMESTIC : CERT_AIRLINES;
      const dl = d => DOW[d.getDay()] + ' ' + d.getDate() + ' ' + MON[d.getMonth()];
      const slots = [[1, '10:00'], [1, '16:30'], [2, '11:00'], [3, '09:30']].map(([o, t]) => dl(dayAt(o)) + ' · ' + t);
      const ok = [!!(f.type && f.country && f.airline && f.travel), true, !!(k.pro && f.slot), !!f.agree][f.step - 1];
      const reqs = (f.type === 'intl' ? [
        ['Microchip ISO 15 dígitos', pet.microchip ? 'ok' : 'todo', pet.microchip ? 'N° ' + pet.microchip : 'No registrado · se implanta en la cita (+' + fmt(18000) + ')'],
        ['Antirrábica vigente', pet.vaccinated ? 'ok' : 'todo', pet.vaccinated ? 'Registrada en la ficha de ' + pet.name : 'Debe aplicarse al menos 21 días antes del viaje'],
        ['Desparasitación interna y externa', 'appt', 'Se aplica y registra en la cita'],
        ['Examen clínico y firma', 'appt', 'Lo realiza un veterinario acreditado SAG'],
        ...(f.country === 'España' ? [['Titulación de anticuerpos antirrábicos', 'todo', 'La exige la Unión Europea · te ayudamos a coordinarla']] : []),
        ['Validación SAG', 'info', 'Con el certificado emitido, lo validas en la oficina SAG del aeropuerto'],
      ] : [
        ['Antirrábica vigente', pet.vaccinated ? 'ok' : 'todo', pet.vaccinated ? 'Registrada en la ficha de ' + pet.name : 'Debe estar vigente para viajar'],
        ['Examen de salud', 'appt', 'Se emite máximo 10 días antes del vuelo'],
        ['Evaluación de comportamiento', 'appt', 'Acredita que ' + pet.name + ' puede viajar tranquilo a tu lado'],
        ['Transportín apto para cabina', 'info', 'Lo llevas tú · revisa las medidas que pide ' + (f.airline || 'tu aerolínea')],
      ]).map(([t, st, d], i, a) => ({ t, d, ...REQ_ST[st], delay: i * 60 + 'ms', border: i < a.length - 1 ? '1px solid #EFEFF2' : 'none' }));
      const cardSel = s.cards.find(c => c.id === s.card) || s.cards[0];
      Object.assign(out, {
        isCert: true,
        ct: { step: f.step, s1: f.step === 1, s2: f.step === 2, s3: f.step === 3, s4: f.step === 4, petName: pet.name, typeShort: T.short.toLowerCase(), travel: f.travel, minDate: isoDate(new Date()), multiPet: s.pets.length > 1,
          weightNote: f.type === 'cabin' && pet.weight > 8 ? pet.name + ' pesa ' + String(pet.weight).replace('.', ',') + ' kg. Muchas aerolíneas aceptan en cabina solo mascotas de hasta 8 kg con transportín. Sobre ese peso, la evaluación del etólogo respalda la solicitud como animal de apoyo, pero la aerolínea decide.' : '',
          hasPro: !!k.pro, proHint: f.type === 'intl' ? 'Para salir del país, el certificado debe firmarlo un veterinario acreditado por el SAG.' : 'Un veterinario o etólogo evalúa la salud y el comportamiento de ' + pet.name + '.',
          card: CARD_LABEL[cardSel.brand] + ' •••• ' + cardSel.last4, agreeBg: f.agree ? '#4700D8' : '#FFFFFF', agreeBorder: f.agree ? '#4700D8' : '#C9C9CF', agreeCheck: f.agree ? '✓' : '',
          total: fmt(k.total), cta: f.step === 4 ? 'Pagar y solicitar · ' + fmt(k.total) : 'Continuar', ctaBg: ok ? '#4700D8' : '#B9A3F3' },
        certBars: [1, 2, 3, 4].map(n => ({ bg: n <= f.step ? '#4700D8' : '#E3E3E7' })),
        certBack: () => { if (f.step > 1) { this.setCertF({ step: f.step - 1 }); this.top(); } else this.back(); },
        certNext: () => { if (!ok) { this.flash(f.step === 1 ? 'Completa destino, aerolínea y fecha' : f.step === 3 ? 'Elige profesional y horario' : 'Acepta la declaración para continuar'); return; } if (f.step < 4) { this.setCertF({ step: f.step + 1 }); this.top(); } else this.submitCert(); },
        certPets: s.pets.map(p => { const on = p.id === pet.id; return { name: p.name, photo: p.photo, bg: on ? '#F4EEFE' : '#FFFFFF', color: on ? '#4700D8' : '#34343D', border: on ? '#4700D8' : '#E3E3E7', onClick: () => this.setCertF({ petId: p.id }) }; }),
        certTypes: Object.entries(CERT_TYPES).map(([id, t]) => { const on = f.type === id; return { label: t.label, desc: t.desc, isCabin: id === 'cabin', isIntl: id === 'intl', bg: on ? '#F4EEFE' : '#FFFFFF', border: on ? '2px solid #4700D8' : '1px solid #E3E3E7', iconBg: on ? '#4700D8' : '#F4EEFE', iconColor: on ? '#FFFFFF' : '#4700D8', checkBg: on ? '#4700D8' : 'transparent', checkBorder: on ? 'none' : '2px solid #E3E3E7', check: on ? '✓' : '', onClick: () => { if (!on) this.setCertF({ type: id, country: '', airline: '', proId: '', slot: '' }); } }; }),
        certCountries: countries.map(c => ({ label: c, ...chip(f.country === c), onClick: () => this.setCertF({ country: c, airline: c === 'Chile' && !CERT_DOMESTIC.includes(f.airline) ? '' : f.airline }) })),
        certAirlines: airlines.map(a => ({ label: a, ...chip(f.airline === a), onClick: () => this.setCertF({ airline: a }) })),
        certOnTravel: e => this.setCertF({ travel: e.target.value }),
        certReqs: reqs,
        certPros: CERT_PROS.filter(p => p.types.includes(f.type)).map(p => { const on = p.id === f.proId; return { ...p, price: fmt(p.price), avatarBg: p.bg, bg: on ? '#F4EEFE' : '#FFFFFF', border: on ? '2px solid #4700D8' : '1px solid #E3E3E7', onClick: () => this.setCertF({ proId: p.id, slot: on ? f.slot : '' }) }; }),
        certSlots: slots.map(l => ({ label: l, ...chip(f.slot === l), onClick: () => this.setCertF({ slot: l }) })),
        certSummary: [['Mascota', pet.name + ' · ' + pet.breed], ['Tipo', T.short], ['Destino', f.country + ' · ' + f.airline], ['Fecha de viaje', f.travel ? dl(new Date(f.travel + 'T12:00:00')) : '—'], ['Profesional', k.pro ? k.pro.name : '—'], ['Cita', f.slot || '—']].map(([kk, v], i, a) => ({ k: kk, v, border: i < a.length - 1 ? '1px solid #EFEFF2' : 'none' })),
        certPay: [[f.type === 'intl' ? 'Examen y certificado internacional' : 'Evaluación y certificado', k.pro ? fmt(k.pro.price) : '—'], ...(k.chip ? [['Microchip ISO', fmt(18000)]] : []), ['Tarifa de servicio', fmt(900)]].map(([kk, v]) => ({ k: kk, v })),
        certToggleAgree: () => this.setCertF({ agree: !f.agree }),
      });
    }
    const c = (s.certs || []).find(x => x.id === s.certId);
    if (sc === 'certView' && c) {
      const D = this.certDocData(c), issued = c.status === 'issued';
      const left = D.until ? Math.ceil((D.until.getTime() - Date.now()) / 864e5) : 0;
      const how = c.type === 'intl'
        ? ['Descarga el PDF o ten a mano el código QR.', 'Valídalo en la oficina SAG del aeropuerto antes del check-in.', 'Preséntalo en el counter de ' + c.airline + ' junto al carnet de vacunas.']
        : ['Descarga el PDF o ten a mano el código QR.', 'Preséntalo en el counter de ' + c.airline + ' al hacer check-in.', 'Durante el vuelo, ' + D.pet.name + ' viaja contigo en su transportín.'];
      const notYet = () => this.flash('Disponible cuando el profesional lo firme');
      Object.assign(out, {
        isCertView: true, certQrOpen: !!s.certQr && issued,
        cv: { issued, review: !issued, folio: c.folio, typeShort: D.T.short, docTitle: D.T.doc, petPhoto: D.pet.photo, petName: D.pet.name, petSub: D.pet.species + ' · ' + D.pet.breed + ' · ' + D.pet.age,
          pill: issued ? 'Emitido' : 'En revisión', pillBg: issued ? '#D1FAE5' : '#FEF3C7', pillColor: issued ? '#047857' : '#92400E',
          until: D.until ? D.dl(D.until) : '', daysLeft: left > 1 ? 'quedan ' + left + ' días' : left === 1 ? 'queda 1 día' : 'vencido',
          declaration: D.decl, sign: D.pro.name.replace(/^Dra?\. /, ''), proName: D.pro.name, proRole: D.pro.role, proReg: D.pro.reg + ' · Firma digital',
          qr: qrDataUrl(c.folio), dlBg: issued ? '#4700D8' : '#B9A3F3', dlLabel: issued ? 'Descargar PDF' : 'Disponible al emitirse' },
        certDocPet: D.petRows.map(([k, v]) => ({ k, v })), certDocTrip: D.tripRows.map(([k, v]) => ({ k, v })),
        certSteps: [['Solicitud enviada', 'Pagada · ' + fmt(c.total || 0)], ['Cita con ' + D.pro.name, c.slot || 'Agendada'], ['Evaluación y firma digital', 'El profesional revisa a ' + D.pet.name], ['Certificado emitido', 'Quedará en su historial']].map(([t, sub], i, a) => {
          const st = c.stage || 1, done = issued || i < st, cur = !issued && i === st;
          return { t, sub, dot: done ? '#10B981' : cur ? '#4700D8' : '#E3E3E7', mark: done ? '✓' : '', ring: cur ? '0 0 0 4px #E5DAFB' : 'none', color: done || cur ? '#0F0F12' : '#A5A5AD', rail: i < a.length - 1 ? 1 : 0 }; }),
        certHow: how.map((t, i, a) => ({ n: String(i + 1), t, border: i < a.length - 1 ? '1px solid #EFEFF2' : 'none' })),
        certDownload: () => issued ? this.downloadCertPdf(c) : notYet(),
        certShare: () => { copyText('https://petsocial.cl/verificar/' + c.folio); this.flash('Enlace de verificación copiado'); },
        certShowQr: () => issued ? this.setState({ certQr: true }) : notYet(),
        certCloseQr: () => this.setState({ certQr: false }),
      });
    }
    return out;
  }
  favVals() {
    const s = this.state;
    const ids = Object.keys(s.liked).filter(k => s.liked[k]);
    const lastUse = pid => { const ds = s.reservations.filter(r => r.pid === pid && (r.status === 'completed' || r.status === 'live')).map(r => r.status === 'live' ? Date.now() : new Date(r.date).getTime()); return ds.length ? Math.max(...ds) : 0; };
    const ago = t => { const d = Math.floor((Date.now() - t) / 864e5); return d <= 0 ? 'hoy' : d === 1 ? 'ayer' : 'hace ' + d + ' días'; };
    let favs = ids.map(id => PROVIDERS.find(p => p.id === id)).filter(Boolean).map(p => ({ p, used: lastUse(p.id), added: typeof s.liked[p.id] === 'number' ? s.liked[p.id] : 0 }));
    const cats = CATS.filter(([id]) => id !== 'todos' && favs.some(f => f.p.service === id));
    const fc = cats.some(([id]) => id === s.favCat) ? s.favCat : 'all';
    if (fc !== 'all') favs = favs.filter(f => f.p.service === fc);
    favs.sort((a, b) => s.favSort === 'used' ? (b.used - a.used) || (b.added - a.added) : b.added - a.added);
    const chip = on => ({ bg: on ? '#1C1C22' : '#FFFFFF', color: on ? '#FFFFFF' : '#34343D', border: on ? '#1C1C22' : '#E3E3E7' });
    return {
      isFavorites: s.screen === 'favorites', goFavorites: () => this.go('favorites'),
      favSummary: ids.length ? ids.length + (ids.length === 1 ? ' servicio guardado' : ' servicios guardados') : 'Aún no guardas servicios',
      favSorts: [['used', 'Último uso'], ['added', 'Recién agregados']].map(([id, label]) => { const on = s.favSort === id; return { label, bg: on ? '#FFFFFF' : 'transparent', color: on ? '#0F0F12' : '#7E7E87', shadow: on ? '0 1px 3px rgba(15,15,18,.08)' : 'none', onClick: () => this.setState({ favSort: id }) }; }),
      favCats: [['all', 'Todas'], ...cats].map(([id, label]) => ({ label, ...chip(fc === id), onClick: () => this.setState({ favCat: id }) })),
      favList: favs.map((f, i) => ({ ...this.card(f.p, i), usedLabel: f.used ? 'Usado ' + ago(f.used) : 'Guardado ' + ago(f.added || Date.now()) + ' · aún sin usar', usedColor: f.used ? '#047857' : '#7E7E87' })),
      favCount: favs.length === 1 ? '1 favorito' : favs.length + ' favoritos',
      favEmpty: favs.length === 0, favEmptyTitle: ids.length ? 'Sin favoritos en esta categoría' : 'Aún no tienes favoritos',
    };
  }
  petVals() {
    const s = this.state, p = s.pets.find(x => x.id === s.petView) || s.pets[0]; if (!p) return {};
    const tab = s.petTab || 'resumen';
    const mine = s.reservations.filter(r => r.status !== 'cancelled').filter(r => r.petId ? this.livePetOf(r, s).id === p.id : r.pet === p.name);
    const dlabel = d => DOW[d.getDay()] + ' ' + d.getDate() + ' ' + MON[d.getMonth()];
    const ST = { live:['● En vivo','#4700D8','#FFFFFF'], upcoming:['Próxima','#E5DAFB','#3300A8'], completed:['Completada','#D1FAE5','#047857'], vet:['Salud','#FEF3C7','#92400E'], certOk:['Certificado','#D1FAE5','#047857'], certRev:['En revisión','#FEF3C7','#92400E'] };
    const VET = [['Control general', -34, 28000], ['Vacuna antirrábica', -95, 18000], ['Esterilización', -190, 120000]];
    const vetCover = PROVIDERS.find(x => x.service === 'vet').cover;
    let items = [
      ...mine.map(r => { const pv = PROVIDERS.find(x => x.id === r.pid); return { kind:'service', status: r.status, d: r.date, title: r.feed ? 'Baño y corte de uñas' : SVC[pv.service], place: pv.name + ' · ' + pv.comuna, cover: pv.cover, price: fmt(r.price + (r.tip || 0)), note: r.status === 'completed' && r.feed ? 'Ficha actualizada · ' + (r.rated ? '★ ' + r.rating + ' · ' : '') + 'ver historial del servicio' : '', onClick: () => r.status === 'completed' ? this.openServiceDetail(r.id) : (r.status === 'upcoming' && r.approval !== 'pending') ? this.openScheduled(r.id) : r.feed ? this.go('live', { liveId: r.id }) : this.go('detail', { pid: pv.id, dtab: 'description' }) }; }),
      ...VET.map(([title, off, price]) => ({ kind:'vet', status:'vet', d: dayAt(off), title, place:'Clínica VetCare · Providencia', cover: vetCover, price: fmt(price), note:'', onClick: () => {} })),
      ...(s.certs || []).filter(c => c.petId === p.id).map(c => { const pro = CERT_PROS.find(x => x.id === c.proId) || CERT_PROS[0]; return { kind:'cert', status: c.status === 'issued' ? 'certOk' : 'certRev', d: new Date(c.issuedAt || c.createdAt), title: CERT_TYPES[c.type].short + ' · ' + c.country, place: pro.name + ' · Folio ' + c.folio, cover: CERT_ICON, price: c.status === 'issued' ? 'Ver y descargar' : 'En revisión', note: 'Viaje el ' + dlabel(new Date(c.travel)) + ' · ' + c.airline, onClick: () => this.go('certView', { certId: c.id }) }; }),
    ];
    const hf = s.histFilter || 'all';
    if (hf !== 'all') items = items.filter(x => x.kind === hf);
    const future = items.filter(x => x.status === 'live' || x.status === 'upcoming').sort((a, b) => a.d - b.d);
    const past = items.filter(x => !(x.status === 'live' || x.status === 'upcoming')).sort((a, b) => b.d - a.d);
    const all = [...future, ...past];
    const liveDone = mine.find(r => r.feed && r.status === 'completed');
    const nxt = future[0];
    const vacc = p.species === 'Gato' ? ['Antirrábica', 'Triple felina', 'Leucemia felina'] : ['Antirrábica', 'Óctuple', 'Desparasitación'];
    const chip = on => ({ bg: on ? '#1C1C22' : '#FFFFFF', color: on ? '#FFFFFF' : '#34343D', border: on ? '#1C1C22' : '#E3E3E7' });
    return {
      petTabs: [['resumen','Resumen'],['salud','Salud'],['historial','Historial']].map(([id, label]) => { const on = tab === id; return { label, bg: on ? '#FFFFFF' : 'transparent', color: on ? '#0F0F12' : '#7E7E87', shadow: on ? '0 1px 3px rgba(15,15,18,0.08)' : 'none', onClick: () => this.setState({ petTab: id }) }; }),
      petTabResumen: tab === 'resumen', petTabSalud: tab === 'salud', petTabHist: tab === 'historial',
      petFacts: [['Especie', p.species], ['Raza', p.breed], ['Edad', p.age], ['Alergias', p.allergies.length ? p.allergies.join(', ') : 'Ninguna']].map(([k, v], i, a) => ({ k, v, border: i < a.length - 1 ? '1px solid #EFEFF2' : 'none' })),
      petNext: nxt ? { cover: nxt.cover, title: nxt.title + ' · ' + nxt.place.split(' · ')[0], when: nxt.status === 'live' ? 'En curso ahora' : dlabel(nxt.d), onClick: nxt.onClick,
        eyebrow: nxt.status === 'live' ? '● En vivo ahora' : 'Próxima reserva', bg: nxt.status === 'live' ? '#1C1C22' : '#F4EEFE', color: nxt.status === 'live' ? '#FFFFFF' : '#0F0F12', sub: nxt.status === 'live' ? '#C5AEF5' : '#7E7E87', eyebrowColor: nxt.status === 'live' ? '#C5AEF5' : '#4700D8' } : null,
      petVaccines: vacc.map((name, i, a) => { const ok = p.vaccinated && i < 2, soon = p.vaccinated && i === 2;
        return { name, detail: ok ? 'Vigente hasta ' + MON[(new Date().getMonth() + 5 + i * 3) % 12] + ' ' + (new Date().getFullYear() + 1) : soon ? 'Vence en 5 días' : 'Sin registro', badge: ok ? 'Al día' : soon ? 'Por vencer' : 'Pendiente',
          badgeBg: ok ? '#D1FAE5' : soon ? '#FEF3C7' : '#FEF2F2', badgeColor: ok ? '#047857' : soon ? '#92400E' : '#B91C1C', iconBg: ok ? '#D1FAE5' : soon ? '#FEF3C7' : '#FEF2F2', iconColor: ok ? '#047857' : soon ? '#92400E' : '#B91C1C', border: i < a.length - 1 ? '1px solid #EFEFF2' : 'none' }; }),
      petNotes: [
        ...(liveDone ? [{ text:'Leve cera en oído izquierdo. Sugerimos limpieza semanal. Piel y pelaje sanos.', by:'Camila · PetSpa Premium', date:'Hoy' }] : []),
        { text:'Peso y condición corporal ideales. Mantener dieta actual y ejercicio diario.', by:'Dr. Peludo · VetCare', date: dlabel(dayAt(-34)) },
      ],
      histFilters: [['all','Todo'],['service','Servicios'],['vet','Veterinaria'],['cert','Certificados']].map(([id, label]) => ({ label, ...chip(hf === id), onClick: () => this.setState({ histFilter: id }) })),
      petHistory: all.map((x, i) => { const st = ST[x.status]; const isFut = i < future.length;
        return { ...x, date: x.status === 'live' ? 'Hoy · en curso' : dlabel(x.d), badge: st[0], badgeBg: st[1], badgeColor: st[2], ring: x.status === 'live' ? '#4700D8' : '#FFFFFF', rail: i === all.length - 1 ? 0 : 1,
          header: i === 0 && future.length ? 'Próximas' : i === future.length ? 'Anteriores' : '' }; }),
      histEmpty: all.length === 0,
    };
  }
  authVals() {
    const s = this.state, reg = s.authMode === 'register', t = k => e => { const v = e.target.value; this.setState(x => ({ auth: { ...x.auth, [k]: v } })); };
    return {
      isSplash: s.screen === 'splash', isOnboarding: s.screen === 'onboarding', isAuth: s.screen === 'auth',
      skipSplash: this.startOnb, skipOnb: this.toAuth,
      onbSlides: ONB.map((o, i) => ({ ...o, display: i === s.onb ? 'flex' : 'none' })),
      onbDots: ONB.map((_, i) => ({ w: i === s.onb ? '32px' : '8px', bg: i === s.onb ? '#4700D8' : '#E3E3E7', onClick: () => this.setState({ onb: i }) })),
      onbNext: () => s.onb < ONB.length - 1 ? this.setState({ onb: s.onb + 1 }) : this.toAuth(),
      onbCta: s.onb < ONB.length - 1 ? 'Siguiente' : 'Comenzar',
      authHero: reg ? 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=900&q=80' : 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=900&q=80',
      authModes: [['login', 'Iniciar sesión'], ['register', 'Registrarse']].map(([id, label]) => { const on = s.authMode === id; return { label, bg: on ? '#FFFFFF' : 'transparent', color: on ? '#4700D8' : '#7E7E87', shadow: on ? '0 1px 3px rgba(15,15,18,0.08)' : 'none', onClick: () => this.setState({ authMode: id }) }; }),
      auth: s.auth, authOn: { name: t('name'), email: t('email'), password: t('password'), confirm: t('confirm') },
      isRegister: reg, pwLabel: reg ? 'Crear contraseña' : 'Contraseña',
      authCta: s.authLoading ? (reg ? 'Creando cuenta…' : 'Ingresando…') : (reg ? 'Registrarme' : 'Ingresar'),
      authLoading: s.authLoading, authOpacity: s.authLoading ? 0.8 : 1, authSubmit: this.authSubmit,
    };
  }

  renderVals() {
    const s = this.state, sc = s.screen;
    const hr = new Date().getHours();
    const pvRaw = PROVIDERS.find(p => p.id === s.pid) || PROVIDERS[0];
    const pv = this.card(pvRaw);
    const selPet = s.pets.find(p => p.id === s.petId);
    const selCard = s.cards.find(c => c.id === s.card) || s.cards[0];
    const exDefs = EXTRAS[pvRaw.service] || [];
    const exChosen = exDefs.filter(x => s.extras[x.id] != null);
    const exSum = exChosen.reduce((a, x) => a + x.price, 0);
    const exLabel = x => x.name + (x.variants ? ' · ' + s.extras[x.id] : '');
    const total = fmt(pvRaw.price + 900 + exSum);
    const d = s.day != null ? dayAt(s.day) : null;
    const whenLabel = d ? `${DOW[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}${s.time ? ' · ' + s.time : ''}` : '—';
    const canNext = !!(s.petId && s.day != null && s.time);
    const q = s.query.trim().toLowerCase();
    const results = PROVIDERS.filter(p => (s.cat === 'todos' || p.service === s.cat) && (!q || (p.name + ' ' + p.comuna).toLowerCase().includes(q))).map((p, i) => this.card(p, i));
    const selBox = on => ({ bg: on ? '#4700D8' : '#FFFFFF', color: on ? '#FFFFFF' : '#0F0F12', border: on ? '#4700D8' : '#E3E3E7' });
    const radio = on => ({ bg: on ? '#F4EEFE' : '#FFFFFF', border: on ? '2px solid #4700D8' : '1px solid #E3E3E7', checkBg: on ? '#4700D8' : 'transparent', checkBorder: on ? 'none' : '2px solid #E3E3E7', check: on ? '✓' : '' });
    const isChat = sc === 'chat';
    const chatIsAI = s.chatId === 'ai';
    const chatProv = PROVIDERS.find(p => p.id === s.chatId);
    const msgs = s.threads[s.chatId] || [];
    const statusMap = { cancelled:['Cancelada','#FEF2F2','#B91C1C'], live:['● En vivo','#4700D8','#FFFFFF'], upcoming:['Próxima','#E5DAFB','#3300A8'], completed:['Completada','#D1FAE5','#047857'] };
    const isUp = s.resTab === 'upcoming';
    const inSub = (r, id) => id === 'cancelled' ? r.status === 'cancelled' : r.status === 'cancelled' ? false : id === 'all' || (id === 'pending' ? r.status === 'upcoming' && r.approval === 'pending' : r.status === 'live' || r.approval !== 'pending');
    const KEEP_DAYS = 30;
    const subOk = r => !isUp || inSub(r, s.resSub);
    const resList = s.reservations.filter(r => (isUp ? r.status !== 'completed' : r.status === 'completed') && subOk(r)).map((r, ri) => {
      const p = PROVIDERS.find(x => x.id === r.pid);
      const pending = r.status === 'upcoming' && r.approval === 'pending', accepted = r.status === 'upcoming' && !pending;
      const st = pending ? ['Esperando validación','#FEF3C7','#92400E'] : accepted ? ['✓ Aceptada','#D1FAE5','#047857'] : statusMap[r.status];
      return { name: p.name, cover: p.cover, service: SVC[p.service], pet: r.petId ? this.livePetOf(r, s).name : r.pet, comuna: p.comuna, time: r.time, price: fmt(r.price),
        date: `${DOW[r.date.getDay()]} ${r.date.getDate()} ${MON[r.date.getMonth()]}`, badge: st[0], badgeBg: st[1], badgeColor: st[2],
        onClick: r.status === 'live' ? () => this.go('live', { liveId: r.id, liveInput: '' }) : undefined,
        cursor: r.status === 'live' ? 'pointer' : 'default', isDone: r.status === 'completed',
        delay: Math.min(ri, 8) * 60 + 'ms', isPending: pending, isAccepted: accepted, isCancelled: r.status === 'cancelled',
        cancelNote: r.status === 'cancelled' ? (() => { const d = KEEP_DAYS - Math.floor((Date.now() - new Date(r.cancelledAt).getTime()) / 86400000); return 'Cancelada por ' + (r.cancelBy === 'Tú' ? 'ti' : r.cancelBy) + ' el ' + new Date(r.cancelledAt).getDate() + ' ' + MON[new Date(r.cancelledAt).getMonth()] + ' · se eliminará en ' + Math.max(1, d) + (d === 1 ? ' día' : ' días'); })() : '',
        priceLabel: r.status === 'cancelled' ? 'No se realizó ningún cobro' : r.status === 'upcoming' ? 'Total estimado' : r.status === 'live' ? 'Total' : 'Total pagado',
        onScheduled: e => { e && e.stopPropagation(); this.openScheduled(r.id); },
        onCancelReq: e => { e && e.stopPropagation(); this.setState(x => ({ reservations: x.reservations.map(y => y.id === r.id ? { ...y, status:'cancelled', cancelledAt: new Date(), cancelBy:'Tú' } : y) })); this.flash('Solicitud cancelada'); },
        onDetail: e => { e && e.stopPropagation(); this.openServiceDetail(r.id); },
        canReview: r.status === 'completed' && !r.reviewed, reviewed: !!r.reviewed, onReview: e => { e && e.stopPropagation(); this.openReview(r.pid, r.id); } };
    });
    const tabActive = MAIN.includes(sc) ? sc : null;
    const convV = this.convVals(), convUnread = convV.convUnread;
    const sosE = s.sosMode === 'emergency';

    return {
      scrollRef: this.scrollRef,
      statusBg: sc === 'live' ? 'transparent' : sc === 'splash' ? '#4700D8' : sc === 'auth' ? 'transparent' : sc === 'petDetail' ? 'transparent' : sc === 'sos' ? '#B91C1C' : sc === 'explore' ? '#E8EDF2' : sc === 'detail' ? 'transparent' : '#FFFFFF',
      statusColor: sc === 'splash' || sc === 'auth' || sc === 'sos' || sc === 'detail' || sc === 'petDetail' ? '#FFFFFF' : '#0F0F12',
      // In the prototype the status bar was 47px tall; on device it's the real safe-area inset (--sb).
      contentTop: (sc === 'live' || sc === 'splash' || sc === 'auth' || sc === 'detail' || sc === 'petDetail' || sc === 'chat' || sc === 'home' || sc === 'results') ? '0px' : 'var(--sb)',
      isHome: sc === 'home', isExplore: sc === 'explore', isDetail: sc === 'detail', isBooking: sc === 'booking',
      isReservations: sc === 'reservations', isMessages: sc === 'messages', isProfile: sc === 'profile', isChat, isSOS: sc === 'sos',
      tabs: TABS.map(([id, label, path]) => { const on = tabActive === id; const VB = {"home":"32.00 40.00 22 22","explore":"108.00 40.00 22 22","messages":"260.00 40.00 22 22","profile":"336.00 40.00 22 22","reservations":"0 0 22 22"}; const res = id === 'reservations'; return { label, path, paw: '', pawT: 'translate(0 0)', vb: VB[id], sw: res ? 1.5 : on ? 2.1 : 1.83, color: on ? '#4700D8' : '#7E7E87', line: on ? '#4700D8' : 'transparent', lineW: on ? '32px' : '0px', lift: on ? 'translateY(-1px) scale(1.08)' : 'none', dot: id === 'messages' && convUnread > 0 ? String(convUnread) : '', onClick: () => this.go(id) }; }),
      showTabs: !!tabActive,
      greeting: hr < 12 ? 'Buen día' : hr < 19 ? 'Buena tarde' : 'Buena noche',
      activePet: s.pets[s.activePet] || s.pets[0],
      petSheet: s.petSheet, openPetSheet: () => this.setState({ petSheet: true }), closePetSheet: () => this.setState({ petSheet: false }),
      addPetFromSheet: () => { this.setState({ petSheet: false }); this.openForm(null); },
      petSheetOpts: s.pets.map((p, i) => { const on = i === s.activePet; return { ...p, bg: on ? '#F4EEFE' : '#FFFFFF', border: on ? '2px solid #4700D8' : '1px solid #E3E3E7', checkBg: on ? '#4700D8' : 'transparent', checkBorder: on ? 'none' : '2px solid #E3E3E7', check: on ? '✓' : '', onClick: () => { this.setState({ activePet: i, petSheet: false }); if (!on) this.flash('Mostrando servicios para ' + p.name); } }; }), cyclePet: () => this.setState(x => ({ activePet: (x.activePet + 1) % s.pets.length })),
      goPetAI: () => this.go('chat', { chatId: 'ai' }), goExplore: () => this.go('explore'),
      goVets: () => this.go('explore', { cat: 'vet', query: '' }),
      cats: CATS.map(([id, label]) => { const on = (s.homeCat || 'todos') === id; return { label, bg: on ? '#3300A8' : '#FFFFFF', color: on ? '#FFFFFF' : '#34343D', border: on ? '#3300A8' : '#E3E3E7', onClick: () => { this.setState({ homeCat: id, hFilter: '', hSort: 0 }); const el = this.scrollRef.current; if (el && el.scrollTop > 120) el.scrollTop = 120; } }; }),
      ...(() => { const hc = s.homeCat || 'todos'; const SORTS = ['Relevancia', 'Menor precio', 'Más cercano'];
        let list = PROVIDERS.filter(p => p.service === hc);
        if (s.hFilter === 'offers') list = list.filter(p => p.price <= 15000);
        if (s.hFilter === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
        else if (s.hSort === 1) list = [...list].sort((a, b) => a.price - b.price);
        else if (s.hSort === 2) list = [...list].sort((a, b) => a.km - b.km);
        const chip = on => ({ bg: on ? '#1C1C22' : '#FFFFFF', color: on ? '#FFFFFF' : '#34343D', border: on ? '#1C1C22' : '#E3E3E7' });
        const sem = (SEM[hc] || []).map(id => PROVIDERS.find(p => p.id === id)).filter(Boolean).map((p, i) => ({ ...this.card(p, i), serviceLabel: SVC[p.service] }));
        return { homeAll: hc === 'todos', homeFiltered: hc !== 'todos', hSem: sem, hSemHas: sem.length > 0 && list.length > 0,
          hRes: list.slice(0, 5).map((p, i) => this.card(p, i)), hResRest: list.slice(5).map((p, i) => this.card(p, i)), hEmpty: list.length === 0,
          hCount: list.length === 1 ? '1 resultado' : list.length + ' resultados',
          hClear: () => this.setState({ hFilter: '', hSort: 0 }),
          hFilters: [
            { label: '% Ofertas', ...chip(s.hFilter === 'offers'), onClick: () => this.setState(x => ({ hFilter: x.hFilter === 'offers' ? '' : 'offers' })) },
            { label: 'Mayor calificación', ...chip(s.hFilter === 'rating'), onClick: () => this.setState(x => ({ hFilter: x.hFilter === 'rating' ? '' : 'rating' })) },
            { label: 'Ordenar: ' + SORTS[s.hSort || 0] + ' ▾', ...chip((s.hSort || 0) > 0), onClick: () => this.setState(x => ({ hSort: ((x.hSort || 0) + 1) % SORTS.length })) },
          ] }; })(),
      promo: { title: PROMOS[s.promo] }, nextPromo: () => this.setState(x => ({ promo: (x.promo + 1) % PROMOS.length })),
      promoDots: PROMOS.map((_, i) => ({ w: i === s.promo ? '20px' : '6px', bg: i === s.promo ? '#3300A8' : '#9D7AF0' })),
      featured: PROVIDERS.filter(p => p.tag).map((p, i) => this.card(p, i)),
      nearby: [...PROVIDERS].sort((a, b) => a.km - b.km).slice(0, 3).map((p, i) => this.card(p, i)),
      topRated: [...PROVIDERS].sort((a, b) => b.rating - a.rating).slice(0, 2).map((p, i) => this.card(p, i)),
      query: s.query, onQuery: e => this.setState({ query: e.target.value }),
      ...this.mapVals(results),
      goHome: () => this.go('home'),
      results, noResults: results.length === 0, resultCount: `${results.length} resultados`,
      pv: { ...pv, hours: pvRaw.hours, heartStroke: s.liked[pvRaw.id] ? '#F35843' : '#0F0F12' },
      back: this.back,
      detailTabs: [['description','Descripción general'],['reviews','Reseñas']].map(([id, label]) => ({ label, color: s.dtab === id ? '#4700D8' : '#7E7E87', line: s.dtab === id ? '#4700D8' : 'transparent', onClick: () => this.setState({ dtab: id }) })),
      isDesc: s.dtab === 'description', isReviews: s.dtab === 'reviews',
      bars: [['6am',.2],['9am',.35],['12pm',.75],['3pm',.95],['6pm',.65],['9pm',.18]].map(([hour, v]) => ({ hour, h: v * 100 + '%' })),
      pvWriteReview: () => this.openReview(pvRaw.id, null),
      locMapOpen: s.locMap && sc === 'detail',
      openLocMap: () => this.setState({ locMap: true }), closeLocMap: () => this.setState({ locMap: false }),
      locEtaCar: Math.max(3, Math.round(pvRaw.km * 3.2)) + ' min', locEtaWalk: Math.max(5, Math.round(pvRaw.km * 13)) + ' min',
      locCopy: () => { copyText(pvRaw.address); this.flash('Dirección copiada'); },
      locGo: () => { openExternal('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(pvRaw.address)); },
      reviews: [
        ...s.myReviews.filter(m => m.pid === pvRaw.id).map(m => ({ name:'Tú', date:'hoy', stars: '★'.repeat(m.stars) + '☆'.repeat(5 - m.stars), text: m.text, tags: m.tags, hasTags: m.tags.length > 0, photos: m.photos, hasPhotos: m.photos.length > 0 })),
        { name:'Catalina P.', date:'hace 1 sem', stars:'★★★★★', text:'Excelente atención con Luna, mandaron fotos durante todo el día. La recomiendo 100%.' },
        { name:'José R.', date:'hace 2 sem', stars:'★★★★★', text:'Muy buena experiencia. Mi perrita salió feliz y bien cuidada.' },
        { name:'Andrea M.', date:'hace 1 mes', stars:'★★★★☆', text:'Buen servicio en general. Precio justo por la calidad ofrecida.' },
      ],
      startBooking: () => this.go('booking', { step: 1 }),
      bookingTitle: s.step === 3 ? 'Reserva confirmada' : 'Reservar servicio',
      bookingBack: () => { if (s.step === 3) this.go('home'); else if (s.step === 2) { this.setState({ step: 1 }); this.top(); } else this.back(); },
      stepper: [1, 2, 3].map(n => ({ bg: n <= s.step ? '#4700D8' : '#E3E3E7' })),
      isStep1: sc === 'booking' && s.step === 1, isStep2: sc === 'booking' && s.step === 2, isStep3: sc === 'booking' && s.step === 3,
      isStep12: sc === 'booking' && s.step < 3,
      petOpts: s.pets.map(p => ({ ...p, ...radio(s.petId === p.id), onClick: () => this.setState({ petId: p.id }) })),
      days: Array.from({ length: 14 }, (_, i) => { const dd = dayAt(i); return { dow: DOW[dd.getDay()], num: `${dd.getDate()} ${MON[dd.getMonth()]}`, ...selBox(s.day === i), onClick: () => this.setState({ day: i }) }; }),
      hasDay: s.day != null,
      times: TIMES.map(t => ({ label: t, ...selBox(s.time === t), onClick: () => this.setState({ time: t }) })),
      notes: s.notes, onNotes: e => this.setState({ notes: e.target.value }),
      exAvailable: exDefs.length > 0, exHasSel: exChosen.length > 0, exNames: exChosen.map(exLabel).join(', '),
      exPetName: selPet ? selPet.name : 'tu mascota',
      exCardTitle: exChosen.length ? exChosen.length + (exChosen.length === 1 ? ' servicio adicional' : ' servicios adicionales') : 'Agrega más servicios',
      exCardSub: exChosen.length ? 'Toca para editar · +' + fmt(exSum) : exDefs.length + ' disponibles desde ' + (exDefs.length ? fmt(Math.min(...exDefs.map(x => x.price))) : ''),
      exSel: exChosen.map(x => ({ label: exLabel(x), price: fmt(x.price), remove: () => this.setState(st => { const e = { ...st.extras }; delete e[x.id]; return { extras: e }; }) })),
      extrasSheet: s.extrasSheet && sc === 'booking' && s.step === 2,
      openExtras: () => this.setState({ extrasSheet: true }), closeExtras: () => this.setState({ extrasSheet: false }),
      exList: exDefs.map(x => { const on = s.extras[x.id] != null;
        return { name: x.name, desc: x.desc, price: fmt(x.price), variantLabel: x.variantLabel || '', showVariants: on && !!x.variants,
          bg: on ? '#F4EEFE' : '#FFFFFF', border: on ? '2px solid #4700D8' : '1px solid #E3E3E7',
          btnBg: on ? '#4700D8' : '#FFFFFF', btnColor: on ? '#FFFFFF' : '#4700D8', btnBorder: on ? 'none' : '1.5px solid #C5AEF5', btnIcon: on ? '✓' : '+',
          toggle: () => this.setState(st => { const e = { ...st.extras }; if (e[x.id] != null) delete e[x.id]; else e[x.id] = x.variants ? x.variants[0] : true; return { extras: e }; }),
          variants: (x.variants || []).map(v => { const vo = s.extras[x.id] === v; return { label: v, bg: vo ? '#1C1C22' : '#FFFFFF', color: vo ? '#FFFFFF' : '#34343D', border: vo ? '#1C1C22' : '#E3E3E7', onClick: () => this.setState(st => ({ extras: { ...st.extras, [x.id]: v } })) }; }) }; }),
      exCta: exChosen.length ? 'Agregar ' + exChosen.length + (exChosen.length === 1 ? ' servicio' : ' servicios') + ' · +' + fmt(exSum) : 'Continuar sin agregar',
      exCtaBg: exChosen.length ? '#4700D8' : '#F7F7F9', exCtaColor: exChosen.length ? '#FFFFFF' : '#34343D',
      selPetName: selPet ? `${selPet.name} · ${selPet.breed}` : '—', whenLabel, total, selCard,
      cardOpts: s.cards.map(c => { const r = radio(s.card === c.id); return { ...c, bgRow: r.bg, border: r.border, checkBg: r.checkBg, checkBorder: r.checkBorder, check: r.check, onClick: () => this.setState({ card: c.id }) }; }),
      openCardSheet: () => this.setState({ cardSheet: true, cf: { num:'', name:'', exp:'', cvv:'' }, cfTried: false }), closeCardSheet: () => this.setState({ cardSheet: false }), cardSheet: s.cardSheet,
      bottomPrice: s.step === 1 ? pv.price : total, bottomSub: s.step === 1 ? `por ${pvRaw.unit}` : 'Total a pagar',
      nextLabel: s.step === 1 ? 'Continuar' : 'Confirmar reserva',
      nextOpacity: s.step === 1 && !canNext ? 0.45 : 1,
      bookingNext: () => {
        if (s.step === 1) { if (canNext) { this.setState({ step: 2, extrasSheet: exDefs.length > 0 && !s.extrasSeen, extrasSeen: true }); this.top(); } return; }
        const code = 'PS-' + Math.random().toString(36).substring(2, 7).toUpperCase();
        this.setState(x => ({ step: 3, code, coins: x.coins + 50, reservations: [{ id: code, pid: pvRaw.id, pet: selPet.name, date: dayAt(x.day), time: x.time, price: pvRaw.price + 900 + exSum, extras: exChosen.map(exLabel), status: 'upcoming', approval: 'pending' }, ...x.reservations] }));
        this.top();
      },
      code: s.code,
      goChatProvider: () => this.go('chat', { chatId: s.threads[pvRaw.id] ? pvRaw.id : (this.setState(x => ({ threads: { ...x.threads, [pvRaw.id]: [{ role:'them', text:`¡Gracias por reservar con ${pvRaw.name}! ¿En qué te podemos ayudar?` }] } })), pvRaw.id) }),
      goReservations: () => this.go('reservations', { resTab: 'upcoming' }),
      resTabs: [['upcoming','Próximas'],['history','Historial']].map(([id, label]) => { const on = s.resTab === id; return { label, bg: on ? '#FFFFFF' : 'transparent', color: on ? '#0F0F12' : '#7E7E87', shadow: on ? '0 1px 3px rgba(15,15,18,.08)' : 'none', onClick: () => this.setState({ resTab: id }) }; }),
      resList, resEmpty: resList.length === 0, resShowSub: isUp,
      resCancelNote: isUp && s.resSub === 'cancelled',
      resSubs: [['all','Todas'],['pending','Esperando validación'],['accepted','Aceptadas'],['cancelled','Canceladas']].map(([id, label]) => { const on = s.resSub === id;
        const n = s.reservations.filter(r => r.status !== 'completed' && inSub(r, id)).length;
        return { label, count: String(n), bg: on ? '#1C1C22' : '#FFFFFF', color: on ? '#FFFFFF' : '#34343D', border: on ? '#1C1C22' : '#E3E3E7', countBg: on ? 'rgba(255,255,255,.2)' : '#EFEFF2', onClick: () => this.setState({ resSub: id }) }; }),
      aiLast: (() => { const a = s.threads.ai || []; const l = a[a.length - 1]; return l ? (l.role === 'user' ? 'Tú: ' : '') + l.text : 'Pregúntame sobre la salud de tu mascota'; })(),
      aiPrompts: ['Vomitó hoy', '¿Qué vacuna le toca?', 'No quiere comer'].map(label => ({ label, onClick: () => { this.go('chat', { chatId: 'ai' }); setTimeout(() => this.send && this.send(label), 60); } })),
      ...convV,
      threads: Object.keys(s.threads).filter(k => k !== 'ai').map(k => {
        const p = PROVIDERS.find(x => x.id === k); const arr = s.threads[k]; const last = arr[arr.length - 1];
        return { name: k === 'support' ? 'Soporte PetSocial' : p ? p.name : 'Pet IA', avatar: k === 'support' ? SUPPORT_AVATAR : p ? p.cover : 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&q=80', last: (last.role === 'user' ? 'Tú: ' : '') + last.text, time: k === 'ai' ? '24/7' : 'hoy', onClick: () => this.go('chat', { chatId: k }) };
      }),
      pets: s.pets.map(p => ({ ...p, onClick: () => this.go('petDetail', { petView: p.id, petTab: 'resumen' }) })), coins: s.coins,
      ...this.authVals(), ...this.setupVals(), ...this.liveVals(), ...this.petVals(), ...this.extraVals(), ...this.favVals(), ...this.certVals(),
      askLoc: sc === 'explore' && s.locAsk, locGranted: sc === 'explore' && s.loc === 'granted', locDenied: sc === 'explore' && s.loc === 'denied' && !s.locAsk,
      locAllow: () => { this.setState({ loc: 'granted', locAsk: false }); this.flash('Ubicación activada'); },
      locDeny: () => this.setState({ loc: 'denied', locAsk: false }),
      locAsk: () => this.setState({ locAsk: true }),
      isSearch: sc === 'search', isResults: sc === 'results', ...this.searchVals(),
      isPetDetail: sc === 'petDetail', isPetForm: sc === 'petForm' && !!s.form,
      addPet: () => this.openForm(null), editPet: () => this.openForm(s.petView),
      savePet: this.savePet, deletePet: this.deletePet, toast: s.toast,
      ...this.formVals(),
      pet: (() => { const p = s.pets.find(x => x.id === s.petView) || s.pets[0]; return { ...p, speciesLabel: p.species, hasAllergies: p.allergies.length > 0 }; })(),
      petStats: (() => { const p = s.pets.find(x => x.id === s.petView) || s.pets[0]; return [
        { label:'Peso', value: String(p.weight).replace('.', ',') + ' kg', color:'#0F0F12' },
        { label:'Vacunas', value: p.vaccinated ? 'Al día' : 'Pendientes', color: p.vaccinated ? '#047857' : '#B82E1C' },
        { label:'Esteril.', value: p.sterilized ? 'Sí' : 'No', color:'#0F0F12' } ]; })(),
      petVisits: (() => { const p = s.pets.find(x => x.id === s.petView) || s.pets[0]; const base = [['Control general','hace 1 mes'],['Vacuna antirrábica','hace 3 meses'],['Esterilización','hace 6 meses']].map(([title, date]) => ({ title, date, place:'Clínica VetCare Providencia' })); const all = [...((p && p.visits) || []), ...base].slice(0, 4); return all.map((v, i) => ({ ...v, border: i < all.length - 1 ? '1px solid #EFEFF2' : 'none' })); })(),
      notifBg: s.notif ? '#4700D8' : '#E3E3E7', notifLeft: s.notif ? '23px' : '3px', toggleNotif: () => this.setState(x => ({ notif: !x.notif })),
      chatIsAI, chatIsProvider: !chatIsAI,
      chat: chatIsAI ? { name:'PetAI', sub:'Asistente veterinario', placeholder:'Describe los síntomas...' } : s.chatId === 'support' ? { name:'Soporte PetSocial', sub:'Responde en ~5 min', avatar: SUPPORT_AVATAR, placeholder:'Cuéntanos qué pasó...' } : { name: chatProv?.name, sub:'Responde en < 1 h', avatar: chatProv?.cover, placeholder:'Escribe un mensaje...' },
      chatMsgs: msgs.map(m => { const u = m.role === 'user'; return { text: m.text, suggest: !!m.suggest, showAIAvatar: m.role === 'ai', justify: u ? 'flex-end' : 'flex-start',
        bg: u ? '#4700D8' : '#FFFFFF', color: u ? '#FFFFFF' : '#0F0F12', border: u ? 'none' : '1px solid #EFEFF2', radius: u ? '20px 20px 6px 20px' : '20px 20px 20px 6px' }; }),
      typing: isChat && s.typing,
      showPrompts: chatIsAI && msgs.length === 1,
      prompts: ['Mi perro no quiere comer hace 2 días','Mi gato está vomitando','¿Es normal este síntoma?'].map(label => ({ label, onClick: () => this.send(label) })),
      input: s.input, onInput: e => this.setState({ input: e.target.value }), onKey: e => { if (e.key === 'Enter') this.send(s.input); },
      sendInput: () => this.send(s.input), sendOpacity: s.input.trim() ? 1 : 0.4,
      sosOpen: s.sosOpen, openSOS: () => this.setState({ sosOpen: true }), closeSOS: () => this.setState({ sosOpen: false }),
      sosEmergency: () => this.go('sos', { sosMode: 'emergency' }), sosLost: () => this.go('sos', { sosMode: 'lost' }),
      sosLabel: sosE ? 'Urgencia veterinaria' : 'Mascota perdida',
      sosTitle: sosE ? 'Conectando con la clínica 24h más cercana.' : `Red comunitaria activada para ${s.pets[s.activePet].name}.`,
      sosPlace: sosE ? 'Dr. Peludo · Urgencias' : '38 vecinos notificados',
      sosMeta: sosE ? 'Providencia · 1.5 km · 6 min' : 'Radio de 2 km · Providencia',
      sosCta: sosE ? 'Llamar ahora' : 'Compartir afiche',
      sosNote: sosE ? 'Mantén a tu mascota tranquila y abrigada. No le des comida ni medicamentos.' : 'Te avisaremos apenas alguien reporte un avistamiento.',
    };
  }
}
