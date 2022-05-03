const mongoose = require("mongoose");


//first connecting to the mongoDB database and then proceed further
mongoose
    .connect('mongodb+srv://Moses_Chris:Moses%4098@cluster0.shkq0.mongodb.net/LiveBidApp?retryWrites=true&w=majority', {
        useNewUrlParser: true,
    }, (error, client) => {

        if (error) {
            console.log(error)
        }
        
        console.log("database connected")

        
    })