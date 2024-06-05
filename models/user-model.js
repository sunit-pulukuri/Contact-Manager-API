const { timeStamp } = require("console");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add user name"],
  },

  email: {
    type: String,
    required: [true, "Please add email"],
    unique : [true, "email already exists"]
  },
  password: {
    type: String,
    required: [true, "Please add user password"],
  },
  
   
  

},{ timestamps: true,});


module.exports = mongoose.model("UserModel", userSchema)