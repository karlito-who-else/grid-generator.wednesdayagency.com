'use strict';

import gulp from 'gulp';

import {config, browserSync} from './_config.babel.js';

gulp.task('watch', [
  'browser-sync'
], () => {
  gulp.watch(config.path.source.base + config.files.markup, ['markup'], browserSync.reload);
  gulp.watch(config.path.source.base + config.files.scripts, ['scripts'], browserSync.reload);
  gulp.watch(config.path.source.base + config.files.styles, ['styles']);
});
