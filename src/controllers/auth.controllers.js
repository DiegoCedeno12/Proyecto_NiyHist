import passport from "passport";
import User from '../models/User';

export const renderSignUpForm = (req, res) => {
    res.render('users/register');
}

export const signup = passport.authenticate('local-singup', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    passReqToCallback: true
})

export const renderSigninForm = (req, res) => {
    res.render('users/login');
}

export const signin = passport.authenticate('local-singin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    passReqToCallback: true
})

export const renderProfile = async (req, res) => {
    const usersesion = await User.findOne({ _id: req.user._id})
    res.render('profile', {usersesion, PageTitle: 'Perfil de Usuario'});
}

export const profile = async (req, res) => {
    const { first_name_user, last_name_user, username, email, cellphone, cellphone2, address_user  } = req.body;
    await User.findByIdAndUpdate( req.user._id, { first_name_user, last_name_user, username, email, cellphone, cellphone2, address_user })
    res.redirect('/')
}

export const logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/signin');
    });
}
