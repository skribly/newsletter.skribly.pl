import { n as e } from "./strings.V5Od_1H7.js";
var t = `table`, n = 0;
function r(e) {
	return e.documentElement.lang.toLowerCase().startsWith(`pl`) ? `pl` : `en`;
}
function i(e) {
	if (!(e instanceof HTMLTableElement) || e.closest(`[data-sk-table="off"], astro-island, .sk-table--stack`) || `skTableReady` in e.dataset) return !1;
	let t = e.rows[0];
	return t !== void 0 && t.cells.length >= 2;
}
function a(e) {
	let t = Array.from(e.tBodies).flatMap((e) => Array.from(e.rows));
	return t.length > 0 && t.every((e) => e.cells[0]?.tagName === `TH`);
}
function o(e) {
	let t = e;
	for (let e = 0; t && e < 4; e += 1) {
		let e = t.previousElementSibling;
		for (; e;) {
			if (/^H[1-6]$/.test(e.tagName)) return e.textContent?.trim() || null;
			e = e.previousElementSibling;
		}
		t = t.parentElement;
	}
	return null;
}
function s(e, t) {
	let n = e.parentElement;
	if (n && n.matches(`.sk-table-wrap, .table-scroll, [data-scroll], .sk-table-scroll__box`) && n.children.length === 1) return n;
	let r = t.createElement(`div`);
	return r.className = `sk-table-scroll__box`, e.replaceWith(r), r.append(e), r;
}
function c(t, i = window, c = {}) {
	let l = i.document, u = e(r(l), c);
	t.dataset.skTableReady = ``, n += 1;
	let d = s(t, l), f = l.createElement(`div`);
	f.className = `sk-table-scroll`, d.replaceWith(f), f.append(d), d.classList.add(`sk-table-scroll__box`);
	let p = l.createElement(`p`);
	p.className = `sk-table-scroll__hint`, p.id = `sk-table-hint-${n}`, p.textContent = u.tableHint, p.hidden = !0, f.before(p), a(t) && (t.dataset.skTableSticky = ``);
	let m = d.getAttribute(`aria-label`) ?? d.getAttribute(`aria-labelledby`), h = t.caption;
	h && !h.id && (h.id = `sk-table-caption-${n}`);
	let g = o(f), _ = !1, v = 0, y = () => {
		v = 0;
		let e = getComputedStyle(d).direction === `rtl`, t = d.scrollWidth - d.clientWidth, n = Math.abs(d.scrollLeft), r = t > 1;
		f.toggleAttribute(`data-sk-table-overflow`, r);
		let i = r && n > 1, a = r && n < t - 1;
		f.toggleAttribute(`data-sk-table-start`, e ? a : i), f.toggleAttribute(`data-sk-table-end`, e ? i : a), p.hidden = !r, p.style.visibility = _ ? `hidden` : ``, r ? (d.tabIndex = 0, d.hasAttribute(`role`) || d.setAttribute(`role`, `region`), m || (h ? d.setAttribute(`aria-labelledby`, h.id) : d.setAttribute(`aria-label`, g ?? u.tableLabel)), d.setAttribute(`aria-describedby`, p.id)) : (d.removeAttribute(`tabindex`), d.removeAttribute(`aria-describedby`), m || (d.removeAttribute(`role`), d.removeAttribute(`aria-label`), d.removeAttribute(`aria-labelledby`)));
	}, b = () => {
		v === 0 && (v = i.requestAnimationFrame(y));
	};
	if (d.addEventListener(`scroll`, () => {
		_ = !0, b();
	}, { passive: !0 }), typeof ResizeObserver == `function`) {
		let e = new ResizeObserver(b);
		e.observe(d), e.observe(t);
	}
	i.addEventListener(`resize`, b, { passive: !0 }), y();
}
function l(e = window, n = {}) {
	for (let r of e.document.querySelectorAll(t)) i(r) && c(r, e, n);
}
l(window);
