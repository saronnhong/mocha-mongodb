const mongoose = require('mongoose');

//connect to mongoDB
mongoose.connect('mongodb://localhost/mocha_test');

mongoose.connection.once('open', function(){
    console.log("Connection has been made, now you can start your Tests!");
}).on("error", function(error){
    console.log("Connection Error: ", error);
})