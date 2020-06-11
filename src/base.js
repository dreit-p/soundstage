import objectFitImages from 'object-fit-images';

window.throttling = (()=>{
	let forLastExec,
		delay = 100, // delay between calls
		throttled = false;

	return function(cb) {
		// only run if we're not throttled
		if (!throttled) {
			// actual callback action
			cb();
			// we're throttled!
			throttled = true;
			// set a timeout to un-throttle
			setTimeout(function() {
				throttled = false;
			}, delay);
		}
		// last exec on resize end
		clearTimeout(forLastExec);
		forLastExec = setTimeout(cb, delay);
	}
})()

window.lockScroll = (state =true)=>{
	let body = document.getElementsByTagName('body')[0];
	if (state) {
		let scrollWidth = window.innerWidth - document.documentElement.clientWidth;
		body.classList.add('scroll-locked');
		body.style.overflowX = 'hidden';
		body.style.overflowY = 'hidden';
		body.style.paddingRight = scrollWidth + 'px';
	} else {
		body.classList.remove('scroll-locked');
		body.style.overflowX = 'auto';
		body.style.overflowY = 'auto';
		body.style.paddingRight = 0;
	}
}

window.setOutsideClickListener = (target, cb)=>{
	let body = document.getElementsByTagName('body')[0];
	let theTarget = typeof target == 'string' ? body.querySelector(target) : target;
	body.removeEventListener('mouseup', task, false);
	let task = (e)=>{
		if (!theTarget.contains(e.target)) {
			cb();
			e.target.removeEventListener('mouseup', task, false)
		}
	}
	body.addEventListener('mouseup', task, false);
}

document.querySelectorAll('a[href="#"], a[href=""], a[href="https://example.com/"]').forEach((elem)=>{
	elem.addEventListener('click', function (e) {
		e.preventDefault();
	}, false);
});

document.querySelectorAll('.ellipsized .read-more').forEach((btn)=>{
	let parent = btn.closest('.ellipsized');
	parent.addEventListener('click', (e)=>{
		e.preventDefault();
		parent.classList.remove('ellipsized');
	}, false);
});

let objFitImages = document.getElementsByClassName('objfit');
objectFitImages(objFitImages);

(function(document, window) {
	document.addEventListener("DOMContentLoaded", function() {
		var baseUrl = window.location.href
			.replace(window.location.hash, "");
		[].slice.call(document.querySelectorAll("use[*|href]"))
			.filter(function(element) {
				return (element.getAttribute("href").indexOf("#") === 0);
			})
			.forEach(function(element) {
				element.setAttribute("href", baseUrl + element.getAttribute("href"));
			});
	}, false);
// eslint-disable-next-line
}(document, window));
