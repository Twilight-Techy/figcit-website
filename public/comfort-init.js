// Applies saved Comfort settings before first paint so the page never flashes (rules §8).
// Kept tiny and dependency-free; the same keys are written by src/lib/comfort.ts.
;(function () {
  try {
    var s = JSON.parse(localStorage.getItem('figcit-comfort') || '{}')
    var d = document.documentElement
    if (s.lowStim === true) d.setAttribute('data-comfort', 'low')
    if (s.textSize === 'sm' || s.textSize === 'lg') d.setAttribute('data-text-size', s.textSize)
    if (s.theme === 'dark') d.setAttribute('data-theme', 'dark')
  } catch (_) {}
})()
