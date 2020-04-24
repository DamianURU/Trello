const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength: 3
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    pass:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
 
}, {
    timestamps: true,
    }
)

module.exports = mongoose.model('User', usersSchema);