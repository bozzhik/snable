import gulp from 'gulp'
import zip from 'gulp-zip'
import {createRequire} from 'module'

const require = createRequire(import.meta.url)
const manifest = require('../build/manifest.json')
const packageData = require('../package.json')

gulp
  .src('build/**')
  .pipe(zip(`${packageData.name}-${manifest.version}.zip`))
  .pipe(gulp.dest('package'))
