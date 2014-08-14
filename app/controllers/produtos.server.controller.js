'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Produto = mongoose.model('Produto'),
	_ = require('lodash');

/**
 * Create a Produto
 */
exports.create = function(req, res) {
	var produto = new Produto(req.body);
	produto.user = req.user;

	produto.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(produto);
		}
	});
};

/**
 * Show the current Produto
 */
exports.read = function(req, res) {
	res.jsonp(req.produto);
};

/**
 * Update a Produto
 */
exports.update = function(req, res) {
	var produto = req.produto ;

	produto = _.extend(produto , req.body);

	produto.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(produto);
		}
	});
};

/**
 * Delete an Produto
 */
exports.delete = function(req, res) {
	var produto = req.produto ;

	produto.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(produto);
		}
	});
};

/**
 * List of Produtos
 */
exports.list = function(req, res) { Produto.find().sort('-created').populate('user', 'displayName').exec(function(err, produtos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(produtos);
		}
	});
};

/**
 * Produto middleware
 */
exports.produtoByID = function(req, res, next, id) { Produto.findById(id).populate('user', 'displayName').exec(function(err, produto) {
		if (err) return next(err);
		if (! produto) return next(new Error('Failed to load Produto ' + id));
		req.produto = produto ;
		next();
	});
};

/**
 * Produto authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.produto.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};