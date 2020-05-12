(()=>{
	if (process.env.NODE_ENV == 'development') {
		document.querySelectorAll('.settings-nav .link').forEach(function(link) {
			link.addEventListener('click', function (e) {
				e.preventDefault();
				document.querySelector('section.settings-page').classList.add('show-content');
			}, false);
		});
	}
})()
