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

	mainHeader.querySelector('.veil').addEventListener('click', function () {
		closeMenu();
	}, false);

	function toggleWrapper(bool) {
		window.lockScroll(bool);
		mainHeader.classList.toggle('opened', bool);
		document.getElementsByTagName('body')[0].classList.toggle('show-menu', bool);
	}

	function setMenuContent(type) {
		document.querySelectorAll('.menu-wrapper.active').forEach((menu)=>{
			menu.classList.remove('active');
		});
		if (type) {
			let wrapper = document.querySelector(`.menu-wrapper.${type}`);
			wrapper.classList.add('active');
			window.setOutsideClickListener(mainHeader, closeMenu);
		}
	}

	function closeMenu() {
		toggleWrapper(false);
		setMenuContent(false);
		document.querySelectorAll('.active[data-select-menu]').forEach((link)=>{
			link.classList.toggle('active', false)
		});
	}

	function selectMenu(type) {

		if (!type) {
			closeMenu();
			return false;
		}

		((activeMenu)=>{
			if (!!activeMenu && activeMenu.classList.contains(type)) {
				closeMenu();
				return false;
			}
			toggleWrapper(true);
			setMenuContent(type);
			document.querySelectorAll(`[data-select-menu="${type}"]`).forEach((link)=>link.classList.toggle('active', true));
		})(document.querySelector('.menu-wrapper.active'))

	}


	document.querySelectorAll('[data-select-menu]').forEach((link)=>{
		link.addEventListener('click', ()=>{
			selectMenu(link.dataset.selectMenu);
		}, false)
	});

	[].forEach.call(document.querySelectorAll("a.profile-menu"), (menuLink) => {
		menuLink.addEventListener('click', function (e) {
			e.preventDefault();

		}, false);
	});

})()

