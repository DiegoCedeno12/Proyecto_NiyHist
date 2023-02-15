import passport from "passport";
const localStrategy = require('passport-local').Strategy;
import User from '../models/User';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-singup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const existeemail = await User.findOne({ email: email });
    console.log(existeemail);
    console.log(req.body);
    const existeusername = await User.findOne({ username: req.body.username });
    if (existeusername) {
        return done(null, false, req.flash('signupMessage', 'El nombre de Usuario ya está en uso'))
    } else {
        if (existeemail) {
            return done(null, false, req.flash('signupMessage', 'El Correo Electronico ya está en uso'))
        } else {
            if (password != req.body.confirm_password) {
                return done(null, false, req.flash('signupMessage', 'Las contraseñas no son iguales'))
            } else {
                const newuser = new User();
                newuser.first_name_user = req.body.first_name_user;
                newuser.last_name_user = req.body.last_name_user;
                newuser.username = req.body.username;
                newuser.email = email;
                newuser.password = newuser.encryptPassword(password);
                newuser.confirm_password = newuser.encryptPassword(req.body.confirm_password);
                await newuser.save();
                done(null, newuser)
            }
        }
    }
}));

passport.use('local-singin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email });

    if (!user) {
        return done(null, false, req.flash('signinMessage', 'Usuario no encontrado'));
    }

    if (!user.matchPassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta'));
    }
    done(null, user);
}))
