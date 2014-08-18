(function () {
  "use strict";

  var gulp = require("gulp");
  var bump = require("gulp-bump");
  var clean = require("gulp-clean");
  var minifyCSS = require("gulp-minify-css");
  var rename = require("gulp-rename");
  var runSequence = require("run-sequence");
  var uglify = require("gulp-uglify");

  var cssFiles = [
    "src/css/bootstrap3-wysihtml5-color.css",
    "src/css/bootstrap3-wysihtml5-line-height.css",
    "src/css/bootstrap3-wysihtml5.css"
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
      .pipe(clean());
  });

  gulp.task("css", function () {
    return gulp.src(cssFiles)
      .pipe(minifyCSS({ keepBreaks: true }))
      .pipe(rename(function(path) {
        path.basename += ".min";
      }))
      .pipe(gulp.dest("dist/css"));
  });

  gulp.task("js", function () {
    return gulp.src(jsFiles)
      .pipe(uglify())
      .pipe(rename(function(path) {
        path.basename += ".min";
      }))
      .pipe(gulp.dest("dist/js"));
  });

  gulp.task("build", function (cb) {
    runSequence(["clean"], ["css", "js"], cb);
  });

  gulp.task("default", ["build"]);
})();
