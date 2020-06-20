import IMask from 'imask'

/*============================
=            Mask            =
============================*/

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

/*=====  End of Mask  ======*/


/*=====================================
=            Dynamic width            =
=====================================*/

(()=>{

	function onChangeHandler(newValue) {}

	function getInputInstance(targetInput) {
		let inputElems = document.createElement('div');
		inputElems.classList = 'dynamic-width-num-wrapper';
		inputElems.innerHTML = '<div class="inputs"><div class="pseudo-input"></div></div>';

		let numElement = targetInput.cloneNode();
		numElement.classList = "";
		let pseudoInput = inputElems.getElementsByClassName('pseudo-input')[0];
		pseudoInput.innerHTML = numElement.value;

		numElement.addEventListener('blur', function (e) {
			e.target.value = parseFloat(e.target.value.replace(/[^+\d,.]/g, '') || 0);
			let val = e.target.value
			if (!!e.target.getAttribute('max') && +val > e.target.getAttribute('max')) {
				e.target.value = e.target.getAttribute('max');
			}
			if (!!e.target.getAttribute('min') && +val < e.target.getAttribute('min')) {
				e.target.value = e.target.getAttribute('min');
			}
			pseudoInput.innerHTML = e.target.value;
			onChangeHandler(e.target.value);
		}, false);

		numElement.addEventListener('input', function (e) {
			pseudoInput.innerHTML = e.target.value;
		}, false);

		inputElems.querySelector('.inputs').append(numElement);
		return inputElems;
	}

	let targetInputs = document.querySelectorAll('input.dynamic-width');
	[].forEach.call(targetInputs, (targetInput) => {

		let newInput = getInputInstance(targetInput);
		newInput.classList = newInput.classList +" "+ targetInput.classList;

		targetInput.parentElement.replaceChild(newInput, targetInput)
	})
})()

/*=====  End of Dynamic width  ======*/

