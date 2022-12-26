let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

const auth = require('./middlewares/auth');

let indexRouter = require('./routes/index');
let authRouter = require('./routes/admin/auth');
let setUsersRouter = require('./routes/admin/users');
let setCourseRouter = require('./routes/admin/course');
let courseRouter = require('./routes/admin/kelas');
let usersApiRouter = require('./routes/usersAPI');
let coursesApiRouter = require('./routes/coursesAPI');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret' }))
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/dashboard/users', setUsersRouter);
app.use('/dashboard/courses', setCourseRouter);
app.use('/course', auth.checkLogin, courseRouter);
app.use('/api/courses', coursesApiRouter);
app.use('/api/users', usersApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
