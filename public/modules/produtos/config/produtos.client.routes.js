'use strict';

//Setting up route
angular.module('produtos').config(['$stateProvider',
	function($stateProvider) {
		// Produtos state routing
		$stateProvider.
		state('todos', {
			url: '/y',
			templateUrl: 'modules/produtos/views/todos.client.view.html'
		}).
		state('listProdutos', {
			url: '/produtos',
			templateUrl: 'modules/produtos/views/list-produtos.client.view.html'
		}).
		state('createProduto', {
			url: '/produtos/create',
			templateUrl: 'modules/produtos/views/create-produto.client.view.html'
		}).
		state('viewProduto', {
			url: '/produtos/:produtoId',
			templateUrl: 'modules/produtos/views/view-produto.client.view.html'
		}).
		state('editProduto', {
			url: '/produtos/:produtoId/edit',
			templateUrl: 'modules/produtos/views/edit-produto.client.view.html'
		});
	}
]);