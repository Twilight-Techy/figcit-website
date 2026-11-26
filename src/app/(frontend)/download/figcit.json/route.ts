import { androidApp } from '@/lib/androidApp'

// The Android app asks this on start to see whether a newer APK is out (figcit-pwa/apps/mobile,
// UpdateCheck). It downloads /download/figcit.apk only when versionCode is higher, and installs it
// only if its size and SHA-256 match these.
export const dynamic = 'force-static'

export function GET(): Response {
  const { version, versionCode, bytes, sha256 } = androidApp
  return Response.json(
    { version, versionCode, bytes, sha256 },
    { headers: { 'Cache-Control': 'public, max-age=300, must-revalidate' } },
  )
}
