const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userShema = new Schema({
  username: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  role: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);