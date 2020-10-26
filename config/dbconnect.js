const dbconnect = () => {
    //dB connection//////////
    const mongoose = require("mongoose");
    const uri = process.env.MongoURI || 'mongodb://localhost:27017/dbclinica'

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