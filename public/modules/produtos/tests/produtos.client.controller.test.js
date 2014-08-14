'use strict';

(function() {
	// Produtos Controller Spec
	describe('Produtos Controller Tests', function() {
		// Initialize global variables
		var ProdutosController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Produtos controller.
			ProdutosController = $controller('ProdutosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Produto object fetched from XHR', inject(function(Produtos) {
			// Create sample Produto using the Produtos service
			var sampleProduto = new Produtos({
				name: 'New Produto'
			});

			// Create a sample Produtos array that includes the new Produto
			var sampleProdutos = [sampleProduto];

			// Set GET response
			$httpBackend.expectGET('produtos').respond(sampleProdutos);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.produtos).toEqualData(sampleProdutos);
		}));

		it('$scope.findOne() should create an array with one Produto object fetched from XHR using a produtoId URL parameter', inject(function(Produtos) {
			// Define a sample Produto object
			var sampleProduto = new Produtos({
				name: 'New Produto'
			});

			// Set the URL parameter
			$stateParams.produtoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/produtos\/([0-9a-fA-F]{24})$/).respond(sampleProduto);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.produto).toEqualData(sampleProduto);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Produtos) {
			// Create a sample Produto object
			var sampleProdutoPostData = new Produtos({
				name: 'New Produto'
			});

			// Create a sample Produto response
			var sampleProdutoResponse = new Produtos({
				_id: '525cf20451979dea2c000001',
				name: 'New Produto'
			});

			// Fixture mock form input values
			scope.name = 'New Produto';

			// Set POST response
			$httpBackend.expectPOST('produtos', sampleProdutoPostData).respond(sampleProdutoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Produto was created
			expect($location.path()).toBe('/produtos/' + sampleProdutoResponse._id);
		}));

		it('$scope.update() should update a valid Produto', inject(function(Produtos) {
			// Define a sample Produto put data
			var sampleProdutoPutData = new Produtos({
				_id: '525cf20451979dea2c000001',
				name: 'New Produto'
			});

			// Mock Produto in scope
			scope.produto = sampleProdutoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/produtos\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/produtos/' + sampleProdutoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid produtoId and remove the Produto from the scope', inject(function(Produtos) {
			// Create new Produto object
			var sampleProduto = new Produtos({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Produtos array and include the Produto
			scope.produtos = [sampleProduto];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/produtos\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProduto);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.produtos.length).toBe(0);
		}));
	});
}());