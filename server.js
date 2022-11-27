const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
//allows us to stay loggin 
const session = require("express-session");
//leave the broswer and still loggin 
const MongoStore = require("connect-mongo")(session);
//override put and delete via forms
const methodOverride = require("method-override");
//incorrect passwords, login 
const flash = require("express-flash");
const logger = require("morgan");
//connecting files with last three requires
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const orderRoutes = require("./routes/orders");

//Use .env file in config folder
//without .env file does not work 
require("dotenv").config({ path: "./config/.env" });

// Passport config
//require is a function call to passport.js(boiler plate)
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  //cookie on our end and user's pc
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/order", orderRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
