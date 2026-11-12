function e(e, t) {
	return e.querySelector(t);
}
function t(t) {
	let n = t.dataset, r = e(t, `[data-signup-alert]`), i = e(t, `[data-signup-status]`), a = e(t, `[data-signup-submit]`), o = e(t, `input[name="email"]`), s = e(t, `input[name="consent"]`), c = [...t.querySelectorAll(`input[name="topics"]`)], l = e(t, `input[name="website"]`);
	if (!r || !i || !a || !o || !s) return;
	t.noValidate = !0;
	let u = a.textContent ?? ``, d = {
		email: o,
		topics: c[0],
		consent: s
	}, f = (n) => e(t, `[data-error-for="${n}"]`);
	function p() {
		r.replaceChildren(), i.textContent = ``;
		for (let e of [
			`email`,
			`topics`,
			`consent`
		]) {
			let t = f(e);
			t && (t.textContent = ``);
		}
		for (let e of [
			o,
			s,
			...c
		]) e.removeAttribute(`aria-invalid`);
	}
	function m(e, n, i) {
		let a = document.createElement(`div`);
		a.className = `sk-alert sk-alert--danger`;
		let o = document.createElement(`p`);
		if (o.className = `sk-alert__title`, o.textContent = e, a.append(o), i) {
			let e = document.createElement(`p`);
			e.textContent = i, a.append(e);
		}
		if (n.length) {
			let e = document.createElement(`ul`);
			for (let r of n) {
				let n = document.createElement(`li`), i = document.createElement(`a`);
				i.href = `#${d[r.field]?.id || t.id}`, i.className = `sk-link`, i.textContent = r.text, i.addEventListener(`click`, (e) => {
					e.preventDefault(), d[r.field]?.focus();
				}), n.append(i), e.append(n);
			}
			a.append(e);
		}
		r.replaceChildren(a);
	}
	function h() {
		let e = [];
		o.value = o.value.trim(), o.value !== `` && o.validity.valid || e.push({
			field: `email`,
			text: n.errorEmail ?? ``
		}), c.some((e) => e.checked) || e.push({
			field: `topics`,
			text: n.errorTopics ?? ``
		}), s.checked || e.push({
			field: `consent`,
			text: n.errorConsent ?? ``
		});
		for (let t of e) {
			let e = f(t.field);
			e && (e.textContent = t.text);
			let n = t.field === `topics` ? c : [d[t.field]];
			for (let e of n) e?.setAttribute(`aria-invalid`, `true`);
		}
		return e;
	}
	function g(e) {
		a.disabled = e, a.textContent = e ? n.sending ?? u : u;
	}
	t.addEventListener(`submit`, async (e) => {
		e.preventDefault(), p();
		let r = h();
		if (r.length) {
			m(n.errorTitle ?? ``, r), d[r[0].field]?.focus();
			return;
		}
		if (l?.value) {
			i.textContent = n.done ?? ``;
			return;
		}
		let a = new FormData(t), s = {
			email: o.value,
			language: String(a.get(`language`) ?? ``),
			topics: a.getAll(`topics`).map(String),
			consent: !0,
			website: ``,
			source: String(a.get(`source`) ?? ``)
		};
		g(!0);
		try {
			(await fetch(t.action, {
				method: `POST`,
				headers: {
					accept: `application/json`,
					"content-type": `application/json`
				},
				body: JSON.stringify(s),
				credentials: `omit`,
				redirect: `error`
			})).ok ? (t.reset(), i.textContent = n.done ?? ``) : m(n.errorTitle ?? ``, [], n.errorServer);
		} catch {
			m(n.errorTitle ?? ``, [], n.errorNetwork);
		} finally {
			g(!1);
		}
	});
}
for (let e of document.querySelectorAll(`form[data-signup]`)) t(e);
