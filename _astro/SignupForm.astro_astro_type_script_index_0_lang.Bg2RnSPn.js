var e = new Set([
	400,
	403,
	422,
	429,
	503
]);
function t(e) {
	let t = new URLSearchParams(e).get(`email`)?.trim() ?? ``;
	return t === `` || t.length > 254 || !/^[^\s@]+@[^\s@]+$/.test(t) ? null : t;
}
function n(e, t) {
	let n = String(e.get(`cf-turnstile-response`) ?? e.get(`turnstileToken`) ?? ``).trim();
	return {
		email: t,
		locale: String(e.get(`locale`) ?? ``),
		topics: e.getAll(`topics`).map(String),
		consent: !0,
		website: ``,
		...n === `` ? {} : { turnstileToken: n }
	};
}
function r(e, t = globalThis.turnstile) {
	let n = e.querySelector(`.cf-turnstile`);
	return !n || !t ? !1 : (t.reset(n), !0);
}
function i(e, n) {
	let r = t(n.search);
	if (r === null) return !1;
	let i = e.querySelector(`input[name="email"]`);
	if (!i) return !1;
	i.value = r;
	let a = new URLSearchParams(n.search);
	a.delete(`email`);
	let o = a.toString();
	history.replaceState(history.state, ``, `${n.pathname}${o ? `?${o}` : ``}${n.hash || `#signup`}`);
	let s = e.querySelector(`[data-signup-status]`);
	s && (s.textContent = e.dataset.prefilled ?? ``);
	let c = e.closest(`[id]:not(form)`) ?? e, l = document.getElementById(e.getAttribute(`aria-labelledby`) ?? ``), u = i.disabled ? l : i, d = () => requestAnimationFrame(() => {
		c.scrollIntoView({ block: `start` }), u?.focus({ preventScroll: !0 });
	});
	return document.readyState === `complete` ? d() : window.addEventListener(`load`, d, { once: !0 }), !0;
}
function a(e, t) {
	return e.querySelector(t);
}
function o(t) {
	let i = t.dataset, o = a(t, `[data-signup-alert]`), s = a(t, `[data-signup-status]`), c = a(t, `[data-signup-submit]`), l = a(t, `input[name="email"]`), u = a(t, `input[name="consent"]`), d = [...t.querySelectorAll(`input[name="topics"]`)], f = a(t, `input[name="website"]`);
	if (!o || !s || !c || !l || !u) return;
	t.noValidate = !0;
	let p = c.textContent ?? ``, m = t.dataset.doneId ? document.getElementById(t.dataset.doneId) : null;
	function h() {
		t.reset(), m ? (t.hidden = !0, m.hidden = !1, m.focus()) : s.textContent = i.done ?? ``;
	}
	let g = {
		email: l,
		topics: d[0],
		consent: u
	}, _ = (e) => a(t, `[data-error-for="${e}"]`);
	function v() {
		o.replaceChildren(), s.textContent = ``;
		for (let e of [
			`email`,
			`topics`,
			`consent`
		]) {
			let t = _(e);
			t && (t.textContent = ``);
		}
		for (let e of [
			l,
			u,
			...d
		]) e.removeAttribute(`aria-invalid`);
	}
	function y(e, n, r) {
		let i = document.createElement(`div`);
		i.className = `sk-alert sk-alert--danger`;
		let a = document.createElement(`p`);
		if (a.className = `sk-alert__title`, a.textContent = e, i.append(a), r) {
			let e = document.createElement(`p`);
			e.textContent = r, i.append(e);
		}
		if (n.length) {
			let e = document.createElement(`ul`);
			for (let r of n) {
				let n = document.createElement(`li`), i = document.createElement(`a`);
				i.href = `#${g[r.field]?.id || t.id}`, i.className = `sk-link`, i.textContent = r.text, i.addEventListener(`click`, (e) => {
					e.preventDefault(), g[r.field]?.focus();
				}), n.append(i), e.append(n);
			}
			i.append(e);
		}
		o.replaceChildren(i);
	}
	function b() {
		let e = [];
		l.value = l.value.trim(), l.value !== `` && l.validity.valid || e.push({
			field: `email`,
			text: i.errorEmail ?? ``
		}), d.some((e) => e.checked) || e.push({
			field: `topics`,
			text: i.errorTopics ?? ``
		}), u.checked || e.push({
			field: `consent`,
			text: i.errorConsent ?? ``
		});
		for (let t of e) {
			let e = _(t.field);
			e && (e.textContent = t.text);
			let n = t.field === `topics` ? d : [g[t.field]];
			for (let e of n) e?.setAttribute(`aria-invalid`, `true`);
		}
		return e;
	}
	function x(e) {
		c.disabled = e, c.textContent = e ? i.sending ?? p : p;
	}
	t.addEventListener(`submit`, async (a) => {
		a.preventDefault(), v();
		let o = b();
		if (o.length) {
			y(i.errorTitle ?? ``, o), g[o[0].field]?.focus();
			return;
		}
		if (f?.value) {
			h();
			return;
		}
		let s = n(new FormData(t), l.value);
		x(!0);
		try {
			let n = await fetch(t.action, {
				method: `POST`,
				headers: {
					accept: `application/json`,
					"content-type": `application/json`
				},
				body: JSON.stringify(s),
				credentials: `omit`,
				redirect: `error`
			});
			if (n.ok) h();
			else {
				let a = e.has(n.status) ? t.getAttribute(`data-error-${n.status}`) : null;
				y(i.errorTitle ?? ``, [], a ?? i.errorServer), r(t);
			}
		} catch {
			y(i.errorTitle ?? ``, [], i.errorNetwork), r(t);
		} finally {
			x(!1);
		}
	});
}
for (let e of document.querySelectorAll(`form[data-signup-prefill]`)) i(e, window.location);
for (let e of document.querySelectorAll(`form[data-signup]`)) o(e);
