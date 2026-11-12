function e(e, t) {
	let n = new URLSearchParams(t).get(`error`);
	if (n === null) return null;
	let r = [...e.querySelectorAll(`[data-thanks-error]`)], i = r.find((e) => e.dataset.thanksError === n) ?? r.find((e) => e.dataset.thanksError === `other`);
	if (!i) return null;
	let a = e.querySelector(`[data-thanks-done]`);
	a && (a.hidden = !0), i.hidden = !1;
	let o = document.querySelector(`.sk-hero__title`), s = document.querySelector(`.sk-hero__lead`), c = document.querySelector(`.sk-breadcrumbs [aria-current="page"]`);
	return o && i.dataset.title && (o.textContent = i.dataset.title), c && i.dataset.title && (c.textContent = i.dataset.title), s && i.dataset.text && (s.textContent = i.dataset.text), i.dataset.title && (document.title = `${i.dataset.title} · ${document.title.split(` · `).at(-1) ?? ``}`), i.dataset.thanksError ?? null;
}
var t = document.querySelector(`[data-thanks]`);
t && e(t, window.location.search);
