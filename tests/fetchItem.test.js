require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('test if fetchItem is a function',() =>{
    expect(typeof(fetchItem)).toEqual('function');
  });
  test('test if fetchItem with parameter "MLB1615760527" call fetch()', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })  
  test('test if fetchItem with parameter "MLB1615760527" use correct endpoint', () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  })
  test('test if fetchItem with parameter "MLB1615760527" returns correct data ', async () => {
    const data = await fetchItem('MLB1615760527');
    expect(data).toEqual(item);
  }) 
  test('test if calling the fetchItem function with no argument returns an error with the message: "You must provide an url"', async () => {
    const failRequest = await fetchItem();
    expect(failRequest).toEqual(new Error('You must provide an url'));
  });
});
