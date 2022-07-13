const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test ('Test if, when executing saveCartItems with the <ol><li>Item</li></ol> argument, the localStorage.setItem method is called', () => {
    const parametre = `<ol><li>item</li></ol>`;
    saveCartItems(parametre);
    expect(localStorage.setItem).toBeCalled();
  });
  test ('Test if, when executing saveCartItems with the <ol><li>Item</li></ol> argument, the localStorage.setItem method is called', () => {
    const parametre = `<ol><li>item</li></ol>`;
    saveCartItems(parametre);    
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', parametre);
  });  
});
