import { createPopper } from '@popperjs/core';
import maxSize from 'popper-max-size-modifier';

(() => {

	/*=======================================
	=            Set List popper            =
	=======================================*/

	function bindSetListPopper(activator) {
		if (activator) {

			const applyMaxSize = {
				name: 'applyMaxSize',
				enabled: true,
				phase: 'beforeWrite',
				requires: ['maxSize'],
				fn({ state }) {
					// The `maxSize` modifier provides this data
					const { width, height } = state.modifiersData.maxSize;

					state.styles.popper = {
						...state.styles.popper,
						maxWidth: `${width}px`,
					};
				}
			};

			let setlistOptions = {
				placement: 'top-start',
				modifiers: [{
						name: 'flip',
						options: {
							fallbackPlacements: ['bottom', 'left-end'],
							boundary: parent,
							flipVariations: true,
						},
					},
					{
						name: 'offset',
						options: {
							offset: [0, 9],
						},
					},
					{
						name: 'preventOverflow',
						options: {
							mainAxis: true,
							altBoundary: true
						},
					},
					{
						...maxSize,
						options: {
							boundary: activator,
						},
					},
					applyMaxSize
				],
			};

			function resizeHandler() {
				window.throttling(() => {
					if (activator.offsetParent === null) {
						hidePopper();
						return false;
					}
				});
			}
			let popperWrapper = document.getElementById(activator.dataset.popperId);
			let parent = activator.closest('section');
			let listPopper = null;

			function showPopper() {
				popperWrapper.classList.add('visible');
				listPopper = createPopper(parent, popperWrapper, setlistOptions);
				window.addEventListener('resize', resizeHandler, false);
				popperWrapper.querySelector('.close-btn').addEventListener('click', hidePopper, false);
				window.setOutsideClickListener([popperWrapper, activator], hidePopper);
				listPopper.forceUpdate();
			}

			function hidePopper() {
				if (!listPopper) return false;
				listPopper.destroy();
				listPopper = null;
				popperWrapper.classList.remove('visible');
				window.removeEventListener('resize', resizeHandler, false);
			}

			activator.addEventListener('click', (e)=>{
				e.preventDefault();
				if (!listPopper) {
					showPopper();
				} else {
					hidePopper();
				}
			}, false);
		}
	}

	[].forEach.call(document.querySelectorAll("[data-popper-id='popper-set_list']"), bindSetListPopper);

	/*=====  End of Set List popper  ======*/

})()
