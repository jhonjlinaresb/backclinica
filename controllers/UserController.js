import Users from '../../frontclinica/src/containers/UserList/UserList.jsx';
import UserModel from '../models/User.js';
const UserController = {
    getAll(req, res) {
        UserModel.find().then(users => res.send(users))
            .catch(error => {
                console.error(error);
                res.status(500).send({ message: 'There was a problem trying to get the users', error })
            })
    },
    async register(req, res) {
        try {
            req.body.role = 'user'; //Mejor que poner default en el modelo por seguridad
            const user = await UserModel.create(req.body);
            res.status(201).send(user)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async login(req, res) {
        try {
            const user = await UserModel.checkCredentials(req.body);
            if (!user) {
                return res.status(400).send({
                    message: 'Wrong Credentials'
                });
            }
            const token = user.generateAuthToken();
            res.send({ user, token });
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

export default UserController;