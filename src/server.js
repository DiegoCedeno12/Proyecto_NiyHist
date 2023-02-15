import express from "express";
import path from "path";
import morgan from "morgan";
import methodOverride from "method-override";
import multer from "multer";
import engine from 'ejs-mate';
import passport from "passport";
import session from "express-session";
import flash from 'connect-flash';
import moment from "moment/moment";
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es');


import './passport/local-auth';
import indexRoutes from "./routes/index.routes";
import familyRouters from './routes/family.routes';
import missingRouters from './routes/missing.routes';
//import notesRoutes from "./routes/notes.routes.js";
import userRoutes from "./routes/auth.routes.js";
//import "./config/passport.js";


// Initializations
const app = express();


// Settings
app.set('port', process.env.PORT || 4000)
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', engine);
app.set('view engine', 'ejs');


// Middlewars
app.use(morgan('dev'));
app.use(multer({
  dest: path.join(__dirname, 'public/upload/temp',
  )
}).single('image'))
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(session({
  secret: 'mysecretsession',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



// Globals variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.signupMessage = req.flash("signupMessage");
  res.locals.signinMessage = req.flash('signinMessage');
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
})
app.locals.timeago = timestamp => {
  return moment(timestamp).startOf('minute').fromNow();
};
app.locals.fechaCalculada = fecha => {
  var date = new Date(fecha),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, parseInt(day) + 1].join("-");
}

app.locals.generarQR = async urlQR =>{
  const QR = await QRCode.toDataURL(urlQR);
  console.log(QR);
  return QR;
}


//Routs
app.use(indexRoutes);
app.use(familyRouters);
app.use(missingRouters);
app.use(userRoutes);/*
app.use(notesRoutes); */


// static/files
app.use( '/public' ,express.static(path.join(__dirname, 'public')));

module.exports = app