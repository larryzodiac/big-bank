const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const userSchema = new Schema({
    id: ObjectId,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    watchlist: []
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;