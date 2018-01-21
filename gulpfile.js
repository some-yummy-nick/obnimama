const gulp = require("gulp"),
	browserSync = require("browser-sync").create();

const $ = require("gulp-load-plugins")({
	pattern: ["*"],
	scope: ["devDependencies"]
});

const onError = (err) => {
	console.log(err);
};

var NODE_ENV = process.env.NODE_ENV || 'development';

var paths = {
	styles: {
		src: 'source/scss/my/style.scss',
		all: 'source/scss/my/*.scss',
		my: 'source/scss/my/*.scss',
		csscomb: 'source/scss',
		build: 'build/css'
	},
	html: {
		src: 'source/*.html',
		build: 'build'
	},
	js: {
		src: 'source/js/*.js',
		build: 'build/js'
	},
	fonts: {
		src: 'source/fonts/**/*.*',
		build: 'build/css/fonts'
	},
	images: {
		src: 'source/images/*.+(jpg|JPG|png|svg)',
		build: 'build/images'
	}
};

function styles() {
	return gulp.src(paths.styles.src)
		.pipe($.plumber({errorHandler: onError}))
		.pipe($.sass())
		.pipe($.postcss([
				require("postcss-assets")({
					loadPaths: ["images/"]
				}),
				require("postcss-font-magician")({
					variants: {
						"Roboto": {
							"400": ['woff2, woff, ttf'] //поддержка кирилицы
						}
					}
				}),
				require("autoprefixer"),
				require("postcss-easysprites")({
					imagePath: "source/images/sprite",
					spritePath: "source/images"
				}),
				require('postcss-css-variables'),
				require('postcss-rgb-plz'),

				require("css-mqpacker")({
					sort: true
				})
			])
		)
		.pipe($.csscomb())
		.pipe(gulp.dest(paths.styles.build))
		.pipe(browserSync.stream());
}

gulp.task('scsscomb', function () {
	return gulp.src(paths.styles.my)
		.pipe($.plumber({errorHandler: onError}))
		.pipe($.csscomb())
		.pipe(gulp.dest(paths.styles.csscomb))
});

gulp.task('copyScss',gulp.series('scsscomb'), function () {
	return gulp.src("source/scss/*.scss")
		.pipe(gulp.dest("source/scss/my"))
});

function images() {
	return gulp.src(paths.images.src)
		.pipe($.cache($.imagemin({
			svgo: {
				removeViewBox: true
			},
			optipng: {
				optimizationLevel: 5
			},
			jpegtran: {
				progressive: true,
			},
			imageminJpegRecompress: ({
				loops: 5,
				min: 65,
				max: 70,
				quality: 'medium'
			}),
			pngquant: [{
				quality: '65-70', speed: 5
			}],
			verbose: true
		})))
		.pipe(gulp.dest(paths.images.build));
}

function webp() {
	return gulp.src(paths.images.src)
		.pipe($.webp({
			quality: 80,
			preset: "photo",
			method: 6
		}))
		.pipe(gulp.dest(paths.images.build))
}

function html() {
	return gulp.src(paths.html.src)
		.pipe($.jsbeautifier({
			"indent-with-tabs": true
		}))
		.pipe(gulp.dest(paths.html.build))
		.pipe(browserSync.stream());
}

function js() {
	return gulp.src(paths.js.src)
		.pipe(gulp.dest(paths.js.build))
		.pipe(browserSync.stream());
}

function fonts() {
	return gulp.src(paths.fonts.src)
		.pipe(gulp.dest(paths.fonts.build))
}

gulp.task('server', function () {
	browserSync.init({
		notify: false,
		open: false,
		server: {
			baseDir: "./build"
		}
	});
});

function watch() {
	gulp.watch(paths.styles.all, styles);
	gulp.watch(paths.images.src, images);
	gulp.watch(paths.html.src, html);
	gulp.watch(paths.js.src, js);
}

gulp.task('default', gulp.series(gulp.parallel('server', images, styles, html, js, watch, fonts)));
