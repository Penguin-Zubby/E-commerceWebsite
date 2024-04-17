const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const port = 3500;

var indexRouter = require("./allRoutes/index");
var loginRouter = require("./allRoutes/loginRoute");

app.set("trust proxy", 1);
app.use(
  session({
    secret: "flying penguin are awesome",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//setting up view engine
app.set("pages", path.join(_dirname, "pages"));
app.set("pages engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(_dirname, "public")));

app.use("/", indexRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
