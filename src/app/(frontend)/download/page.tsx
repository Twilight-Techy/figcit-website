import type { Metadata } from 'next'

import { ArrowIcon } from '@/components/icons'
import { PlatformHint } from '@/components/sections/PlatformHint'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { QrCode } from '@/components/ui/QrCode'
import { ANDROID_APK_PATH, WEB_APP_URL, androidApp, megabytes } from '@/lib/androidApp'
import { QR_ORIGIN, qrTarget } from '@/lib/qr'

// Get the app: the Android download, Add to Home Screen on iPhone and iPad, and a QR code
// for people reading on a computer. The page holds all three; PlatformHint puts the
// visitor's own first. Not a CMS page: the download and its steps change with releases.

export const metadata: Metadata = {
  title: 'Get the FigCit app',
  description:
    'Download FigCit for Android, or add it to your iPhone or iPad home screen. Free, with everyday support that adapts to you, and help one tap away.',
  alternates: { canonical: '/download' },
}

const PAGE_ID = 'get-the-app'

const btn =
  'inline-flex items-center justify-center gap-2.5 rounded-pill px-7 py-4 text-center sm:py-[1.0625rem] font-heading text-base leading-5 font-bold transition-calm transition-[opacity,background-color]'
const primary = `${btn} bg-primary text-on-primary hover:opacity-90`
const outline = `${btn} border-[1.5px] border-ink text-ink hover:bg-ink/5`

function Card({
  platform,
  title,
  children,
}: {
  platform: 'android' | 'ios' | 'desktop'
  title: string
  children: React.ReactNode
}) {
  const id = `install-${platform}`
  return (
    <section
      aria-labelledby={id}
      data-card={platform}
      className="download-card flex flex-col gap-5 rounded-card bg-surface p-6 md:p-8"
    >
      <p className="download-yours hidden w-fit rounded-pill bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
        Your device
      </p>
      <h2 id={id} className="font-heading text-h3 font-extrabold text-primary">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="download-steps flex flex-col gap-3">{children}</ol>
}

export default function DownloadPage() {
  return (
    <div id={PAGE_ID} data-page="download" className="bg-bg">
      <PlatformHint targetId={PAGE_ID} />
      <div className="container-site flex flex-col gap-5 pt-10 pb-10 lg:pt-20 lg:pb-14">
        <Eyebrow>The FigCit app</Eyebrow>
        <h1 className="max-w-[48rem] font-heading text-display font-extrabold text-primary lg:text-[4rem]">
          Get FigCit on your phone
        </h1>
        <p className="max-w-[43rem] text-lead">
          Free to download. Check in with how you are, plan your day at your own pace, and find help
          in one tap. It keeps working when you’re offline.
        </p>
      </div>

      <div className="container-site pb-section">
        <div className="download-cards grid gap-5 lg:grid-cols-3 lg:gap-6">
          <Card platform="android" title="Android">
            <a href={ANDROID_APK_PATH} download="FigCit.apk" className={primary}>
              Download the app
            </a>
            <p className="-mt-2 text-sm text-ink-muted">
              Version {androidApp.version} · {megabytes(androidApp.bytes)} · Android 7 or newer
            </p>
            <Steps>
              <li>Tap Download the app.</li>
              <li>When it has downloaded, open it from your notifications or your Downloads.</li>
              <li>
                If your phone asks, allow your browser to install apps (“Install unknown apps”),
                then go back.
              </li>
              <li>Tap Install, then Open.</li>
            </Steps>
            <p className="text-sm text-ink-muted">
              FigCit is coming to Google Play. Until then, this is the official app, from us and
              signed by FigCit. Updates to FigCit reach it automatically.
            </p>
            <details className="text-sm text-ink-muted">
              <summary className="cursor-pointer font-bold text-primary">Check the file</summary>
              <p className="mt-2 break-all">SHA-256: {androidApp.sha256}</p>
            </details>
          </Card>

          <Card platform="ios" title="iPhone and iPad">
            <a href={WEB_APP_URL} className={primary}>
              Open FigCit in Safari
            </a>
            <Steps>
              <li>Open FigCit in Safari.</li>
              <li>Tap the Share button (the square with an arrow pointing up).</li>
              <li>Choose Add to Home Screen, then Add.</li>
              <li>Open FigCit from your home screen, like any other app.</li>
            </Steps>
            <p className="text-sm text-ink-muted">
              FigCit opens full screen and works offline. An App Store version is on its way.
            </p>
          </Card>

          <Card platform="desktop" title="On a computer">
            <div className="flex flex-col items-start gap-3">
              <div className="rounded-[1.25rem] bg-(--fc-qr-bg) p-4 text-(--fc-qr-ink)">
                <QrCode
                  value={qrTarget('/download', QR_ORIGIN)}
                  label="QR code: opens this page on your phone"
                  className="size-40"
                />
              </div>
              <p>Scan the code with your phone’s camera to get the app there.</p>
            </div>
            <a href={WEB_APP_URL} className={outline}>
              Use FigCit in your browser
              <ArrowIcon className="hidden shrink-0 sm:block" />
            </a>
          </Card>
        </div>
      </div>
    </div>
  )
}
