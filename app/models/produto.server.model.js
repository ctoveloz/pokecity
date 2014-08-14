'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Produto Schema
 */
var ProdutoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Produto name',
		trim: true
	},
	tipo: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Produto', ProdutoSchema);