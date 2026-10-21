import { createElement, type CSSProperties, type ReactNode } from 'react'

/** The flat view-model produced by Controller.renderVals(); screens read everything from it. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Vals = Record<string, any>

/** Non-arrays render as an empty list. */
export function list<T>(value: T[] | null | undefined): T[] {
  return Array.isArray(value) ? value : []
}

const styleCache = new Map<string, CSSProperties>()

/** Turns a CSS declaration string ("color:red;margin:0 4px") into a React style object. */
export function sx(css: string | null | undefined): CSSProperties | undefined {
  if (css == null) return undefined
  let style = styleCache.get(css)
  if (style) return style
  const out: Record<string, string> = {}
  for (const decl of css.split(';')) {
    const i = decl.indexOf(':')
    if (i < 0) continue
    const prop = decl.slice(0, i).trim()
    out[prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())] = decl.slice(i + 1).trim()
  }
  style = out as CSSProperties
  if (styleCache.size > 2000) styleCache.clear()
  styleCache.set(css, style)
  return style
}

/** Inline value inside mixed text, rendered in its own <span> (nothing for null/boolean). */
export function txt(value: unknown): ReactNode {
  if (value == null || typeof value === 'boolean') return null
  return createElement('span', null, String(value))
}
