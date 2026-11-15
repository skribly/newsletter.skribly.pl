import { n as e } from "./motion.DMAhcwwu.js";
import { n as t } from "./strings.By9TPO35.js";
var n = 1.5, r = {
	scale: 1,
	x: 0,
	y: 0
};
function i(e) {
	return Math.min(5, Math.max(1, e));
}
function a(e, t, n) {
	let a = i(e.scale);
	if (a === 1) return r;
	let o = Math.max(0, (n.width * a - t.width) / 2), s = Math.max(0, (n.height * a - t.height) / 2);
	return {
		scale: a,
		x: Math.min(o, Math.max(-o, e.x)),
		y: Math.min(s, Math.max(-s, e.y))
	};
}
function o(e, t, n, r, o) {
	let s = i(t), c = s / e.scale;
	return a({
		scale: s,
		x: n.x - (n.x - e.x) * c,
		y: n.y - (n.y - e.y) * c
	}, r, o);
}
function s(e, t, n, r, i) {
	return o(e, e.scale * t, n, r, i);
}
function c(e, t, n, r, i) {
	return a({
		...e,
		x: e.x + t,
		y: e.y + n
	}, r, i);
}
function l(e, t) {
	return Math.hypot(e.x - t.x, e.y - t.y);
}
function u(e, t) {
	return {
		x: (e.x + t.x) / 2,
		y: (e.y + t.y) / 2
	};
}
function d(e, t) {
	return Math.abs(e) < 48 || Math.abs(e) < Math.abs(t) * 1.5 ? 0 : e < 0 ? 1 : -1;
}
function f(e, t, n) {
	return Math.min(n - 1, Math.max(0, e + t));
}
var p = `main img, [data-sk-lightbox] img`, m = `http://www.w3.org/2000/svg`, h = 48, g = {
	"action.close": [`M18 6 6 18`, `m6 6 12 12`],
	"action.add": [`M5 12h14`, `M12 5v14`],
	"action.remove": [`M5 12h14`],
	"action.reset": [`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`, `M3 3v5h5`],
	"chevron.left": [`m15 18-6-6 6-6`],
	"chevron.right": [`m9 18 6-6-6-6`]
};
function ee(e, t) {
	let n = e.createElementNS(m, `svg`);
	for (let [e, r] of Object.entries({
		"aria-hidden": `true`,
		class: `sk-icon`,
		"data-icon": t,
		focusable: `false`,
		viewBox: `0 0 24 24`,
		width: `20`,
		height: `20`,
		fill: `none`,
		stroke: `currentColor`,
		"stroke-width": `1.75`,
		"stroke-linecap": `round`,
		"stroke-linejoin": `round`
	})) n.setAttribute(e, r);
	for (let r of g[t]) {
		let t = e.createElementNS(m, `path`);
		t.setAttribute(`d`, r), n.append(t);
	}
	return n;
}
function _(e) {
	return e.documentElement.lang.toLowerCase().startsWith(`pl`) ? `pl` : `en`;
}
function v(e) {
	return !(!(e instanceof HTMLImageElement) || e.closest(`[data-sk-lightbox="off"]`) || e.closest(`a[href], button, header, footer, nav, dialog, astro-island, .sk-lightbox`) || !e.hasAttribute(`alt`) || e.alt.trim() === `` || e.getAttribute(`role`) === `presentation` || e.getAttribute(`aria-hidden`) === `true`);
}
function te(e) {
	let t = e.closest(`figure`)?.querySelector(`figcaption`)?.textContent?.trim() ?? ``;
	return {
		image: e,
		src: e.dataset.skFull || e.currentSrc || e.src,
		alt: e.alt,
		caption: t
	};
}
function y(e, t = document) {
	let n = e.closest(`[data-sk-lightbox-group]`);
	if (!n) {
		let t = e.closest(`figure`)?.parentElement;
		t && t.querySelectorAll(`:scope > figure`).length > 1 && (n = t);
	}
	if (!n) return [e];
	let r = [...n.querySelectorAll(`img`)].filter(v);
	return r.includes(e) && t ? r : [e];
}
function b(e, n = {}) {
	if (`skLightboxReady` in e.dataset) return;
	let r = t(_(e.ownerDocument), n);
	e.dataset.skLightboxReady = ``, e.setAttribute(`role`, `button`), e.setAttribute(`aria-haspopup`, `dialog`), e.setAttribute(`aria-label`, `${r.lightboxOpen}: ${e.alt}`), e.hasAttribute(`tabindex`) || (e.tabIndex = 0);
}
var x = null;
function S(i, p = window, m = {}) {
	let g = p.document, v = t(_(g), m), b = y(i).map(te), S = Math.max(0, b.findIndex((e) => e.image === i)), C = b.length, w = r, T = new Map(), E = null, D = 0, O = 0;
	x?.close();
	let k = g.createElement(`dialog`);
	k.className = `sk-lightbox`, k.setAttribute(`aria-label`, v.lightboxDialog);
	let A = (e, t, n = ``) => {
		let r = g.createElement(`button`);
		return r.type = `button`, r.className = `sk-icon-button sk-lightbox__button ${n}`.trim(), r.setAttribute(`aria-label`, t), r.append(ee(g, e)), r;
	}, j = g.createElement(`div`);
	j.className = `sk-lightbox__bar`;
	let M = g.createElement(`p`);
	M.className = `sk-lightbox__position`, M.setAttribute(`aria-live`, `polite`);
	let N = A(`action.remove`, v.lightboxZoomOut), P = A(`action.reset`, v.lightboxZoomReset), F = A(`action.add`, v.lightboxZoomIn), I = A(`action.close`, v.lightboxClose);
	j.append(M, N, P, F, I);
	let L = g.createElement(`div`);
	L.className = `sk-lightbox__stage`;
	let R = g.createElement(`img`);
	R.className = `sk-lightbox__image`, R.draggable = !1, L.append(R);
	let z = A(`chevron.left`, v.lightboxPrevious, `sk-lightbox__previous`), B = A(`chevron.right`, v.lightboxNext, `sk-lightbox__next`), V = g.createElement(`div`);
	V.className = `sk-lightbox__middle`, V.append(L);
	let H = g.createElement(`p`);
	H.className = `sk-lightbox__caption`;
	let U = g.createElement(`nav`);
	U.className = `sk-lightbox__thumbs`, U.setAttribute(`aria-label`, v.lightboxThumbnails);
	let W = g.createElement(`ul`), G = b.map((e, t) => {
		let n = g.createElement(`li`), r = g.createElement(`button`);
		r.type = `button`, r.setAttribute(`aria-label`, `${v.lightboxShow} ${t + 1}: ${e.alt}`);
		let i = g.createElement(`img`);
		return i.alt = ``, i.draggable = !1, i.src = e.src, r.append(i), r.addEventListener(`click`, () => Y(t)), n.append(r), W.append(n), r;
	});
	U.append(W), C > 1 && V.append(z, B), k.append(j, V, H), C > 1 && k.append(U);
	let K = () => {
		let e = L.getBoundingClientRect();
		return {
			stage: {
				width: e.width,
				height: e.height
			},
			fitted: {
				width: R.offsetWidth,
				height: R.offsetHeight
			}
		};
	}, q = (e) => {
		let t = L.getBoundingClientRect();
		return {
			x: e.clientX - t.left - t.width / 2,
			y: e.clientY - t.top - t.height / 2
		};
	}, ne = () => {
		R.style.transform = `translate(${w.x}px, ${w.y}px) scale(${w.scale})`, k.toggleAttribute(`data-zoomed`, w.scale > 1), N.disabled = w.scale <= 1, P.disabled = w.scale <= 1, F.disabled = w.scale >= 5;
	}, J = (e) => {
		w = e, ne();
	}, Y = (e) => {
		S = f(e, 0, C);
		let t = b[S];
		R.src = t.src, R.alt = t.alt, H.textContent = t.caption, H.hidden = t.caption === ``, M.textContent = `${S + 1} / ${C}`, M.hidden = C < 2, z.disabled = S === 0, B.disabled = S === C - 1, G.forEach((e, t) => {
			t === S ? e.setAttribute(`aria-current`, `true`) : e.removeAttribute(`aria-current`);
		}), G[S]?.scrollIntoView?.({
			block: `nearest`,
			inline: `center`
		}), J(r);
	}, X = (e) => {
		let t = f(S, e, C);
		t !== S && Y(t);
	}, Z = (e) => {
		if (O = Date.now(), w.scale > 1) J(r);
		else {
			let { stage: t, fitted: n } = K();
			J(o(r, 2.5, q(e), t, n));
		}
	}, Q = (e) => {
		let { stage: t, fitted: n } = K();
		J(s(w, e, {
			x: 0,
			y: 0
		}, t, n));
	};
	F.addEventListener(`click`, () => Q(n)), N.addEventListener(`click`, () => Q(1 / n)), P.addEventListener(`click`, () => J(r)), z.addEventListener(`click`, () => X(-1)), B.addEventListener(`click`, () => X(1)), I.addEventListener(`click`, () => k.close()), L.addEventListener(`wheel`, (e) => {
		e.preventDefault();
		let { stage: t, fitted: n } = K();
		J(o(w, w.scale * Math.exp(-e.deltaY * .0015 * (e.ctrlKey ? 4 : 1)), q(e), t, n));
	}, { passive: !1 }), L.addEventListener(`pointerdown`, (e) => {
		L.setPointerCapture?.(e.pointerId), T.set(e.pointerId, {
			x: e.clientX,
			y: e.clientY
		});
		let [t, n] = [...T.values()];
		E = {
			start: {
				x: e.clientX,
				y: e.clientY
			},
			origin: w,
			pinch: t && n ? l(t, n) : 0,
			moved: !1
		};
	}), L.addEventListener(`pointermove`, (e) => {
		if (!T.has(e.pointerId) || !E) return;
		T.set(e.pointerId, {
			x: e.clientX,
			y: e.clientY
		});
		let { stage: t, fitted: n } = K(), [r, i] = [...T.values()];
		if (r && i && E.pinch > 0) {
			let e = u(r, i), a = L.getBoundingClientRect(), s = {
				x: e.x - a.left - a.width / 2,
				y: e.y - a.top - a.height / 2
			};
			E.moved = !0, J(o(E.origin, E.origin.scale * (l(r, i) / E.pinch), s, t, n));
			return;
		}
		let s = e.clientX - E.start.x, c = e.clientY - E.start.y;
		Math.abs(s) + Math.abs(c) > 4 && (E.moved = !0), E.origin.scale > 1 && J(a({
			...E.origin,
			x: E.origin.x + s,
			y: E.origin.y + c
		}, t, n));
	});
	let $ = (e) => {
		let t = E, n = T.size > 1;
		if (T.delete(e.pointerId), t) {
			if (T.size > 0) {
				let [e] = [...T.values()];
				e && (E = {
					start: e,
					origin: w,
					pinch: 0,
					moved: !0
				});
			} else if (E = null, !n) {
				if (t.origin.scale === 1 && w.scale === 1) {
					let n = d(e.clientX - t.start.x, e.clientY - t.start.y);
					if (n !== 0) {
						X(n);
						return;
					}
				}
				!t.moved && e.target === L ? k.close() : !t.moved && e.pointerType !== `mouse` && (e.timeStamp - D < 320 ? (D = 0, Z(e)) : D = e.timeStamp);
			}
		}
	};
	return L.addEventListener(`pointerup`, $), L.addEventListener(`pointercancel`, $), L.addEventListener(`dblclick`, (e) => {
		Date.now() - O > 500 && Z(e);
	}), k.addEventListener(`keydown`, (e) => {
		if (e.altKey || e.ctrlKey || e.metaKey) return;
		let t = w.scale > 1, { stage: i, fitted: a } = K();
		switch (e.key) {
			case `+`:
			case `=`:
				Q(n);
				break;
			case `-`:
			case `_`:
				Q(1 / n);
				break;
			case `0`:
				J(r);
				break;
			case `ArrowLeft`:
				t ? J(c(w, h, 0, i, a)) : X(-1);
				break;
			case `ArrowRight`:
				t ? J(c(w, -48, 0, i, a)) : X(1);
				break;
			case `ArrowUp`:
				if (!t) return;
				J(c(w, 0, h, i, a));
				break;
			case `ArrowDown`:
				if (!t) return;
				J(c(w, 0, -48, i, a));
				break;
			case `Home`:
				X(-C);
				break;
			case `End`:
				X(C);
				break;
			default: return;
		}
		e.preventDefault();
	}), k.addEventListener(`click`, (e) => {
		e.target === k && k.close();
	}), k.addEventListener(`close`, () => {
		k.remove(), x === k && (x = null), g.documentElement.classList.remove(`sk-lightbox-open`), i.isConnected && i.focus({ preventScroll: !0 });
	}), g.body.append(k), x = k, g.documentElement.classList.add(`sk-lightbox-open`), k.dataset.motion = e(p) ? `on` : `off`, Y(S), k.showModal(), I.focus({ preventScroll: !0 }), k;
}
function C(e = document, t = window, n = {}) {
	let r = (e) => {
		for (let t of e.querySelectorAll(p)) v(t) && b(t, n);
	};
	r(e);
	let i = 0;
	new MutationObserver(() => {
		i === 0 && (i = t.requestAnimationFrame(() => {
			i = 0, r(e);
		}));
	}).observe(e.body, {
		childList: !0,
		subtree: !0
	});
	let a = (e) => {
		let r = e instanceof Element ? e.closest(`img[data-sk-lightbox-ready]`) : null;
		return r ? (S(r, t, n), !0) : !1;
	};
	e.addEventListener(`click`, (e) => {
		e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || a(e.target);
	}), e.addEventListener(`keydown`, (e) => {
		(e.key === `Enter` || e.key === ` `) && a(e.target) && e.preventDefault();
	});
}
C(document, window);
