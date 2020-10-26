import mongoose from 'mongoose';
const MongoURI = process.env.MongoURI || 'mongodb+srv://Admin:1234@cluster0.weyv5.mongodb.net/dbcitas?retryWrites=true&w=majority'

mongoose.connect(MongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('Connected successfully to MongoDB ' + MongoURI))