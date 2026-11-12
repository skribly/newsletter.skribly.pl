function e(e = window) {
	return !e.document.documentElement.classList.contains(`a11y-reduce-motion`) && !e.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches;
}
var t = `sk-motion-change`;
export { e as n, t };
