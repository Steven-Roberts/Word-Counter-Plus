import {browserlistOptions, globs, paths} from './config';

import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import {production} from 'gulp-environments';
import uglify from 'gulp-uglify';

export const createLintJs = (failAfterError = true) => {
    const lintJs = () => gulp.src([...globs.js, ...globs.gulp])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(gulpIf(failAfterError, eslint.failAfterError()));

    return lintJs;
};

export const buildJs = () => gulp.src(globs.js)
    .pipe(babel({
        presets: [
            [
                'env',
                {
                    targets: browserlistOptions
                }
            ]
        ]
    }))
    .pipe(production(uglify()))
    .pipe(gulp.dest(paths.build));

export const watchJs = (watchOptions) => gulp.watch(globs.js, watchOptions,
    gulp.series(createLintJs(false), buildJs));
