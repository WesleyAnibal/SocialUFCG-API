const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');


//Converte todos os TS em JS usando como base o arquivo tsConfig
gulp.task('scripts', ['static'], () => {

    const tsResult = tsProject.src()
        .pipe(tsProject());

    return tsResult.js
        .pipe(gulp.dest('dist'));

});


// Copiar os arquivos estáticos q tem no diretório src para o diretório dist
gulp.task('static', ['clean'],()=>{
    return gulp
    .src(['src/**/*.json'])
    .pipe(gulp.dest('dist'));
});

gulp.task('clean',()=>{
    return gulp
    .src('dist')
    .pipe(clean());
});

gulp.task('build',['scripts']);

gulp.task('watch', ['build'],()=>{
    return gulp.watch(['src/**/*.ts','src/**/*.json'], ['build']);
});

gulp.task('default', ['watch']);