import { Capacitor, SystemBars, SystemBarsStyle, SystemBarType } from '@capacitor/core'
import { Filesystem, Directory } from '@capacitor/filesystem'
import { Share } from '@capacitor/share'

export const isNative = Capacitor.isNativePlatform()

/** Light or dark status-bar icons, matching the colour the prototype used on each screen. */
export function setStatusBarIcons(iconColor: string) {
  if (!isNative) return
  const light = iconColor.toUpperCase() === '#FFFFFF'
  SystemBars.setStyle({ style: light ? SystemBarsStyle.Dark : SystemBarsStyle.Light, bar: SystemBarType.StatusBar }).catch(() => {})
}

/** Saves a Blob. Browsers download it; the native app writes it to Documents and opens the share sheet. */
export async function saveFile(blob: Blob, filename: string) {
  if (!isNative) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 4000)
    return
  }
  const data = await new Promise<string>((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(String(r.result).split(',')[1] ?? '')
    r.onerror = () => reject(r.error)
    r.readAsDataURL(blob)
  })
  const file = await Filesystem.writeFile({ path: filename, data, directory: Directory.Documents })
  await Share.share({ title: filename, url: file.uri })
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard?.writeText(text)
  } catch {
    /* clipboard can be unavailable in some webviews */
  }
}

export function openExternal(url: string) {
  window.open(url, '_blank', 'noopener')
}
