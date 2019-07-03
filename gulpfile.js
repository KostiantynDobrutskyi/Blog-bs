var gulp = require("gulp"),
    sync = require("browser-sync").create(),
    del = require("del"),
    plugins = require("gulp-load-plugins")({
        scope: ["devDependencies"]
    });

var IS_DEV = true;
gulp.task("html", function () {
    return gulp.src("src/views/*.html")
        .pipe(plugins.htmlExtend())
        .pipe(gulp.dest("dist"))
        .pipe(sync.stream())
});


gulp.task("images", function () {
    return gulp.src("src/images/**/*.*")
        .pipe(gulp.dest("dist/images"))
});



gulp.task("styles:app", function () {
    return gulp.src("src/styles/app.less")
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer())
        // .pipe(plugins.cleanCss())
        .pipe(plugins.rename({suffix: ".min"}))
        .pipe(gulp.dest("dist/css"))
        .pipe(sync.stream())
});

gulp.task("clean", function (cb) {
    del.sync("dist");
    cb();
});

gulp.task("build", ["clean"], function () {
    gulp.start(["html", "styles:app", "images"]);
});

gulp.task("watch", ["build"], function () {
    sync.init({
        server: "dist"
    });
    gulp.watch("src/styles/**/*.less", ["styles:app"]);

    gulp.watch("src/views/**/*.html", ["html"]);
    // gulp.watch("dist/*.html").on("change", sync.reload());

});

gulp.task("default", ["watch"]);