const dbconnect = () => {
    //dB connection//////////
    const mongoose = require("mongoose");
    const uri = "mongodb+srv://Admin:1234@cluster0.weyv5.mongodb.net/dbcitas?retryWrites=true&w=majority";

    mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then(() => {
            console.log('CONNECTION TO mDB RUNNING');
        })
        .catch(error => console.log('Error connecting to the dB' + error));
    ////////////////////////

}

module.exports = dbconnect;