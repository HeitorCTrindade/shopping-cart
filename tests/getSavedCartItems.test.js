const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
	test('Test if, when executing getSavedCartItems the method localStorage.getItem is called', () => {
		getSavedCartItems();
		expect(localStorage.getItem).toBeCalled();
	});
	test('Test if, when executing getSavedCartItems, the localStorage.getItem method is called with cartItems argument', () => {
		getSavedCartItems();
		expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
	});
});
