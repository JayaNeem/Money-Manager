const mongoose = require('mongoose');

const incomeSchema = mongoose.Schema({
	date: {type: Date, default: Date.now },
	month: String,
	year: String,
	cid: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Category'
  	},
	amount: Number,
	notes: String
});

module.exports = mongoose.model('Income', incomeSchema);