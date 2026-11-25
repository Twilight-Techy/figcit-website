import { readFileSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { describe, expect, it } from 'vitest'

import { androidApp, megabytes, platformFor } from '@/lib/androidApp'
import { comfortInitScript } from '@/lib/comfortInit'
import { APP_BANNER_KEY } from '@/lib/appBanner'

const ua = {
  android:
    'Mozilla/5.0 (Linux; Android 15; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36',
  iphone:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 19_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/19.0 Mobile/15E148 Safari/604.1',
  mac: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/19.0 Safari/605.1.15',
  windows:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
}

describe('Android app download', () => {
  it('describes the APK that is actually served', () => {
    const apk = 'public/download/figcit.apk'
    expect(statSync(apk).size).toBe(androidApp.bytes)
    expect(createHash('sha256').update(readFileSync(apk)).digest('hex')).toBe(androidApp.sha256)
    expect(androidApp.version).toMatch(/^\d+\.\d+\.\d+$/)
  })

  it('shows the size in megabytes', () => {
    expect(megabytes(3_039_517)).toBe('3.0 MB')
  })
})

describe('platformFor', () => {
  it('puts each visitor’s own steps first', () => {
    expect(platformFor(ua.android)).toBe('android')
    expect(platformFor(ua.iphone)).toBe('ios')
    // iPads say they are Macs, but have a touch screen
    expect(platformFor(ua.mac, 5)).toBe('ios')
    expect(platformFor(ua.mac, 0)).toBe('desktop')
    expect(platformFor(ua.windows)).toBe('desktop')
  })
})

describe('Get the app bar', () => {
  it('stays hidden before first paint once closed', () => {
    expect(comfortInitScript).toContain(`localStorage.getItem('${APP_BANNER_KEY}')==='hidden'`)
    expect(comfortInitScript).toContain("setAttribute('data-app-banner','hidden')")
  })
})
