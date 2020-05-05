(()=>{
	document.querySelectorAll('section.breadcrumbs').forEach(function(container) {
		let threshold = 8;
		let list = container.querySelector('ul');

		window.onload = ()=>{
			list.scrollLeft = list.scrollWidth - list.clientWidth;
			container.classList.add('show');
		}

		let resizeHandler = ()=>{
			if (list.scrollLeft >= threshold) {
				container.classList.add('truncate-left');
			} else {
				container.classList.remove('truncate-left');
			}
			if ( list.scrollWidth - (list.clientWidth + list.scrollLeft) >= threshold) {
				container.classList.add('truncate-right');
			} else {
				container.classList.remove('truncate-right');
			}
		};
		resizeHandler();

		list.addEventListener('scroll', function () {
			window.throttling(resizeHandler);
		}, false);

		window.addEventListener('resize', function () {
			list.scrollLeft = list.scrollWidth - list.clientWidth;
			window.throttling(resizeHandler);
		}, false);
	});
})()
