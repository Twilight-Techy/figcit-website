import info from '@/content/androidApp.json'

// The Android app (figcit-pwa/apps/mobile). A release copies its APK to
// public/download/figcit.apk and its details to src/content/androidApp.json.

export const ANDROID_APK_PATH = '/download/figcit.apk'

/** Where the app itself runs: iPhones and computers use it there. */
export const WEB_APP_URL = 'https://app.figcit.co.uk/home/'

export const androidApp = info

/** "2.9 MB": the APK's size for the download button. */
export function megabytes(bytes: number): string {
  return `${(bytes / 1_000_000).toFixed(1)} MB`
}

export type Platform = 'android' | 'ios' | 'desktop'

/** Which install steps to put first. iPads report themselves as Macs, so touch decides. */
export function platformFor(userAgent: string, maxTouchPoints = 0): Platform {
  if (/\bAndroid\b/i.test(userAgent)) return 'android'
  if (/\b(iPhone|iPad|iPod)\b/.test(userAgent)) return 'ios'
  if (/\bMacintosh\b/.test(userAgent) && maxTouchPoints > 1) return 'ios'
  return 'desktop'
}
