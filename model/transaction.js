const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
	date: {type: Date, default: Date.now },
	cid: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Category'
  	},
	amount: String,
	notes: String,
	type: String
});

module.exports = mongoose.model('Transaction', transactionSchema);