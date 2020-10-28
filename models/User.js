const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: [true, 'El campo email es requerido'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        /* validate: {
            validator: function(v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/.test(v);
            },
            message: () => `La contraseña debe contener al menos una minúscula, una mayúscula, un número,un carácter especial, y debe estar entre 8 y 10 carácteres de longitud!`
        },*/
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'doctor', 'Dios'],
    },
    tokens: [String]
});
UserSchema.methods.toJSON = function(params) {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    return user;
}
/*UserSchema.pre('save', async function(next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, 9);
    next()
});*/
UserSchema.statics.checkCredentials = async function(credentials) {
    const user = await this.findOne({
        email: credentials.email
    });
    if (!user) return null;
    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) return null;
    return user;
}
UserSchema.methods.generateAuthToken = function() {
    const user = this;
    const token = jwt.sign({ _id: user._id }, 'mipapamemimamucho', { expiresIn: '2y' });
    return token;
}
const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;