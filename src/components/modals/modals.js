(()=>{
	let body = document.getElementsByTagName('body')[0];
	let modalWrapper = document.querySelector('article.modal');
	if (!modalWrapper) {
		console.warn('Block of modals is not found');
		return false
	}
	let modalActivators = document.querySelectorAll('[data-open-modal]');
	if (modalActivators.length < 1) {
		console.warn('No modal activators found on the page');
		return false
	}

	modalActivators.forEach((activator)=>{
		activator.addEventListener('click', (e)=>{
			e.preventDefault();
			let modalType = e.currentTarget.dataset.openModal;
			if (body.classList.contains('show-modal')) {
				if (!document.getElementById(modalType).classList.contains('active')) {
					hideModal();
					showModal(modalType)
				} else {
					hideModal();
				}
			} else {
				showModal(modalType);
			}
		}, false);
	});

	function hideModal() {
		modalWrapper.dispatchEvent(new CustomEvent('hideModal', {bubbles: true}));
		body.classList.remove('show-modal');
		modalWrapper.classList.remove('showed');
		window.lockScroll(false);
		modalWrapper.querySelectorAll('.active').forEach(contentWrapper => {
			contentWrapper.classList.remove('active');
			contentWrapper.classList.add('hidden');
			window.stopMedia(contentWrapper);
		});
	}

	function showModal(modalType) {
		modalWrapper.dispatchEvent(new CustomEvent('showModal', {bubbles: true}));
		let contentWrapper = document.getElementById(modalType);
		if (!contentWrapper) {
			console.warn('Needed modal is not found');
			return false;
		}
		modalWrapper.classList.add('showed');
		contentWrapper.classList.add('active');
		contentWrapper.classList.remove('hidden');
		body.classList.add('show-modal');
		body.classList.remove('show-menu');
		window.lockScroll(true);
		if (modalWrapper.classList.contains('autofocus')) {
			(input=>{
				if (input) input.focus();
			})(document.getElementById(modalType).querySelector('input'))
		}
	}

	[
		modalWrapper.querySelector('.modal-veil'),
		document.querySelector('.header-modal-btn')
	].forEach((elem)=>{
		if (!elem) {return}
		elem.addEventListener('click', function (e) {
			e.preventDefault();
			hideModal();
		}, false);
	});


	window.closeModals = hideModal;
	window.openModal = showModal;

	document.addEventListener('keyup', function (e) {
		if (e.key === "Escape" && body.classList.contains('show-modal')) {
			hideModal();
		}
	}, false);

})()
