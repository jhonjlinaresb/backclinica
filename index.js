//Basic Import Section
const express=require('express');
const app=express();
const cors=require('./middleware/cors');

//Modular imports
const {showUsers, logoutUser} = require('./db/dbuser');
const {showUsersId} = require('./db/dbuser');
const {registerUser} = require('./db/dbuser');
const {deleteUser} = require('./db/dbuser');
const {modifyUser} = require('./db/dbuser');
const {loginUser} = require('./db/dbuser');
const {userAppoinments, adduserAppoinment} = require('./db/dbappointment');


//Middleware
app.use(cors);
app.use(express.json());

//db connection
const dbconnect = require('./config/dbconnect');
const { deleteOne } = require('./models/User');
dbconnect();

//ACTIONS

//user actions
app.get('/user/showAll', showUsers);
app.get('/user/id/:userId', showUsersId);
app.get('/user/:dni/appoinments', userAppoinments);

app.post('/user/register', registerUser);
app.post('/user/login', loginUser);
app.post('/user/logout', logoutUser);
app.post('/user/:dni/appoinments', adduserAppoinment);

app.delete('/user/delete', deleteUser);
app.delete('user/:delete/appoinments', deleteOne);

app.put('/user/modify', modifyUser);


//port listen
app.listen(3001, ()=> console.log('>>>SERVER ONLINE'));