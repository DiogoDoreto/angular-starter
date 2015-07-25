var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('css', function () {
    var stylus = require('gulp-stylus');
    return gulp.src(['src/**/*.{css,styl}','!src/jspm_packages/**/*'])
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('template', function () {
    var jade = require('gulp-jade');
    return gulp.src('src/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('dist'));
});

gulp.task('template-watch', ['template'], browserSync.reload);

gulp.task('script', function () {
    var jspm = require('jspm');
    jspm.setPackagePath('.');
    return jspm.bundleSFX('app/main', 'dist/app.js', {});
});

gulp.task('script-watch', ['script'], browserSync.reload);

gulp.task('build', ['css', 'template', 'script']);

gulp.task('serve', ['build'], function () {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });

    gulp.watch('src/**/*.{css, styl}', ['css']);
    gulp.watch('src/**/*.jade', ['template-watch']);
    gulp.watch('src/**/*.{js, ts}', ['script-watch']);
});

gulp.task('default', ['serve']);
