// default
// build
// critical


const envVars = {
	development: {
		API_HOST: '',
	},
	production: {
		API_HOST: '',
	}
}


const { src, dest, parallel, series, watch } = require('gulp');
var sourcemaps = require('gulp-sourcemaps'),
	svgSprite = require('gulp-svg-sprite'),
	postHTML = require('gulp-posthtml'),
	// imagemin = require('gulp-imagemin'), // сжимает изображения
	// pngquant = require('imagemin-pngquant'), // плагин к верхнему
	critical = require('critical').stream,
	webpack = require('webpack-stream'),
	postcss = require('gulp-postcss'),
	connect = require('gulp-connect'), // отображение в локалхост
	plumber = require('gulp-plumber'), // debugger
	rename = require('gulp-rename'),
	gulpif = require('gulp-if'),
	notify = require('gulp-notify'),
	clean = require('gulp-clean'); // удаляет папочки :)
	// webp = require('gulp-webp'); // webp converter


const postHtmlPlugins = [
	// require('posthtml-webp')({replaceExtension: true}),
	require('posthtml-beautify')({rules: {
		indent: 2,
		blankLines: false,
	}}),
];

const postHtmlOptions = { parser: require('posthtml-pug')({ locals: {}, basedir: './src/' }) };

var autoprefixer = require('autoprefixer'),
	postCssImport = require('postcss-import'), // import компонентов
	modernCSS = require('postcss-preset-env'), // lets you convert modern CSS
	comments = require('postcss-strip-inline-comments'),
	flexbugs = require('postcss-flexbugs-fixes'),
	reporter = require('postcss-reporter'), // errors log
	cssnano = require('cssnano'), // сжимает css
	nested = require('postcss-nested'), // вложенность
	objfit = require('postcss-object-fit-images'),
	mixins = require('postcss-mixins'), // миксины
	color = require('postcss-color-function'), // scss цветовые функции
	scss = require('postcss-scss'),
	short = require('postcss-short'); // позволяет писать сокращенно

var path = {
	dist: { //Тут мы укажем куда складывать готовые после сборки файлы
		html: 'dist/',
		js: 'dist/js/',
		css: 'dist/css/',
		img: 'dist/assets/images/',
		svg: 'dist/assets/svg/',
		svgSprite: 'src/assets/',
		fonts: 'dist/fonts/'
	},
	src: { //Пути откуда брать исходники
		html: 'src/pages/*.pug', //Синтаксис src/*.ext говорит gulp что мы хотим взять все файлы с расширением .ext
		js: 'src/main.js', //В стилях и скриптах нам понадобятся только main файлы
		css: 'src/main.scss',
		img: 'src/assets/images/**/*.{gif,jpeg,jpg,png,svg,webp}', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
		svg: 'src/assets/svg/**/*.svg',
		fonts: 'src/assets/fonts/**/*.*'
	},
	watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
		html: 'src/**/*.pug',
		js: 'src/**/*.js',
		css: 'src/**/*.{css,scss}',
		img: 'src/assets/images/**/*.*',
		svg: 'src/assets/svg/**/*.*',
		fonts: 'src/assets/fonts/**/*.*'
	},
	clean: 'dist'
};

var processors = [
	postCssImport({
		root: "src/css",
		path: ["../css", "../css/components", "../css/data"]
	}),
	comments(),
	autoprefixer(),
	modernCSS({
		importFrom: ['./src/vars.css'],
		preserve: false
	}),
	short(),
	mixins(),
	nested(),
	color(),
	flexbugs,
	objfit(),
	cssnano({
		reduceIdents: false
	}),
	reporter()
];

var notifyTemplate = notify.onError({
	title: '<%= error.plugin %>',
	// message: '<%= error.fileName %>'
})

function css() {
	return src(path.src.css)
		.pipe(plumber({
			errorHandler: notifyTemplate
		}))
		.pipe( gulpif(process.env.NODE_ENV == 'development', sourcemaps.init() ) )
		// .pipe(notify("» css <%= file.relative %>"))
		.pipe(sourcemaps.init())
		.pipe(postcss(processors, {syntax: scss}))
		.pipe(rename({ extname: ".css" }))
		// .pipe(sourcemaps.write('.', { sourceRoot: '/src' }))
		.pipe( gulpif(process.env.NODE_ENV == 'development', sourcemaps.write() ) )
		.pipe(dest(path.dist.css))
		.pipe(connect.reload());
}

