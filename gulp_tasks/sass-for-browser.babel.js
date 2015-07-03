'use strict';

import concat from 'gulp-concat';
import debug from 'gulp-debug';
import gulp from 'gulp';
import order from 'gulp-order';
import util from 'gulp-util';

import config from './_config.babel.js';

// const sourceFiles = config.files.sass.library.bootstrap;
// sourceFiles.unshift(config.files.sass.custom);

const sourceFiles = config.files.sass;

console.log('sourceFiles', Array.isArray(sourceFiles));

gulp.task('sass-for-browser', () => {
  return gulp.src(sourceFiles)
    .pipe(debug({
      title: 'sass-for-browser:'
    }))
    .pipe(gulp.src(sourceFiles))
    .pipe(order(sourceFiles))
    .pipe(concat('sass-for-browser.scss'))
    .pipe(gulp.dest(config.path.destination.sass))
    .on('error', util.log);
});

gulp.task('sass-for-browser:watch', function() {
  gulp.watch(sourceFiles, ['sass-for-browser']);
});
