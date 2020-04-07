import objectFitImages from 'object-fit-images';

/*==================================
=            components            =
==================================*/

import './components/header/header.js';

/*=====  End of components  ======*/


document.querySelectorAll('a[href="#"], a[href=""], a[href="https://example.com/"]').forEach((elem)=>{
	elem.addEventListener('click', function (e) {
		e.preventDefault();
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