function html() {
	let stream = src(path.src.html) //Выберем файлы по нужному пути

	stream
		.pipe(plumber({
			errorHandler: notifyTemplate
		}))

	stream
		.pipe(postHTML(postHtmlPlugins, postHtmlOptions))
		.pipe(rename({ extname: ".html" }))
		.pipe(dest(path.dist.html)) //Выплюнем их в папку dist
		.pipe(connect.reload());


	return stream;
}

function js() {
	console.log(process.env.NODE_ENV);
	return src(path.src.js) // Найдем наш main файл
		.pipe(plumber({
			errorHandler: notifyTemplate
		}))
		.pipe( gulpif(process.env.NODE_ENV == 'development', sourcemaps.init() ) ) // Инициализируем sourcemap
		.pipe(webpack(require('./webpack.config.js')))
		// .pipe(rename({ extname: ".js" }))
		.pipe( gulpif(process.env.NODE_ENV == 'development', sourcemaps.write() ) ) // Пропишем карты
		.pipe(dest(path.dist.js)) // Выплюнем готовый файл в dist
		.pipe(connect.reload());
}

function img() {
	return src(path.src.img)
		.pipe(plumber())
		.pipe(dest(path.dist.img)) // Save original
		// .pipe(webp())
		.pipe(dest(path.dist.img)); // Save generated webp
}

// function imgMinified() {
// 	return src(path.src.img)
// 		.pipe(plumber())
// 		.pipe(imagemin({
// 			progressive: true,
// 			use: [pngquant()],
// 			interlaced: true
// 		}))
// 		.pipe(dest(path.dist.img)) // Save minified original
// 		// .pipe(webp())
// 		.pipe(dest(path.dist.img)); // Save generated webp
// };

function fonts() {
	return src(path.src.fonts)
		.pipe(plumber())
		.pipe(dest(path.dist.fonts));
}

function svg() {
	return src(path.src.svg)
		.pipe(plumber())
		.pipe(dest(path.dist.svg))
		.pipe(svgSprite({
			mode: {
				symbol: true
			}
		}))
		.pipe(dest(path.dist.svgSprite));
}

function cleanDist() {
	console.log('cleanDist: ');
	return src(path.clean, { read: false, allowEmpty: true })
		.pipe(plumber())
		.pipe(clean())
		// .pipe(notify("» clean dist "));
}

function copyStaticFiles() {
	return src(['public/**/*'])
		.pipe(plumber())
		.pipe(dest('dist/'));
}

function generateCritical() {
	return src('dist/*.html')
		.pipe(plumber())
		// .pipe(notify("critical! <%= file.relative %>"))
		.pipe(critical({ base: 'dist/', width: 1300, height: 900, inline: false, minify: true }))
		.pipe(rename({ extname: ".css" }))
		.pipe(dest('critical/'));
}

function watchAll() {
	watch([path.watch.html], series(html, function watcher(cb) {
		cb()
		console.log("changed html");
	}));
	watch([path.watch.css], series(css, function watcher(cb) {
		cb()
		console.log("changed css");
	}));
	watch([path.watch.js], series(js, function watcher(cb) {
		cb()
		console.log("changed js");
	}));
	watch([path.watch.img], series(img, function watcher(cb) {
		cb()
		console.log("changed img");
	}));
	watch([path.watch.svg], series(svg, html, function watcher(cb) {
		cb()
		console.log("changed svg");
	}));
	watch([path.watch.fonts], series(fonts, function watcher(cb) {
		cb()
		console.log("changed fonts");
	}));
}

var net = require('net');
function getNetworkIP(callback) {
	var socket = net.createConnection(80, 'www.google.com');
	socket.on('connect', function() {
		callback(undefined, socket.address().address);
		socket.end();
	});
	socket.on('error', function(e) {
		callback(e, 'error');
	});
}

function server() {
	getNetworkIP(function (error, ip) {
		if (error) {
			console.log('error:', error);
			ip = '127.0.0.1';
			console.log('Used Local IP:');
		} else {
			console.log('Used External IP:');
		}
		console.log(ip);
		connect.server({
			port: 4444,
			host: ip,
			root: './dist',
			https: false,
			livereload: true
		});
	});
}


function production(bool) {
	return (cb)=>{
		process.env.NODE_ENV = bool ? 'production' : 'development';
		process.env = Object.assign(process.env, envVars[process.env.NODE_ENV]);
		cb();
	}
}

exports.default = (function defaultTask() {
	return series(production(false), cleanDist, svg, parallel(img, js, fonts, html, css, copyStaticFiles), parallel(watchAll, server));
})();

exports.build = (function() {
	return series(production(true), cleanDist, svg, parallel(img, js, fonts, copyStaticFiles, css, html));
})()

exports.critical = series(parallel(html, css), generateCritical);
