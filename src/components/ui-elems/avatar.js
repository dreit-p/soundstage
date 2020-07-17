(() => {
	var fileInputs = document.querySelectorAll('.avatar-editor input[type="file"]');

	[].forEach.call(fileInputs, (input) => {
		input.addEventListener('change', function() {
			if (!input.files[0]) return false;
			let reader = new FileReader();
			reader.onload = (e)=>{
				let image = input.closest('.avatar-editor').querySelector('.image');
				image.style.backgroundImage = `url(${e.target.result})`;
			};
			reader.readAsDataURL(input.files[0]);
		});
	})
})();
