const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
    // username will handle {passport local mongoose}
    // password will handle {passport local mongoose}

    email:{
        type:String,
        required:true,
        trim:true,
    },
    role:{
        type:String,
        default:'buyer'
    },
    gender:{
        type:String,
        required:true,
        trim:true,

    }

});


// use plugin
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User',userSchema);

module.exports = User;
