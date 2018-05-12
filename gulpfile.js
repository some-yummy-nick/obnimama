const gulp = require("gulp"),
	browserSync = require("browser-sync").create(),
	reload = browserSync.reload;
	del = require('del');

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
		src: 'styles/style.scss',
		all: 'styles/*.scss',
		build: 'css'
	},
	html: {
		src: '*.html'
	},
	js: {
		src: 'js/**/*.js'
	},
	images: {
		src: 'images/*.+(jpg|JPG|png|svg)',
		build: 'images'
	}
};

function styles() {
	return gulp.src(paths.styles.src)
		.pipe($.plumber({errorHandler: onError}))
		.pipe($.sassGlob({
			ignorePaths: [
				'styles/utils/**',
				'styles/base/**',
			]
		}))
		.pipe($.sass())
		.pipe($.postcss([
				require("postcss-assets")({
					loadPaths: ["images/"]
				}),
				require("autoprefixer"),
				require("postcss-easysprites")({
					imagePath: "images/sprite",
					spritePath: "images"
				}),
				require('postcss-css-variables'),
				require('postcss-rgb-plz'),

				require("css-mqpacker")({
					sort: true
				})
			])
		)
		.pipe($.csscomb())
		.pipe($.stylefmt())
		.pipe(gulp.dest(paths.styles.build))
		.pipe(browserSync.stream());
}

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

gulp.task('server', function () {
	browserSync.init({
		notify: false,
		open: false,
		server: {
			baseDir: "./"
		}
	});
});


gulp.watch("*.html").on("change", reload);
gulp.watch("js/**/*.js").on("change", reload);
gulp.watch(paths.styles.all).on("change", styles);

gulp.task('default', gulp.series(gulp.parallel('server', images, styles)));
