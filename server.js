require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = require("./config/connections");
const routes = require("./controllers/homepageController");

const helpers = require("./utils/helpers");

const hbs = exphbs.create({
  helpers,
});

const sessionSettings = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const app = express(); //create server

const PORT = process.env.PORT || 3001;

// Template Engine Setup
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// middlewares
app.use(express.static("public"));
app.use(session(sessionSettings)); // access to req.session
app.use(express.json()); // body parser to get req.body in the app
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  // data base logs
  app.listen(PORT, () => console.log("WE MADE IT!!! ")); // console log to make server running
});
