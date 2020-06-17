import SimpleBar from 'simplebar';

(()=>{
	[].forEach.call(document.querySelectorAll(".custom-scroll"), el => {
		new SimpleBar(el, {
			autoHide: false
		});
	});
})()
