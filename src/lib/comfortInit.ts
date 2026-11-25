// Applies saved Comfort settings before first paint so the page never flashes (rules §8).
// Inlined in <head> by ComfortInit: as an external file it blocked rendering for about
// 300 ms on slow mobile connections (T27). Same keys as src/lib/comfort.ts; a constant
// string, never built from user input. It also hides the closed "Get the app" bar
// (AppBanner, key in src/lib/appBanner.ts).
export const comfortInitScript = `(function(){try{var s=JSON.parse(localStorage.getItem('figcit-comfort')||'{}'),d=document.documentElement;if(s.lowStim===true)d.setAttribute('data-comfort','low');if(s.textSize==='sm'||s.textSize==='lg')d.setAttribute('data-text-size',s.textSize);if(s.theme==='dark')d.setAttribute('data-theme','dark');if(localStorage.getItem('figcit-app-banner')==='hidden')d.setAttribute('data-app-banner','hidden')}catch(_){}})()`
