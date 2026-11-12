function e(e) {
	let t = e.dataset.copy;
	if (!t || !navigator.clipboard) return;
	let n = e.closest(`section`)?.querySelector(`[data-copy-status]`);
	e.hidden = !1, e.addEventListener(`click`, async () => {
		try {
			await navigator.clipboard.writeText(t), n && (n.textContent = e.dataset.copied ?? ``);
		} catch {
			n && (n.textContent = t);
		}
	});
}
for (let t of document.querySelectorAll(`button[data-copy]`)) e(t);
