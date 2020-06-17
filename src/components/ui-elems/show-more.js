(()=>{
	[].forEach.call(document.querySelectorAll('[data-hide-by]'), (wrapper) => {
		let step = +wrapper.dataset.hideBy;
		let currentPosition = 0;
		let list = wrapper.querySelector('.chopped-list').children;

		let showNextPart = ()=>{
			if (currentPosition < list.length) {
				for (let i=0;i < Math.min(list.length - currentPosition+1, step); i++) {
					list[currentPosition].classList.remove('hidden');
					currentPosition++;
				}
			}
			if (currentPosition >= list.length) {
				wrapper.classList.add('completed');
			}
		}
		showNextPart();

		wrapper.querySelector('.show-more').addEventListener('click', (e)=>{
			e.preventDefault();
			showNextPart();
		}, false);

	});
})()
