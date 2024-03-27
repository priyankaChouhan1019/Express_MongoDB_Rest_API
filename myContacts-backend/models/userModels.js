const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:[true,"Please enter the user name"]
    },

    email:{
        type: String,
        require:[true, "Please enter email address"],
        unique:[true, "Email address already taken"]
    },

    password:{
        type: String,
        require:[true, "Please enter password"]
    },
    
   

},
{
    timestamps:true
})

module.exports = mongoose.model("user",userSchema)