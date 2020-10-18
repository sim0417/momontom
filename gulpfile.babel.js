import gulp from "gulp";
import htmlmin from "gulp-htmlmin";
import gulpImage from "gulp-image";
import autoPrefixer from "gulp-autoprefixer";
import miniCss from "gulp-csso";
import concatCss from "gulp-concat-css";
import gulpBro from "gulp-bro";
import babelify from "babelify";

import ghPages from "gulp-gh-pages";
import del from "del";
import ws from "gulp-webserver";

const routes = {
  img: {
    src: "src/images/*",
    dest: "build/images",
  },
  html: {
    watch: "src/*.html",
    src: "src/*.html",
    dest: "build",
  },
  css: {
    watch: "src/css/*.css",
    src: "src/css/style.css",
    dest: "build/css",
  },
  js: {
    watch: "src/js/*.js",
    src: "src/js/main.js",
    dest: "build/js",
  },
};

const html = () => gulp.src(routes.html.src).pipe(htmlmin()).pipe(gulp.dest(routes.html.dest));

const img = () => gulp.src(routes.img.src).pipe(gulpImage()).pipe(gulp.dest(routes.img.dest));

const styles = () =>
  gulp
    .src(routes.css.src)
    .pipe(
      autoPrefixer({
        cascade: false,
      }),
    )
    .pipe(concatCss("style.css"))
    .pipe(miniCss())
    .pipe(gulp.dest(routes.css.dest));

const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      gulpBro({
        transform: [
          babelify.configure({
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          }),
          [
            "uglifyify",
            {
              global: true,
            },
          ],
        ],
      }),
    )
    .pipe(gulp.dest(routes.js.dest));

const ghDeploy = () => gulp.src("build/**/*").pipe(ghPages());

const clean = () => del(["build", ".publish"]);

const webserver = () =>
  gulp.src("build").pipe(
    ws({
      livereload: true,
      open: true,
    }),
  );

const watch = () => {
  gulp.watch(routes.img.src, img);
  gulp.watch(routes.html.src, html);
  gulp.watch(routes.css.watch, styles);
  gulp.watch(routes.js.watch, js);
};

const prepare = gulp.series([clean, img]);
const assets = gulp.series([html, styles, js]);
const live = gulp.parallel([webserver, watch]);

export const build = gulp.series([prepare, assets]);

export const dev = gulp.series([build, live]);

export const deploy = gulp.series([build, ghDeploy, clean]);
