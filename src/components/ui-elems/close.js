(()=>{
	[].forEach.call(document.querySelectorAll(".closeable"), (parent) => {
		parent.querySelector('.cross').addEventListener('click', function () {
			parent.classList.add('invisible');
			parent.addEventListener('transitionend', function () {
				parent.classList.add('removed');
			}, {once: true});
		}, false);
	});
})()
