var del          = require('del');
var run          = require('run-sequence');

var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var csslint      = require('gulp-csslint');
var autoprefixer = require('gulp-autoprefixer');
var base64       = require('gulp-base64');
var cleanCSS     = require('gulp-clean-css');
var size         = require('gulp-size');
var change       = require('gulp-change');
var svgstore     = require('gulp-svgstore');
var svgmin       = require('gulp-svgmin');



var globalSymbols = '';
var desktopSymbols = '';
var mobileSymbols = '';

function saveGlobalSymbols(content) {
    globalSymbols = content.replace('<svg', '<svg style="display: none;"');
}

function saveDesktopSymbols(content) {
    desktopSymbols = content.replace('<svg', '<svg style="display: none;"');
}

function saveMobileSymbols(content) {
    mobileSymbols = content.replace('<svg', '<svg style="display: none;"');
}



function injectGlobalSymbols(content) {
    var source = content.split('\n');
    var result = '';

    source.forEach(function (line) {

        if( line.indexOf('<body') !== -1 ) {
            result += line + '\n' + '        ' + globalSymbols + '\n';
        }
        else {
            result += line + '\n';
        }

    });

    return result;
}

function injectDesktopSymbols(content) {
    var source = content.split('\n');
    var result = '';

    source.forEach(function (line) {

        if( line.indexOf('<body') !== -1 ) {
            result += line + '\n' + '        ' + desktopSymbols + '\n';
        }
        else {
            result += line + '\n';
        }

    });

    return result;
}

function injectMobileSymbols(content) {
    var source = content.split('\n');
    var result = '';

    source.forEach(function (line) {

        if( line.indexOf('<body') !== -1 ) {
            result += line + '\n' + '        ' + mobileSymbols + '\n';
        }
        else {
            result += line + '\n';
        }

    });

    return result;
}

function symbolsImgToSpriteSvg(content) {

  var source = content.split('\n');
  var outputLine = [];
  var result = '';

  var i;
  var indentString;
  var classString;
  var idString;
  var widthString;
  var heightString;
  var titleString;
  var srcString;
  var nameString;

  source.forEach(function (line) {

    if( line.indexOf('symbols/') !== -1 ) {

      /* get indent */

      for (indentString = '', i = 0; i < line.indexOf('<img'); i++ ) {
        indentString += ' ';
      }


      /* get attributes */

      classString  = line.match( 'class[ \t]*=[ \t]*"[^"]+"');
      idString     = line.match(    'id[ \t]*=[ \t]*"[^"]+"');
      widthString  = line.match( 'width[ \t]*=[ \t]*"[^"]+"');
      heightString = line.match('height[ \t]*=[ \t]*"[^"]+"');
      titleString  = line.match( 'title[ \t]*=[ \t]*"[^"]+"');

      classString  = classString  ? classString[0]  : null;
      idString     = idString     ? idString[0]     : null;
      widthString  = widthString  ? widthString[0]  : null;
      heightString = heightString ? heightString[0] : null;
      titleString  = titleString  ? titleString[0]  : null;


      /* get path and name */

      srcString = line.match('src[ \t]*=[ \t]*"[^"]+"');
      srcString = srcString[0];
      srcString = srcString.replace('src="', '');
      srcString = srcString.replace('"', '');

      nameString = srcString.replace(/^.*[\\\/]/, '');
      nameString = nameString.replace('.svg', '');


      /* write down results */

      outputLine[0] = indentString + '<svg' + ( classString ? ' ' + classString : '') + ( idString ? ' ' + idString : '') + ( widthString ? ' ' + widthString : '') + ( heightString ? ' ' + heightString : '') + '>';
      outputLine[1] = indentString + '    ' +  '<use xlink:href="#' + nameString + '"></use>';
      outputLine[2] = indentString + '</svg>';

      result += outputLine[0] + '\n' + outputLine[1] + '\n' + outputLine[2] + '\n';
    }
    else {
      result += line + '\n';
    }

  });

  return result;
}


// Clean up public folder

gulp.task('clean', function() {
  return del('public/*');
});


// Index: copy

gulp.task('index', function() {
  gulp.src('resources/index.html')
      .pipe(plumber())
      .pipe(gulp.dest('public/'))
  ;
});


// Temp: copy

