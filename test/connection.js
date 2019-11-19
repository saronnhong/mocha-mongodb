const mongoose = require('mongoose');

//connect to mongoDB
mongoose.connect("mongodb://localhost/mocha_test", {useUnifiedTopology: true, useNewUrlParser: true});

//Connect to the db before tests run
before(function(done){
    mongoose.connection.once('open', function(){
        console.log("Connection has been made, now you can start your Tests!");
        done();
    }).on("error", function(error){
        console.log("Connection Error: ", error);
    })
});

//Drop the characters collection before each test
beforeEach(function(done){
    //Drop the collection
    mongoose.connection.collections.mariochars.drop(function(){
        done();
    })
})