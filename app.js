const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport  = require("passport");
const passportLocalMongoose  = require("passport-local-mongoose");
const trainerRouter = require("./routes/trainerRouter");
const traineeRouter = require("./routes/traineeRouter");
const adminRouter = require("./routes/adminRouter");

const app = express();

//passport config
require("./config/passport")(passport)

//db config
const db = require("./config/keys").MongoURI;

//consect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//bodyParser
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global vars
app.use((req,res,next) =>{
    res.locals.sucess_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
})

//Routes
// app.use("/", require("./routes/index"));
// app.use("/users", require("./routes/users"));
// app.use("/admin", require("./routes/admin"));
// app.use("/trainer", require("./routes/trainer"));
// app.use("/trainee", require("./routes/trainee"));

app.use(trainerRouter);
app.use(traineeRouter);
app.use(adminRouter);

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