gulp.task('temp', function() {
  gulp.src('resources/global/temp/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('public/global/temp/'))
  ;
  gulp.src([
    'resources/global/temp/**/*',
    'resources/desktop/temp/**/*'
  ])
      .pipe(plumber())
      .pipe(gulp.dest('public/desktop/temp/'))
  ;
  gulp.src([
    'resources/global/temp/**/*',
    'resources/mobile/temp/**/*'
  ])
      .pipe(plumber())
      .pipe(gulp.dest('public/mobile/temp/'))
  ;
});


// Content: copy

gulp.task('content', function() {
  gulp.src('resources/global/content/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('public/global/content/'))
  ;
  gulp.src([
    'resources/global/content/**/*',
    'resources/desktop/content/**/*'
  ])
      .pipe(plumber())
      .pipe(gulp.dest('public/desktop/content/'))
  ;
  gulp.src([
    'resources/global/content/**/*',
    'resources/mobile/content/**/*'
  ])
      .pipe(plumber())
      .pipe(gulp.dest('public/mobile/content/'))
  ;
});


// Images: copy

gulp.task('images', function() {
  gulp.src('resources/global/images/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('public/global/images/'))
  ;
  gulp.src([
    'resources/global/images/**/*',
    'resources/desktop/images/**/*'
  ])
      .pipe(plumber())
      .pipe(gulp.dest('public/desktop/images/'))
  ;
  gulp.src([
    'resources/global/images/**/*',
    'resources/mobile/images/**/*'
  ])
      .pipe(plumber())
      .pipe(gulp.dest('public/mobile/images/'))
  ;
});



// Fonts: copy

// gulp.task('fonts', function() {
//   gulp.src('resources/global/fonts/**/*')
//       .pipe(plumber())
//       .pipe(gulp.dest('public/global/fonts/'))
//   ;
//   gulp.src([
//     'resources/global/fonts/**/*',
//     'resources/desktop/fonts/**/*'
//   ])
//       .pipe(plumber())
//       .pipe(gulp.dest('public/desktop/fonts/'))
//   ;
//   gulp.src([
//     'resources/global/fonts/**/*',
//     'resources/mobile/fonts/**/*'
//   ])
//       .pipe(plumber())
//       .pipe(gulp.dest('public/mobile/fonts/'))
//   ;
// });


// Markups: copy and inject symbols

gulp.task('markupsGlobal', function() {
    return gulp.src('resources/global/markups/**/*')
        .pipe(plumber())
        .pipe(change(symbolsImgToSpriteSvg))
        .pipe(change(injectGlobalSymbols))
        .pipe(gulp.dest('public/global/markups/'))
    ;

});

gulp.task('markupsDesktop', function() {
    return gulp.src('resources/desktop/markups/**/*')
        .pipe(plumber())
        .pipe(change(symbolsImgToSpriteSvg))
        .pipe(change(injectDesktopSymbols))
        .pipe(gulp.dest('public/desktop/markups/'))
    ;
});

gulp.task('markupsMobile', function() {
    return gulp.src('resources/mobile/markups/**/*')
        .pipe(plumber())
        .pipe(change(symbolsImgToSpriteSvg))
        .pipe(change(injectMobileSymbols))
        .pipe(gulp.dest('public/mobile/markups/'))
    ;
});


// Layouts: copy

gulp.task('layouts', function() {
  gulp.src('resources/global/layouts/**/*')
      .pipe(plumber())
      .pipe(change(symbolsImgToSpriteSvg))
      .pipe(change(injectGlobalSymbols))
      .pipe(gulp.dest('public/global/layouts/'))
  ;
  gulp.src('resources/desktop/layouts/**/*')
      .pipe(plumber())
      .pipe(change(symbolsImgToSpriteSvg))
      .pipe(change(injectDesktopSymbols))
      .pipe(gulp.dest('public/desktop/layouts/'))
  ;
  gulp.src('resources/mobile/layouts/**/*')
      .pipe(plumber())
      .pipe(change(symbolsImgToSpriteSvg))
      .pipe(change(injectMobileSymbols))
      .pipe(gulp.dest('public/mobile/layouts/'))
  ;
});


// Vendors: copy

gulp.task('vendors', function() {
  gulp.src('resources/global/vendors/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('public/global/vendors/'))
  ;
  gulp.src('resources/desktop/vendors/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('public/desktop/vendors/'))
  ;
  gulp.src('resources/mobile/vendors/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('public/mobile/vendors/'))
  ;
});


// Scripts: copy

gulp.task('scripts', function() {
  gulp.src('resources/global/scripts/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('public/global/scripts/'))
  ;
  gulp.src('resources/desktop/scripts/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('public/desktop/scripts/'))
  ;
  gulp.src('resources/mobile/scripts/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('public/mobile/scripts/'))
  ;
});


// Symbols
// In the end we have a 3 global variables with 3 sets of symbols

gulp.task('symbolsGlobal', function() {
    return gulp.src([
        'resources/global/symbols/*.svg'
    ])
        .pipe(plumber())
        .pipe(svgmin())
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(change(saveGlobalSymbols))
    ;
});

gulp.task('symbolsDesktop', function() {
    return gulp.src([
        'resources/global/symbols/*.svg',
        'resources/desktop/symbols/*.svg'
    ])
        .pipe(plumber())
        .pipe(svgmin())
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(change(saveDesktopSymbols))
    ;
});

gulp.task('symbolsMobile', function() {
    return gulp.src([
        'resources/global/symbols/*.svg',
        'resources/mobile/symbols/*.svg'
    ])
        .pipe(plumber())
        .pipe(svgmin())
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(change(saveMobileSymbols))
    ;
});



// Styles: clean (concat imports, clean comments, compress), add prefixes, inline svg, copy

gulp.task('styles', function() {

  gulp.src([
    'resources/global/styles/style.css'
  ])
      .pipe(plumber())
      .pipe(cleanCSS({
        advanced: false,
        keepSpecialComments: 0
      }))
      .pipe(autoprefixer({
        browsers: 'last 2 versions',
        cascade: false
      }))
      .pipe(base64({
        exclude: ['/images/']
      }))
      .pipe(gulp.dest('public/global/styles/'))
      .pipe(size())
  ;

  gulp.src([
    'resources/desktop/styles/style.css'
  ])
      .pipe(plumber())
      .pipe(cleanCSS({
        advanced: false,
        keepSpecialComments: 0
      }))
      .pipe(autoprefixer({
        browsers: 'last 2 versions',
        cascade: false
      }))
      .pipe(base64({
        exclude: ['/images/']
      }))
      .pipe(gulp.dest('public/desktop/styles/'))
      .pipe(size())
  ;

  gulp.src([
    'resources/mobile/styles/style.css'
  ])
      .pipe(plumber())
      .pipe(cleanCSS({
        advanced: false,
        keepSpecialComments: 0
      }))
      .pipe(autoprefixer({
        browsers: 'last 2 versions',
        cascade: false
      }))
      .pipe(base64({
        exclude: ['/images/']
      }))
      .pipe(gulp.dest('public/mobile/styles/'))
      .pipe(size())
  ;
});


// lint

gulp.task('lint', function() {
  gulp.src([
    '!resources/global/styles/style.css',
    'resources/global/styles/**/*.css'
  ])
      .pipe(plumber())
      .pipe(csslint('csslintrc.json'))
      .pipe(csslint.reporter())
      .pipe(csslint.reporter()) // random action just because css lint doesn't work in last row
  ;
  gulp.src([
    '!resources/desktop/styles/style.css',
    'resources/desktop/styles/**/*.css'
  ])
      .pipe(plumber())
      .pipe(csslint('csslintrc.json'))
      .pipe(csslint.reporter())
      .pipe(csslint.reporter()) // random action just because css lint doesn't work in last row
  ;
  gulp.src([
    '!resources/mobile/styles/style.css',
    'resources/mobile/styles/**/*.css'
  ])
      .pipe(plumber())
      .pipe(csslint('csslintrc.json'))
      .pipe(csslint.reporter())
      .pipe(csslint.reporter()) // random action just because css lint doesn't work in last row
  ;
});



gulp.task('default', function (fn) {
  run('clean', 'index', 'temp', 'content', 'images', 'symbolsGlobal', 'symbolsDesktop', 'symbolsMobile', 'markupsGlobal', 'markupsDesktop', 'markupsMobile', 'layouts', 'vendors', 'scripts', 'styles', 'lint', fn);
});






