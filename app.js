var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

//importing routes

var indexRouter = require("./allRoutes/index");
var userRouter = require("./allRoutes/userRoute");
var loginRouter = require("./allRoutes/loginRoute");
var productRouter = require("./allRoutes/productsRoute");
var registerRouter = require("./allRoutes/registerRoute");
var paymentRouter = require("./allRoutes/paymentRoute");
var kiddDiorRouter = require("./allRoutes/kiddDiorRoute");
var aboutUsRouter = require("./allRoutes/aboutUsRoute");
var contactUSRouter = require("./allRoutes/contactUsRoute");

//importing database
const db = require("./database");

//setting up session

var app = express();

app.set("trust proxy", 1);
app.use(
  session({
    secret: "flying penguin are awesome",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(function (req, res, next) {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

//setting up view engine
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
/*app.use("/user", userRouter);*/
app.use("/login", loginRouter);
app.use("/products", productRouter);
app.use("/register", registerRouter);
app.use("/kiddDior", kiddDiorRouter);
app.use("/payment", paymentRouter);
app.use("/aboutUs", aboutUsRouter);
app.use("/contactUs", contactUSRouter);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
