var e = new Set([
	403,
	422,
	429,
	503
]);
function t(e) {
	let t = new URLSearchParams(e).get(`email`)?.trim() ?? ``;
	return t === `` || t.length > 254 || !/^[^\s@]+@[^\s@]+$/.test(t) ? null : t;
}
function n(e, n) {
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
function r(e, t) {
	return e.querySelector(t);
}
function i(t) {
	let n = t.dataset, i = r(t, `[data-signup-alert]`), a = r(t, `[data-signup-status]`), o = r(t, `[data-signup-submit]`), s = r(t, `input[name="email"]`), c = r(t, `input[name="consent"]`), l = [...t.querySelectorAll(`input[name="topics"]`)], u = r(t, `input[name="website"]`);
	if (!i || !a || !o || !s || !c) return;
	t.noValidate = !0;
	let d = o.textContent ?? ``, f = t.dataset.doneId ? document.getElementById(t.dataset.doneId) : null;
	function p() {
		t.reset(), f ? (t.hidden = !0, f.hidden = !1, f.focus()) : a.textContent = n.done ?? ``;
	}
	let m = {
		email: s,
		topics: l[0],
		consent: c
	}, h = (e) => r(t, `[data-error-for="${e}"]`);
	function g() {
		i.replaceChildren(), a.textContent = ``;
		for (let e of [
			`email`,
			`topics`,
			`consent`
		]) {
			let t = h(e);
			t && (t.textContent = ``);
		}
		for (let e of [
			s,
			c,
			...l
		]) e.removeAttribute(`aria-invalid`);
	}
	function _(e, n, r) {
		let a = document.createElement(`div`);
		a.className = `sk-alert sk-alert--danger`;
		let o = document.createElement(`p`);
		if (o.className = `sk-alert__title`, o.textContent = e, a.append(o), r) {
			let e = document.createElement(`p`);
			e.textContent = r, a.append(e);
		}
		if (n.length) {
			let e = document.createElement(`ul`);
			for (let r of n) {
				let n = document.createElement(`li`), i = document.createElement(`a`);
				i.href = `#${m[r.field]?.id || t.id}`, i.className = `sk-link`, i.textContent = r.text, i.addEventListener(`click`, (e) => {
					e.preventDefault(), m[r.field]?.focus();
				}), n.append(i), e.append(n);
			}
			a.append(e);
		}
		i.replaceChildren(a);
	}
	function v() {
		let e = [];
		s.value = s.value.trim(), s.value !== `` && s.validity.valid || e.push({
			field: `email`,
			text: n.errorEmail ?? ``
		}), l.some((e) => e.checked) || e.push({
			field: `topics`,
			text: n.errorTopics ?? ``
		}), c.checked || e.push({
			field: `consent`,
			text: n.errorConsent ?? ``
		});
		for (let t of e) {
			let e = h(t.field);
			e && (e.textContent = t.text);
			let n = t.field === `topics` ? l : [m[t.field]];
			for (let e of n) e?.setAttribute(`aria-invalid`, `true`);
		}
		return e;
	}
	function y(e) {
		o.disabled = e, o.textContent = e ? n.sending ?? d : d;
	}
	t.addEventListener(`submit`, async (r) => {
		r.preventDefault(), g();
		let i = v();
		if (i.length) {
			_(n.errorTitle ?? ``, i), m[i[0].field]?.focus();
			return;
		}
		if (u?.value) {
			p();
			return;
		}
		let a = new FormData(t), o = {
			email: s.value,
			locale: String(a.get(`locale`) ?? ``),
			topics: a.getAll(`topics`).map(String),
			consent: !0,
			website: ``
		};
		y(!0);
		try {
			let r = await fetch(t.action, {
				method: `POST`,
				headers: {
					accept: `application/json`,
					"content-type": `application/json`
				},
				body: JSON.stringify(o),
				credentials: `omit`,
				redirect: `error`
			});
			if (r.ok) p();
			else {
				let i = e.has(r.status) ? t.getAttribute(`data-error-${r.status}`) : null;
				_(n.errorTitle ?? ``, [], i ?? n.errorServer);
			}
		} catch {
			_(n.errorTitle ?? ``, [], n.errorNetwork);
		} finally {
			y(!1);
		}
	});
}
for (let e of document.querySelectorAll(`form[data-signup-prefill]`)) n(e, window.location);
for (let e of document.querySelectorAll(`form[data-signup]`)) i(e);
