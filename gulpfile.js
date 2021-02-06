const {src, dest, parallel, series, watch} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const fileinclude = require('gulp-file-include');
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const svgSprite = require('gulp-svg-sprite');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const ttf2woff2 = require('gulp-ttf2woff2');
const fs = require('fs');
const tiny = require('gulp-tinypng-compress');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revdel = require('gulp-rev-delete-original');

// DEV

const svgSprites = () => {
  return src('./src/img/svg/**.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg" //sprite file name
        }
      },
    }))
    .pipe(dest('./app/img'));
}

const imgToApp = () => {
	return src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg', './src/img/*.svg'])
    .pipe(dest('./app/img'))
}

const htmlInclude = () => {
  return src(['./src/*.html'])
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('./app'))
    .pipe(browserSync.stream());
}

const fonts = () => {
  return src('./src/fonts/**.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('./app/fonts/'));
}

const resources = () => {
  return src('./src/resources/**')
    .pipe(dest('./app/resources/'));
}

// const cb = () => {}

// let srcFonts = './src/scss/_fonts.scss';
// let appFonts = './app/fonts/';

// const fontsStyle = (done) => {
//   let file_content = fs.readFileSync(srcFonts);

//   fs.writeFile(srcFonts, '', cb);
//   fs.readdir(appFonts, function (err, items) {
//     if (items) {
//       let c_fontname;
//       for (var i = 0; i < items.length; i++) {
// 				let fontname = items[i].split('.');
// 				fontname = fontname[0];
//         let font = fontname.split('-')[0];
//         let weight = checkWeight(fontname);

//         if (c_fontname != fontname) {
//           fs.appendFile(srcFonts, '@include font-face("' + font + '", "' + fontname + '", ' + weight +');\r\n', cb);
//         }
//         c_fontname = fontname;
//       }
//     }
//   })

//   done();
// }

const styles = () => {
  return src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on("error", notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css/'))
    .pipe(browserSync.stream());
}

const scripts = () => {
  return src('./src/js/main.js')
    .pipe(webpackStream(
      {
        mode: 'development',
        output: {
          filename: 'main.js',
        },
        module: {
          rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }]
        },
      }
    ))
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end'); // Don't stop the rest of the task
    })

    .pipe(sourcemaps.init())
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream());
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./app"
    },
  });

  watch('./src/scss/**/*.scss', styles);
  watch('./src/js/**/*.js', scripts);
  watch('./src/html/*.html', htmlInclude);
  watch('./src/*.html', htmlInclude);
  watch('./src/img/**.jpg', imgToApp);
  watch('./src/img/**.jpeg', imgToApp);
  watch('./src/img/**.png', imgToApp);
  watch('./src/img/svg/**.svg', svgSprites);
  watch('./src/fonts/**', fonts);
  watch('./src/resources/**', resources);
}

const clean = () => {
	return del(['app/*'])
}

exports.fileinclude = htmlInclude;
exports.styles = styles;
exports.scripts = scripts;
exports.watchFiles = watchFiles;
exports.fonts = fonts;

exports.default = series(clean, parallel(htmlInclude, scripts, fonts, imgToApp, svgSprites), styles, resources, watchFiles);

// BUILD

const tinypng = () => {
  return src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg'])
    .pipe(tiny({
      key: 'pVkF9W9vJlf0TJYxZSNpmF8FbfJffL3T',
      sigFile: './app/img/.tinypng-sigs',
      parallel: true,
      parallelMax: 100,
      log: true,
    }))
    .pipe(dest('./app/img'))
}

const stylesBuild = () => {
  return src('./src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on("error", notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('./app/css/'))
}

const scriptsBuild = () => {
  return src('./src/js/main.js')
    .pipe(webpackStream(

        {
          mode: 'development',
          output: {
            filename: 'main.js',
          },
          module: {
            rules: [{
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }]
          },
        }))
      .on('error', function (err) {
        console.error('WEBPACK ERROR', err);
        this.emit('end'); // Don't stop the rest of the task
      })
    .pipe(uglify().on("error", notify.onError()))
    .pipe(dest('./app/js'))
}

exports.build = series(clean, parallel(htmlInclude, scriptsBuild, fonts, imgToApp, svgSprites), stylesBuild, resources, tinypng);

