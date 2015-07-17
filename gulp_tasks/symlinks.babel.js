'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import symlink from 'gulp-sym';
import reportError from './_report-error.babel.js';

import config from './_config.babel.js';

const sourceFiles = config.files.miscellaneous;
sourceFiles.concat(config.files.packages);

gulp.task('symlinks', () => {
  return gulp.src(config.path.bowerComponents)
    .pipe(debug({
      title: 'symlinks:'
    }))
    .pipe(symlink(config.path.destination.base + config.path.bowerComponents))
    .on('error', reportError);
});
