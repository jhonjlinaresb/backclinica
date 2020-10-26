const mongoose = require ('mongoose');
const MongoURI = process.env.MongoURI || 'mongodb://localhost:27017/dbclinica'

mongoose.connect(MongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('Connected successfully to MongoDB ' + MongoURI))