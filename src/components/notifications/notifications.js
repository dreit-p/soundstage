class Notification {
	constructor (opt = {}) {
		this.title = opt.title || 'Notification title';
		this.message = opt.message || 'Message text';
		this.type = opt.type || 'default';
		this.icon = opt.icon || 'notice';
		this.removalDelay = opt.removalDelay || 5000;
		this.maxQnt = 4;

		if (!document.querySelector('.notifications-container')) {
			this.container = this.stringToHTML('<div class="notifications-container"></div>').children[0];
			document.getElementsByTagName('body')[0].appendChild(this.container);
		}
		this.container = document.querySelector('.notifications-container');

		this.removeExcess();

		this.insertTile(this.createTile());
	}

	removeExcess() {
		if (this.container.children.length >= this.maxQnt) {
			for (var i = 0; i + this.maxQnt - 1 < this.container.children.length; i++) {
				this.removeTile(this.container.children[i]);
			}
		}
	}

	stringToHTML(string) {
		var htmlContainer = document.createElement('htmlContainer');
		htmlContainer.innerHTML = string;
		return htmlContainer;
	}


	setAutoRemoval(tile) {
		setTimeout(()=>{
			this.removeTile(tile);
		}, this.removalDelay);
	}

	removeTile(tile, duration =400) {
		function fadeOut(el, duration =400, cb) {
			el.style.opacity = el.style.opacity || 1;

			var last = +new Date();
			var tick = function() {
				el.style.opacity = +el.style.opacity - (new Date() - last) / duration;
				last = +new Date();

				if (+el.style.opacity > 0) {
					(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
				} else {
					cb(el);
				}
			};

			tick();
		}
		fadeOut(tile, duration, (tile)=>{
			tile.remove();
		});
	}

	getTileTpl() {
		let tileTpl = this.stringToHTML('<div class="tile default"><div class="text-part"><div class="title-line"><span class="title-text"></span><div class="close-btn"><svg><use href="#cross"></use></svg></div></div><div class="message"></div></div></div>').children[0];
		tileTpl.querySelector('.close-btn').style.animationDuration = this.removalDelay + 'ms';
		tileTpl.querySelector('.close-btn').classList.add('animate');

		tileTpl.prepend(this.stringToHTML(`<div class="form-state-icon ${this.icon}"><svg><use href="#${this.icon}"></use></svg></div>`).children[0]);

		tileTpl.addEventListener('click', (e)=>{
			this.removeTile(e.currentTarget, 200);
		}, false);
		return tileTpl;
	}

	createTile() {
		let tileTpl = this.getTileTpl();

		tileTpl.classList.add(this.type);
		tileTpl.querySelector('.title-text').innerHTML = this.title;
		tileTpl.querySelector('.message').innerHTML = this.message;

		return tileTpl;
	}

	insertTile(tile) {
		this.container.appendChild(tile);
		this.setAutoRemoval(tile);
	}
}

window.Notify = Notification
