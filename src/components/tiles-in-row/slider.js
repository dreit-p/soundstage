import Flickity from 'flickity';

[].forEach.call(document.querySelectorAll('.tiles-in-row.slider'), (slider) => {
	if (slider.querySelector('.slide')) {

		if (slider.querySelectorAll('.slide').length <= 1) {
			return false
		}

		new Flickity(slider, {
			cellAlign: 'left',
			prevNextButtons: false,
			watchCSS: true
		});
	}
});
