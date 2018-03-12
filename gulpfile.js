// var gulp=require('gulp'),
// 	//多浏览器多设备同步
// 	browserSync=require('browser-sync').create(),
// 	SSI=require('browsersync-ssi');

// //创建一个名为serve的任务，该任务的内容就是匿名函数中的内容
// gulp.task('default',function(){
// 	//使用browserSync创建服务器，自动打开浏览器并打开./dist文件夹中的文件（默认为indexx。html）
// 	browserSync.init({
// 		server:{
// 			baseDir:['./dist'],
// 			middleware:SSI({
// 				baseDir:'./dist',
// 				ext:'.shtml',
// 				version:'2.10.0'
// 			})
// 		}
// 	})

// 	//监听各个目录的文件，如果有变动则执行相应的任务操作文件
// 	gulp.watch('vue/less/**/*.less',['compass']);
// 	gulp.watch('vue/js/**/*.js',['js']);
// 	gulp.watch('vue/**/*.html',['html']);
// 	//如果有任何文件变动，自动刷新浏览器
// 	gulp.watch('dist/**/*.html').on('change',browserSync.reload);
// });

// //compass任务，将scss编译为css
// gulp.task('compass',function(){
// 	//首先取得app/sass下所有后缀为.scss的文件（**/的意思是包含所有的子文件夹）
// 	return gulp.src('vue/sass/**/*.scss')
// })

// var gulp=require('gulp');
//
// // 组件
// var minicss=require('gulp-clean-css');
//
// var uglify=require('gulp-uglify');
//
// var imagemin=require('gulp-imagemin');
//
// gulp.task('default',['imagemin','minifycss','script'],function(){
//     gulp.watch('css/*.css',['minifycss']);
//     gulp.watch('js/*.js',['script']);
//     gulp.watch('images/*.*',['imagemin']);
// });
//
// gulp.task('minifycss',function(){
//     return gulp.src('css/*.css')
//         .pipe(minicss())
//         .pipe(gulp.dest('dist/styles'));
// });
//
//
// gulp.task('script',function(){
//     return gulp.src('js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });
//
// gulp.task('imagemin',function(){
//     return gulp.src('images/*.*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/images'));
// });


var gulp = require('gulp');

var gulpLess = require('gulp-less');

var connect = require('gulp-connect');


function openServer() {
    gulp.task('webserver',function () {
        gulp.src('./cityschose')
            .pipe(connect.server({
                livereload: true, // 启用LiveReload
                open: true, // 服务器启动时自动打开网页
            }))
    });
    gulp.task('default',['webserver']);
}
openServer();

//编译less
function createTask(taskname,mode,firstSrc,destSrc) {
    gulp.task(taskname,function () {
        return gulp.src(firstSrc)
            .pipe(mode())
            .pipe(gulp.dest(destSrc))
            .pipe(connect.reload())
    });
    gulp.task('default',[taskname]);
    gulp.watch(firstSrc,[taskname]);
};
createTask('lessTocss',gulpLess,'less/*.less','dist/css');

