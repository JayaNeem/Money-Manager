const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: String,
	email: String,
	code: String
});

module.exports=mongoose.model('User', userSchema);