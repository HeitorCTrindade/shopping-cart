const fetchProducts = async (product) => {
  try {
    const promisseFetch = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
    const results = await promisseFetch.json();
    return results;
  } catch (error) {    
    return (error);
  }  
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
