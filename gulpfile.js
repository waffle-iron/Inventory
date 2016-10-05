'use strict';

var gulp = require('gulp');
var electron = require('electron-connect').server.create();

gulp.task('serve', function () {

  // Start browser process
  electron.start();

  // Restart browser process
/*  gulp.watch('app.js', electron.restart);

  // Reload renderer process
  gulp.watch(['index.js', 'index.html'], electron.reload);

  //Watch js files and restart Electron if they change
  gulp.watch(['./app/js/*.js'], electron.restart);
  //watch css files, but only reload (no restart necessary)
  gulp.watch(['./app/css/*.css'], electron.reload);*/
});
