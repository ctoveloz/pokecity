'use strict';

// Configuring the Articles module
angular.module('produtos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Produtos', 'produtos', 'dropdown', '/produtos(/create)?');
		Menus.addSubMenuItem('topbar', 'produtos', 'List Produtos', 'produtos');
		Menus.addSubMenuItem('topbar', 'produtos', 'New Produto', 'produtos/create');
	}
]);