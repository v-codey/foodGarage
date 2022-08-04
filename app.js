var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const http = require('http');
const { Server } = require("socket.io");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var validateCustomerRouter = require("./routes/validateUserCredentials");
var getResDetailsRouter = require("./routes/getRestaurentDetails");
var newUserSingup = require("./routes/newUserSignup");
var checkLoginRouter = require("./routes/checkLogin");
var addRestaurentRouter = require("./routes/addNewRestaurent");
var uploadRouter = require("./routes/uploadResturentPicture");
var app = express();
const server = http.createServer(app);
const io = new Server(server);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
    secret: 's;dlfkvgjsa;ldkfjas;dl',
    resave: false
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

console.log(__dirname)



console.log(path.join(__dirname, 'public'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/validate/customer/details", validateCustomerRouter);
app.use("/get/restaurentDetails", getResDetailsRouter);
app.use("/new/user/registration", newUserSingup);
app.use("/check/isUserLoggedin", checkLoginRouter);
app.use("/add/newRestaurent", addRestaurentRouter);
app.use("/upload/image", uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

server.listen(8081, () => {
  console.log("Server is listing at 8081");
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
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
