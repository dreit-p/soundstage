import objectFitImages from 'object-fit-images';
import 'css-element-queries/src/ResizeSensor';
import 'focus-visible';
import ElementQueries from 'css-element-queries/src/ElementQueries';

ElementQueries.listen();
ElementQueries.init();

window.throttling = (() => {
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
		// last exec on event end
		clearTimeout(forLastExec);
		forLastExec = setTimeout(cb, delay);
	}
})()

window.lockScroll = (state = true) => {
	let body = document.getElementsByTagName('body')[0];
	if (state) {
		let scrollWidth = window.innerWidth - document.documentElement.clientWidth;
		body.classList.add('scroll-locked');
		body.style.overflowX = 'hidden';
		body.style.overflowY = 'hidden';
		body.style.paddingRight = scrollWidth + 'px';
		body.style.right = scrollWidth + 'px';
	} else {
		body.classList.remove('scroll-locked');
		body.style.overflowX = 'auto';
		body.style.overflowY = 'unset';
		body.style.paddingRight = 0;
		body.style.right = 0;
	}
}

window.setOutsideClickListener = (targetData, cb = ()=>{}) => {
	let body = document.getElementsByTagName('body')[0];
	let targets = [];
	switch(typeof targetData) {
	case 'string':
		targets = [body.querySelector(targetData)];
		break;
	case 'object':
		window.test = targetData;
		if (Array.isArray(targetData)) {
			targets = targetData;
		} else {
			targets = [targetData];
		}
		break;
	default:
		targets = [targetData];
	}
	let task = (e) => {
		if (!targets.some(target=>target.contains(e.target))) {
			cb(e);
			body.removeEventListener('mouseup', task, false);
		}
	}
	body.removeEventListener('mouseup', task, false);
	body.addEventListener('mouseup', task, false);
}

/**
 * Stop an iframe or HTML5 <video, audio> from playing
 * @param  {Element} element The element that contains the video
 */
window.stopMedia = element => {
	element.querySelectorAll('iframe').forEach(function(iframe) {
		try {
			let iframeContent = iframe.contentWindow.document;
			window.stopMedia(iframeContent);
			return;
		} catch (e) {
			/* Cross Domain, resetting src is all we can do */
			let iframeSrc = iframe.src;
			iframe.src = iframeSrc;
		}
	});
	element.querySelectorAll('video').forEach(item => item.pause());
	element.querySelectorAll('audio').forEach(item => item.pause());
};

document.querySelectorAll('a[href="#"], a[href=""], a[href="https://example.com/"]').forEach((elem) => {
	elem.addEventListener('click', function(e) {
		e.preventDefault();
	}, false);
});

document.querySelectorAll('.ellipsized .read-more').forEach((btn) => {
	let parent = btn.closest('.ellipsized');
	parent.addEventListener('click', (e) => {
		e.preventDefault();
		parent.classList.remove('ellipsized');
	}, false);
});

let objFitImages = document.getElementsByClassName('objfit');
objectFitImages(objFitImages);

(function(document, window) {
	document.addEventListener("DOMContentLoaded", function() {
		var baseUrl = window.location.href
			.replace(window.location.hash, "").replace("#", '');
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

// Custom vh unit for chrome mobile
window.addEventListener('resize', () => {
	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	let vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);
});
