const mongoose = require("mongoose")

const connectDB = async()=>{
    try{
        const connect = mongoose.connect("mongodb://localhost:27017/MyContacts");
        console.log("Connected to the database")
    }catch(err){
        console.log(err);
        process.exit(1);
    }
};


module.exports = connectDB;