const fetchItem = async (item) => {
  try {
    const promisse = await fetch(`https://api.mercadolibre.com/items/${item}`);
    const result = await promisse.json();
    return result;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
