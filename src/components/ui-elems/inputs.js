import IMask from 'imask'

(()=>{
	let inputs = [
		...document.querySelectorAll('input[data-mask]'),
		...document.querySelectorAll('textarea[data-mask]')
	];

	inputs.forEach(function(input) {
		let mask = input.dataset.mask;
		IMask(input, {
			mask,
		});
	});
})();

(()=>{
	document.querySelectorAll('.ui-input[type="password"]').forEach(function(input) {
		let wrapper = input.closest('.ui-input-wrapper');
		let icon = wrapper.querySelector('.ui-input-icon');
		if (!icon) return false;

		icon.addEventListener('click', (e)=>{
			e.preventDefault();
			if (input.getAttribute('type') === "password") {
				icon.classList.toggle('switched', true);
				input.setAttribute('type', 'text');
			} else {
				icon.classList.toggle('switched', false);
				input.setAttribute('type', 'password');
			}
		}, false);
	});
})();
