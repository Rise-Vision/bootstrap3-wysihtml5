(function () {
  "use strict";

  var bump = require("gulp-bump");
  var factory = require("widget-tester").gulpTaskFactory;
  var fs = require("fs");
  var gulp = require("gulp");
  var minifyCSS = require("gulp-minify-css");
  var path = require("path");
  var rename = require("gulp-rename");
  var rimraf = require("gulp-rimraf");
  var runSequence = require("gulp-run-sequence");
  var sourcemaps = require("gulp-sourcemaps");
  var uglify = require("gulp-uglify");

  var cssFiles = [
    "src/css/bootstrap3-wysihtml5-color.css",
    "src/css/bootstrap3-wysihtml5-line-height.css",
    "src/css/bootstrap3-wysihtml5.css"
  ];
  var angularFiles = [
    "src/js/angular/dtv-bootstrap3-wysihtml5.js"
  ];
  var jsFiles = [
    "src/js/bootstrap3-wysihtml5.js"
  ];

  gulp.task("bump", function(){
    return gulp.src(["./package.json", "./bower.json"])
      .pipe(bump({type:"patch"}))
      .pipe(gulp.dest("./"));
  });

  gulp.task("clean", function () {
    return gulp.src("dist", { read: false })
      .pipe(rimraf());
  });

  gulp.task("css", function () {
    return gulp.src(cssFiles)
      .pipe(sourcemaps.init())
        .pipe(minifyCSS())
        .pipe(rename(function(path) {
          path.basename += ".min";
        }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("dist/css"));
  });

  gulp.task("angular", function () {
    return gulp.src(angularFiles)
      .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename(function(path) {
          path.basename += ".min";
        }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("dist/js/angular"));
  });

  gulp.task("js", function () {
    return gulp.src(jsFiles)
      .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename(function(path) {
          path.basename += ".min";
        }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("dist/js"));
  });

  gulp.task("build", function (cb) {
    runSequence(["clean"], ["css", "js", "angular"], cb);
  });

  gulp.task("webdriver_update", factory.webdriveUpdate());

  gulp.task("e2e:server", factory.testServer());
  gulp.task("e2e:server-close", factory.testServerClose());

  gulp.task("e2e:test-ng", ["webdriver_update"], factory.testE2EAngular({
    src: ["test/e2e/angular/*test-ng.js"]
  }));

  gulp.task("test", function(cb) {
    runSequence("build", "e2e:server", "e2e:test-ng", "e2e:server-close", cb);
  });

  gulp.task("default", ["build"]);
})();
