'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'
import runSequence from 'gulp-run-sequence'
import rename from 'gulp-rename'

import yarn from 'gulp-yarn'
import ngConstant from 'gulp-ng-constant'
import sass from 'gulp-sass'
import htmlToJs from 'gulp-html-to-js'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import clean from 'gulp-clean'
import nodemon from 'gulp-nodemon'

import config from './public/config/env.js'

gulp.task('yarn', () => {
  return gulp.src(['./package.json'])
    .pipe(yarn());
})

gulp.task('constants', () => {
  const env = config[process.env] //process.env
  return ngConstant({
    name: 'config',
    constants: env,
    stream: true
  }).pipe(gulp.dest('public/dist'))
})

gulp.task('sass', () => {
  return gulp.src('public/app/assets/sass/app.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({
      dirname: '/',
      basename: 'app',
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/dist'))
})

gulp.task('htmlToJs', () => {
  return gulp.src(['public/app/**/**/*.html'])
    .pipe(htmlToJs())
    .pipe(rename({
      dirname: '/',
      basename: 'views'
    }))
    .pipe(gulp.dest('public/tmp'))
})

gulp.task('concat', () => {
  return gulp.src(['public/dist/config.js', 'public/tmp/views.js'])
    .pipe(concat({
      newLine: ';',
      path: 'app.js'
    }))
    .pipe(gulp.dest('public/dist'))
})

gulp.task('minify', () => {
  return gulp.src('public/dist/app.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/dist'))
})

gulp.task('clean', () => {
  return gulp.src(['public/tmp','public/dist/app.css','public/dist/config.js','public/dist/app.js'], {read: false})
    .pipe(clean({force: true}))
})

gulp.task('nodemon', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('watch', () => {
  gulp.watch('public/app/assets/sass/*.scss',['sass'])
  gulp.watch('public/app/views/**/*.html', () => {
    runSequence('htmlToJs','concat','minify','clean')
  })
  gulp.watch(['public/app/**/**/*.js'], () => {
    runSequence('concat','minify','clean')
  })
})

gulp.task('dev', () => {
  runSequence(['yarn','constants','sass','htmlToJs'],'concat','minify','clean',['nodemon','watch'])
})
