//Basic Import Section
const express=require('express');
const app=express();
const cors=require('./middleware/cors');
const PORT=process.env.PORT || 3001;

//Modular imports
const {showUsers, logoutUser} = require('./db/dbuser');
const {showUsersId} = require('./db/dbuser');
const {registerUser} = require('./db/dbuser');
const {deleteUser} = require('./db/dbuser');
const {modifyUser} = require('./db/dbuser');
const {loginUser} = require('./db/dbuser');
const {userAppointments, adduserAppointment, deleteOne} = require('./db/dbappointment');

const dbconnect = require('./config/dbconnect');
dbconnect();

//Middleware
app.use(cors);
app.use(express.json());
app.options('/*', (req, res) => res.send());
//db connection



//ACTIONS

//user actions
app.get('/users/showAll', showUsers);
app.get('/users/id/:userId', showUsersId);
app.get('/users/:dni/appoinments', userAppointments);

app.post('/users/register', registerUser); //Ya 
app.post('/users/login', loginUser); //Ya
app.post('/users/logout', logoutUser);
app.post('/users/:dni/appoinments', adduserAppointment);

app.delete('/users/delete', deleteUser);
app.delete('/users/:dni/appoinments', deleteOne);

app.put('/users/modify', modifyUser);


//port listen
app.listen(PORT, ()=> console.log('>>>SERVER ONLINE'));