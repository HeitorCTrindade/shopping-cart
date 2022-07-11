require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('test if fetchProducts is a function', () => {
    expect(typeof(fetchProducts)).toBe('function');
  })  
  test('test if fetchProducts with parameter "computador" call fetch()', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })  
  test('test if fetchProducts with parameter "computador" use correct endpoint', () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  })
  test('test if fetchProducts with parameter "computador" returns correct data ', async () => {
    const data = await fetchProducts('computador');
    expect(data).toEqual(computadorSearch)
  }) 
  test('test if calling the fetchProducts function with no argument returns an error with the message: "You must provide an url"', async () => {
    const failRequest = await fetchProducts();
    expect(failRequest).toEqual(new Error('You must provide an url'));
  })
});
