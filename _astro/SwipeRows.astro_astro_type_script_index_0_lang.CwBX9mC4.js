import { n as e } from "./motion.DMAhcwwu.js";
import { n as t } from "./strings.By9TPO35.js";
var n = `.sk-grid, .sk-features, .card-grid, [data-sk-swipe]`, r = `(max-width: 47.99rem)`, i = `http://www.w3.org/2000/svg`;
function a(e) {
	let t = e.createElementNS(i, `svg`);
	for (let [e, n] of Object.entries({
		"aria-hidden": `true`,
		class: `sk-icon`,
		"data-icon": `chevron.right`,
		focusable: `false`,
		viewBox: `0 0 24 24`,
		width: `20`,
		height: `20`,
		fill: `none`,
		stroke: `currentColor`,
		"stroke-width": `1.75`,
		"stroke-linecap": `round`,
		"stroke-linejoin": `round`
	})) t.setAttribute(e, n);
	let n = e.createElementNS(i, `path`);
	return n.setAttribute(`d`, `m9 18 6-6-6-6`), t.append(n), t;
}
var o = 0;
function s(e) {
	return e.documentElement.lang.toLowerCase().startsWith(`pl`) ? `pl` : `en`;
}
function c(e) {
	return !(e instanceof HTMLElement) || e.closest(`[data-sk-swipe="off"]`) || e.closest(`astro-island`) || `skSwipeReady` in e.dataset || [...e.children].filter((e) => e instanceof HTMLElement).length < 2 ? !1 : e.matches(`.sk-features, .card-grid, [data-sk-swipe]`) ? !0 : e.querySelector(`:scope > .sk-card, :scope > .sk-feature, :scope > * > .sk-card, :scope > * > .sk-feature`) !== null;
}
function l(e) {
	let t = e;
	for (let e = 0; t && e < 4; e += 1) {
		let e = t.previousElementSibling;
		for (; e;) {
			if (/^H[1-6]$/.test(e.tagName)) return e.textContent?.trim() || null;
			let t = e.querySelector(`h1, h2, h3, h4, h5, h6`);
			if (t) return t.textContent?.trim() || null;
			e = e.previousElementSibling;
		}
		t = t.parentElement;
	}
	return null;
}
function u(e, t, n, r) {
	let i = e.createElement(`button`);
	return i.type = `button`, i.className = `sk-icon-button sk-swipe-bar__${n}`, i.setAttribute(`aria-label`, t), i.setAttribute(`aria-controls`, r), i.append(a(e)), i;
}
function d(e, t) {
	if (t.length === 0) return 0;
	let n = getComputedStyle(e).direction === `rtl`, r = e.getBoundingClientRect(), i = e.scrollWidth - e.clientWidth;
	if (i > 0 && Math.abs(e.scrollLeft) >= i - 4) return t.length - 1;
	let a = 0, o = 1 / 0;
	return t.forEach((e, t) => {
		let i = e.getBoundingClientRect(), s = Math.abs(n ? r.right - i.right : i.left - r.left);
		s < o && (o = s, a = t);
	}), a;
}
function f(n, i = window, a = {}) {
	let c = i.document, f = t(s(c), a), p = [...n.children].filter((e) => e instanceof HTMLElement);
	n.dataset.skSwipeReady = ``, o += 1, n.id ||= `sk-swipe-${o}`, !n.hasAttribute(`aria-label`) && !n.hasAttribute(`aria-labelledby`) && n.setAttribute(`aria-label`, l(n) ?? f.swipeRow);
	let m = c.createElement(`div`);
	m.className = `sk-swipe-bar`, m.dataset.skSwipeBar = ``;
	let h = u(c, f.swipePrevious, `previous`, n.id), g = u(c, f.swipeNext, `next`, n.id), _ = c.createElement(`span`);
	_.className = `sk-swipe-bar__position`, _.setAttribute(`aria-hidden`, `true`);
	let v = c.createElement(`p`);
	v.className = `sk-swipe-bar__hint`, v.textContent = f.swipeHint, m.append(h, _, g, v), n.after(m);
	let y = i.matchMedia?.(r), b = 0, x = () => {
		b = 0;
		let e = d(n, p), t = n.scrollWidth - n.clientWidth, r = Math.abs(n.scrollLeft);
		h.disabled = r <= 4, g.disabled = t <= 4 || r >= t - 4, _.textContent = `${e + 1} / ${p.length}`;
	}, S = (t) => {
		p[Math.max(0, Math.min(p.length - 1, t))]?.scrollIntoView({
			behavior: e(i) ? `smooth` : `instant`,
			block: `nearest`,
			inline: `start`
		});
	}, C = () => {
		y?.matches ?? !1 ? (n.tabIndex = 0, /^(UL|OL)$/.test(n.tagName) || n.setAttribute(`role`, `region`)) : (n.removeAttribute(`tabindex`), n.getAttribute(`role`) === `region` && n.removeAttribute(`role`)), x();
	};
	n.addEventListener(`scroll`, () => {
		m.dataset.skSwipeMoved = ``, b === 0 && (b = i.requestAnimationFrame(x));
	}, { passive: !0 }), h.addEventListener(`click`, () => S(d(n, p) - 1)), g.addEventListener(`click`, () => S(d(n, p) + 1)), n.addEventListener(`keydown`, (e) => {
		if (!(y?.matches ?? !1) || e.target !== n) return;
		let t = getComputedStyle(n).direction === `rtl`, r = e.key === `ArrowRight` ? 1 : e.key === `ArrowLeft` ? -1 : 0;
		if (r !== 0) S(d(n, p) + (t ? -r : r));
		else if (e.key === `Home`) S(0);
		else if (e.key === `End`) S(p.length - 1);
		else return;
		e.preventDefault();
	}), y?.addEventListener?.(`change`, C), typeof ResizeObserver == `function` && new ResizeObserver(x).observe(n), C();
}
function p(e = window, t = {}) {
	for (let r of e.document.querySelectorAll(n)) c(r) && f(r, e, t);
}
p(window);
