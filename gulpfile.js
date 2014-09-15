(function () {
  "use strict";

  var gulp = require("gulp");
  var bump = require("gulp-bump");
  var clean = require("gulp-clean");
  var fs = require("fs");
  var minifyCSS = require("gulp-minify-css");
  var path = require("path");
  var rename = require("gulp-rename");
  var runSequence = require("gulp-run-sequence");
  var uglify = require("gulp-uglify");
  var factory = require("widget-tester").gulpTaskFactory;

  var cssFiles = [
    "src/css/bootstrap3-wysihtml5-color.css",
    "src/css/bootstrap3-wysihtml5-line-height.css",
    "src/css/bootstrap3-wysihtml5.css"
  ];
  var jsFiles = [
    "src/js/bootstrap3-wysihtml5.js"
  ];
  var angularFiles = [
    "src/js/angular/dtv-bootstrap3-wysihtml5.js"
  ];

  var views = fs.readdirSync("src/js/angular")
    .filter(function(file) {
      return fs.statSync(path.join("src/js/angular", file)).isDirectory();
    });

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

  gulp.task("angular", function () {
    return gulp.src(angularFiles)
      .pipe(uglify())
      .pipe(rename(function(path) {
        path.basename += ".min";
      }))
      .pipe(gulp.dest("dist/js/angular"));
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
