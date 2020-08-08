const gulp = require('gulp')
const serve = require('./gulp/tasks/serve')
const pug2html = require('./gulp/tasks/pug2html')
const pug2htmlDev = require('./gulp/tasks/pug2htmlDev')
const styles = require('./gulp/tasks/styles')
const stylesDev = require('./gulp/tasks/stylesDev')
const script = require('./gulp/tasks/script')
const scriptDev = require('./gulp/tasks/scriptDev')
const fonts = require('./gulp/tasks/fonts')
const imageMinify = require('./gulp/tasks/imageMinify')
const clean = require('./gulp/tasks/clean')
const cleanDev = require('./gulp/tasks/cleanDev')
const lighthouse = require('./gulp/tasks/lighthouse')
const svgSprite = require('./gulp/tasks/svgSprite')

function setMode(isProduction = false) {
  return cb => {
    process.env.NODE_ENV = isProduction ? 'production' : 'development'
    cb()
  }
}

const dev = gulp.parallel(pug2html, styles, script, fonts, imageMinify, svgSprite)
const devel = gulp.parallel(pug2htmlDev, stylesDev, scriptDev)
const build = gulp.series(clean, dev)

module.exports.prod = gulp.series(setMode(), build)
module.exports.build = gulp.series(setMode(true), build)
module.exports.start = gulp.series(cleanDev, devel, serve)
module.exports.html = gulp.series(setMode(), script)

module.exports.lighthouse = gulp.series(lighthouse)
