const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const Schema=mongoose.Schema;

const userSchema= new Schema ({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    email: {
        type: String,
        unique: true,
      },
    profilePicture:{
        type:String,
      },
     RegisterAs:{
        type: String,
        enum: ['Admin','DeliveryGuy'],
      },
      myOrder:{
        type: String,
      }

},{timestamps: true});

module.exports= mongoose.model("User", userSchema)