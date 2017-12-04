const gulp = require('gulp');
const webserver = require('gulp-webserver');
const cleanCss = require('gulp-clean-css');
const urls = require('url');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const minimg = require('gulp-imagemin')
const obj = [{
    img: 'q.png',
    head: '百度',
    price: "北京市海淀区西北旺",
    id: '互联网 | 已上市 | 10000以上',
    zy: '前端开发工程师',
    num: 2158
}, {
    img: 'q.png',
    head: '小米',
    price: "北京市海淀区西北旺",
    id: '互联网 | 已上市 | 10000以上',
    zy: '前端开发工程师',
    num: 4565
}, {
    img: 'q.png',
    head: '搜狐',
    price: "北京市海淀区西北旺",
    id: '互联网 | 已上市 | 10000以上',
    zy: '前端开发工程师',
    num: 7864
}, {
    img: 'q.png',
    head: '谷歌',
    price: "北京市海淀区西北旺",
    id: '互联网 | 已上市 | 10000以上',
    zy: '前端开发工程师',
    num: 1234
}];
const list = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJs: true,
    minifyCSS: true
};
gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            port: 8080,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return;
                }
                const method = req.method;
                const url = urls.parse(req.url);
                const pathname = url.pathname;
                res.setHeader('Access-Control-Allow-Origin', '*')
                if (method === 'GET') {

                } else if (method === 'POST') {
                    let data = '';
                    req.on('data', function(chunk) {
                        data += chunk
                    })
                    req.on('end', function() {
                        switch (pathname) {
                            case '/list':
                                res.writeHead(200, {
                                    'content-type': 'application/json;charset=utf-8'
                                })
                                res.write(JSON.stringify(obj))
                                res.end();
                        }
                    })
                } else {
                    res.writeHead(200, {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json;charset=utf-8',
                        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Origin,X-Requested-With,Content-Type,Accept'
                    })
                    res.end();
                }
            }
        }))
});
gulp.task('htmlmin', function() {
    gulp.src('./*.html')
        .pipe(htmlmin(obj))
        .pipe(gulp.dest('./list/'))
})
gulp.task('uglify', function() {
    gulp.src('./angular.js')
        .pipe(uglify())
        .pipe(gulp.dest('./list/'))
})
gulp.task('cleanCss', function() {
    gulp.src('./*.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('./list/'))
})

gulp.task('minImage', function() {
    gulp.src('./q.png')
        .pipe(minimg())
        .pipe(gulp.dest('./list/'))
})
gulp.task('default', ['webserver', 'cleanCss', 'uglify', 'htmlmin', 'minImage']);