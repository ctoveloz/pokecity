'use strict';

//Produtos service used to communicate Produtos REST endpoints
angular.module('produtos').factory('Produtos', ['$resource',
	function($resource) {
		return $resource('produtos/:produtoId', { produtoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);