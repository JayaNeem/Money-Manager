const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
	name: String,
	type: String
});

module.exports = mongoose.model('Category', categorySchema);