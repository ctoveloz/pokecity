'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var produtos = require('../../app/controllers/produtos');

	// Produtos Routes
	app.route('/produtos')
		.get(produtos.list)
		.post(users.requiresLogin, produtos.create);

	app.route('/produtos/:produtoId')
		.get(produtos.read)
		.put(users.requiresLogin, produtos.hasAuthorization, produtos.update)
		.delete(users.requiresLogin, produtos.hasAuthorization, produtos.delete);

	// Finish by binding the Produto middleware
	app.param('produtoId', produtos.produtoByID);
};