(()=>{

	var mainHeader = document.querySelector('header.main-header');

	if (!mainHeader) return false;

	window.addEventListener('scroll', function() {
		// eslint-disable-next-line
		window.throttling(function() {
			var scrolled = window.pageYOffset || document.documentElement.scrollTop;
			if (scrolled > 5) {
				mainHeader.classList.add('unsticked');
			} else {
				mainHeader.classList.remove('unsticked');
			}
		})
	}, false);

	let menuBtn = mainHeader.querySelector('.menu-btn');

	function toggleMenu(bool) {
		window.lockScroll(bool);
		menuBtn.classList.toggle('active', bool);
		mainHeader.classList.toggle('opened', bool);
		document.getElementsByTagName('body')[0].classList.toggle('show-menu', bool);
	}

	menuBtn.addEventListener('click', ()=>{

		if (!mainHeader.classList.contains('opened')) {
			toggleMenu(true);
			mainHeader.querySelector('.veil').addEventListener('click', function (e) {
				toggleMenu(false);
			}, false);
		} else {
			toggleMenu(false);
		}

	}, false);

})()

