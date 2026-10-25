// Receives Content Security Policy violation reports from browsers (T28). Reports are
// logged in a short, fixed shape with query strings removed, so no personal data from
// URLs ends up in the logs. Always answers 204, so it can't be used to probe the site.
const MAX_BYTES = 16 * 1024

type Report = Record<string, unknown>

const stripQuery = (value: unknown) =>
  typeof value === 'string' ? value.split(/[?#]/)[0].slice(0, 200) : undefined

function summarise(r: Report) {
  return {
    directive: String(
      r['effectiveDirective'] ?? r['effective-directive'] ?? r['violated-directive'] ?? '',
    ).slice(0, 80),
    blocked: stripQuery(r['blockedURL'] ?? r['blocked-uri']),
    page: stripQuery(r['documentURL'] ?? r['document-uri']),
  }
}

export async function POST(request: Request) {
  const length = Number(request.headers.get('content-length') ?? 0)
  if (length > MAX_BYTES) return new Response(null, { status: 204 })
  try {
    const text = (await request.text()).slice(0, MAX_BYTES)
    const body: unknown = JSON.parse(text)
    // Reporting API sends an array of { type, body }; the older format sends
    // { "csp-report": { ... } }.
    const reports: Report[] = Array.isArray(body)
      ? body.filter((b) => b?.type === 'csp-violation').map((b) => b.body as Report)
      : [((body as Record<string, unknown>)['csp-report'] ?? {}) as Report]
    for (const r of reports.slice(0, 10)) console.warn('[csp]', JSON.stringify(summarise(r)))
  } catch {
    // Ignore malformed reports.
  }
  return new Response(null, { status: 204 })
}
