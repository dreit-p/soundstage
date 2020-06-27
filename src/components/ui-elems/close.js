(()=>{
	[].forEach.call(document.querySelectorAll(".closeable"), (parent) => {
		parent.querySelector('.cross').addEventListener('click', function () {
			parent.classList.add("closed");
		}, false);
	});
})()
