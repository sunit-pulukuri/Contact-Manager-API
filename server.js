const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/error-handler");
const connectDB = require("./config/dbConnection");
// const bodyParser = require('body-parser'); alternate = app.use(express.json()) is a middleware which converts the request body to JSON, without this, it will be undefined in the console

connectDB();


const port = process.env.PORT || 5000;

app.use(express.json());



app.use("/api/contacts",require("./routes/contacts-route"))
//this is the main starting point and it is connected to the middlware contacts-route
//whichever req starts with /api/contacts WILL go to the middleware and then depending on the type of request and the params, it will send a response

//inbuilt middleware to make use of bodyparser

app.use(errorHandler)    //error handling middleware user-defined


app.use("/api/users",require("./routes/users-route"))





app.listen(port, ()=>{
    console.log(
        "Server runnning on port ", port
    )
})