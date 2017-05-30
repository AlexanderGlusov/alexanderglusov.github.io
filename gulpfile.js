'use strict';

var gulp = require( 'gulp'),
    sass = require('gulp-sass'),
    neat = require('node-neat').includePaths,
    normalize = require('node-normalize-scss').includePaths,
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglifyjs'),
    concat = require('gulp-concat'),
    rigger = require('gulp-rigger'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf');

var path = {
        build: { //Тут мы укажем куда складывать готовые после сборки файлы
            html: 'build/',
            js: 'build/js/',
            css: 'build/css/',
            img: 'build/img/',
            fonts: 'build/fonts/'
        },
        vendor: {
            js: [
                './node_modules/jquery/dist/jquery.min.js',
                './node_modules/owl.carousel/dist/owl.carousel.min.js',
                // './node_modules/swiper/dist/js/swiper.jquery.min.js',
                './node_modules/jquery-collapse/src/jquery.collapse.js'
                // './node_modules/toastr/build/toastr.min.js',
                // './node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
                // './node_modules/tooltipster/dist/js/tooltipster.bundle.min.js'
            ],
            css: [
                './node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
                // './node_modules/owl.carousel/dist/assets/owl.theme.default.min.css'
                /*'./node_modules/swiper/dist/css/swiper.min.css',
                './node_modules/toastr/build/toastr.min.css',
                './node_modules/tooltipster/dist/css/tooltipster.bundle.min.css',
                './node_modules/tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-borderless.min.css'*/
            ]
        },
        src: { //Пути откуда брать исходники
            html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
            js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
            style: 'src/sass/main.scss',
            img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
            fonts: 'src/fonts/**/*.*'
        },
        watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
            html: 'src/**/*.html',
            js: 'src/js/**/*.js',
            style: 'src/sass/**/*.scss',
            img: 'src/img/**/*.*',
            fonts: 'src/fonts/**/*.*'
        },
        clear: './build'
};
//Настройки dev-сервера
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

gulp.task('vendor', function() {
    gulp.src(path.vendor.css)
        .pipe(concat('vendor.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.build.css));

    gulp.src(path.vendor.js)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('style:buildalt', function () {                   //какая-то хуита
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(autoprefixer()) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});


gulp.task('style:build', function () {
    return gulp.src(path.src.style)
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['styles'].concat(neat, normalize)
        }))
        .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});


gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('server', function() {
    browserSync(config);
});

gulp.task('clear', function(cb) {
    rimraf(path.clear, cb);
});

gulp.task('default', ['vendor', 'build', 'server', 'watch']);