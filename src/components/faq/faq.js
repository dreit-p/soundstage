(()=>{

	let list = document.querySelector('section.faq');
	if (!list) return false;
	list.querySelectorAll('.tile').forEach(function(tile) {
		tile.addEventListener('click', function () {
			let hideElem = tile => {
				tile.classList.remove('active');
				tile.addEventListener('transitionend', function () {
					tile.classList.remove('visible');
				}, {once: true});
			}
			let showTile = tile => {
				tile.classList.add('visible');
				setTimeout(()=>{
					tile.classList.add('active');
				}, 20);
			}

			if (tile.classList.contains('active')) {
				hideElem(tile);
			} else {
				list.querySelectorAll('.tile.active').forEach(function(activeElem) {
					activeElem.classList.remove('active');
					activeElem.classList.remove('visible');
				});
				showTile(tile);
			}
		}, false);
	});
})()
