import { HeartIcon } from '@/components/icons'

// "Need support now?" (Figma 30:119 and 41:1107). Hard-coded on purpose: safeguarding
// requires it on every page, so it is not editable or removable in the CMS (rules §7).
// Numbers are links so people on phones can call or text in one tap.
const link = 'underline decoration-1 underline-offset-[0.2em] hover:decoration-2'

export function CrisisNotice() {
  return (
    <aside
      aria-labelledby="crisis-notice-title"
      className="flex w-full items-start gap-6 rounded-[1.125rem] bg-footer-card p-[1.125rem] text-on-footer md:rounded-card md:border md:border-footer-line md:px-8 md:py-7"
    >
      <HeartIcon size={28} className="hidden shrink-0 text-orange md:block" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 md:gap-2">
        <h2
          id="crisis-notice-title"
          className="font-heading text-[1.0625rem] leading-[1.12] font-bold md:text-xl md:leading-[normal]"
        >
          Need support now?
        </h2>
        <p className="text-[0.9375rem] leading-[1.6] md:text-[1.0625rem] md:leading-[1.55]">
          Figcit is not a crisis service. But you can connect to further help: if you are in danger
          or harm, call{' '}
          <a className={link} href="tel:999">
            999
          </a>
          . For urgent mental health help, call{' '}
          <a className={link} href="tel:111">
            NHS 111
          </a>{' '}
          and choose option 2. Samaritans:{' '}
          <a className={link} href="tel:116123">
            116 123
          </a>{' '}
          (free, 24 hours). Or{' '}
          <a className={link} href="sms:85258?body=SHOUT">
            text SHOUT to 85258
          </a>
          .
        </p>
      </div>
    </aside>
  )
}
