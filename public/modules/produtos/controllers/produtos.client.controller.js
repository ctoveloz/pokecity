'use strict';

// Produtos controller
angular.module('produtos').controller('ProdutosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Produtos',
	function($scope, $stateParams, $location, Authentication, Produtos ) {
		$scope.authentication = Authentication;

		// Create new Produto
		$scope.create = function() {
			// Create new Produto object
			var produto = new Produtos ({
				name: this.name,
				tipo: this.tipo
			});

			// Redirect after save
			produto.$save(function(response) {
				$location.path('produtos/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Produto
		$scope.remove = function( produto ) {
			if ( produto ) { produto.$remove();

				for (var i in $scope.produtos ) {
					if ($scope.produtos [i] === produto ) {
						$scope.produtos.splice(i, 1);
					}
				}
			} else {
				$scope.produto.$remove(function() {
					$location.path('produtos');
				});
			}
		};

		// Update existing Produto
		$scope.update = function() {
			var produto = $scope.produto ;

			produto.$update(function() {
				$location.path('produtos/' + produto._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Produtos
		$scope.find = function() {
			$scope.produtos = Produtos.query();
		};

		// Find existing Produto
		$scope.findOne = function() {
			$scope.produto = Produtos.get({ 
				produtoId: $stateParams.produtoId
			});
		};
	}
]);