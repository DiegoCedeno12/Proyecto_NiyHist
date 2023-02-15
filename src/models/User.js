import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt-nodejs';

const userSchema = new Schema({
    first_name_user: {
        type: String,
        require: true
    },
    last_name_user: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    cellphone: {
        type: String,
        require: true
    },
    cellphone2: {
        type: String,
        require: true
    },
    address_user: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    confirm_password: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

userSchema.methods.encryptPassword =  (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.matchPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


module.exports = model('User', userSchema);