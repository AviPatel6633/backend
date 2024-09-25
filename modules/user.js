const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userItemSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

userItemSchema.pre('save', async function (next) {
    const person = this;
    // hash password only if password is modified  or is new
    if ((!person.isModified('password'))) return next();
    try {
        // hash password generation
        const salt = await bcrypt.genSalt(10);
        //hash password creating
        const hashPassword = await bcrypt.hash(person.password, salt);
        //overriting password with hash password
        person.password = hashPassword;
        next();
    } catch (error) {
        return next(error);
    }
})

userItemSchema.methods.comparePassword = async function(condidatePassword){
    try {
        const isMatch = await bcrypt.compare(condidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}
const UserData = mongoose.model('UserData', userItemSchema);
module.exports = UserData;


// Data
// {
//     "username": "Avi",
//     "password": "Avi@6633",
//     "email": "avi@gmail.com"
// }
