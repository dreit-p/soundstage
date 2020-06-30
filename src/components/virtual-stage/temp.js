if (process.env.NODE_ENV == 'development') {
	let wrapper = document.querySelector('.virtual-stage .another-blocks');
	let toggleBtns = wrapper.querySelectorAll('.toggle-chat');
	toggleBtns.forEach(function(btn) {
		btn.addEventListener('click', function() {
			wrapper.classList.toggle('show-appeal');
		}, false)
	});
}
