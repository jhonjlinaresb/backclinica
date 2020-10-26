const UserModel=require('../models/User');

const mongoose=require('mongoose');

const bcrypt = require("bcryptjs");

const fs=require('fs');

const showUsers = (req, res) => {
     
    
        //we show all users
        UserModel.find({})
        .then(users=>{
            res.send(users)
        })
        .catch(error=>console.log(error))
    
}

const showUsersId = (req, res) => {
     
    let idJhon = req.params.userId;
    //we show all users
    UserModel.findOne({id:idJhon})
    .then(users=>{
        res.send(users)
    })
    .catch(error=>console.log(error))

}

const registerUser = async (req, res) => {
    
    let bodyData = req.body;
    let regExEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;
    let regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;


    if(!regExEmail.test(bodyData.email)){
        res.send({
            message: "El email introducido no es válido"
        });
        return;
    }

    if(!regExPassword.test(bodyData.password)){
        res.send({
            message: "El password introducido no es válido"
        });
        return;
    }

    //fin de comprobacion inicial de errores
    
    //encriptado de password
    
    let hashPass = await bcrypt.hash(bodyData.password, 10);

    try {
		
        const user = await new UserModel({
		    username: bodyData.username,
		    email: bodyData.email,
            password: hashPass,
            dni:bodyData.dni
        }).
        save();

        res.send({
            message: "Account created successfully.",
            username: user.username
        });

        // const user = await new UserModel(
        //     req.body
        // ).save();
		
	} catch (err) {
        
        if (err.code === 11000) { // E11000 duplicate key error (unique true)
			
			res.status(409); // conflict
			res.send({
				error: "Email already used."
			});
			
		} else {
			
			res.send(err);
			
		}
			
		
	};
	
};

const deleteUser = async (req, res) => {
    
    let id = req.body.id;

	UserModel.findByIdAndDelete(
		id
	).then ( (borradoExitosamente) => {
		
		if (borradoExitosamente) {
			res.send({
				message: `User ${borradoExitosamente.id} borrado con éxito: Usuario: ${borradoExitosamente.username} email: ${borradoExitosamente.email}`
			});
		} else {
			res.status(404);
			res.send({
				error: `Usuario con el id ${id} no encontrado.`
			})
		};
		
	}).catch( (err) => {
		console.log( err );
	});
}

const modifyUser = async (req, res) => {
    UserModel.findByIdAndUpdate(req.body.id,
        {username: req.body.username, password: req.body.password}, {new:true, useFindAndModify:false})
    .then( (user) => {

        if(user){

            if(user){
                //then positively user was found and updated.
                res.send(user);
            }else{
                res.send({"message": "Oops! there was an error updating the changes."})
            }
            
        }
    }).catch (err => console.log(err));
}

const loginUser = async (req, res) => {

    const usuarioEncontrado = await UserModel.findOne({
        email: req.body.email
    });

    if(!usuarioEncontrado){
        res.send({
            message: "No existe el usuario"
        })
    }else{

        let passwordOk = await bcrypt.compare(req.body.password, usuarioEncontrado.password);

        if(passwordOk){
            const email = {
                email: usuarioEncontrado.email
            };
            
            let user1 = await UserModel.findOne(email);
            user1.token = user1.password;
            await user1.save(); 
            res.send({
                name: user1.username,
                email: user1.email
            })
        }else{
            res.send({
                message: "Credenciales incorrectas"
            })
        }
        
    }

}

const logoutUser = async (req, res) => {
    try {
        //const token = { token: token };
        const email = {
            email: req.body.email
        };
        const user = await UserModel.findOneAndUpdate(email, emptyToken);
        res.send({
            message:`Goodbye ${user.username}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error,
            message: 'There was a problem trying to disconnected the user'
        })
    }
}

module.exports = {
    showUsers,
    showUsersId,
    registerUser,
    deleteUser,
    modifyUser,
    loginUser,
    logoutUser
}