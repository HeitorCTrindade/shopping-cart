const items = document.getElementsByClassName('items');
const cartItems = document.getElementsByClassName('cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  cartItems[0].removeChild(event.target);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addItemToCart = async (section) => {
  objItem = await fetchItem(getSkuFromProductItem(section));
  const newSessionProduct = createCartItemElement({
    sku: objItem.id, name: objItem.title, salePrice: objItem.price });    
  cartItems[0].appendChild(newSessionProduct);
  saveCartItems(cartItems[0].outerHTML);
};

const loadLocalStoredSavedItemToCart = (savedItems) => {
  cartItems[0].outerHTML = savedItems;
  cartItems[0].childNodes.forEach((li) => li.addEventListener('click', cartItemClickListener));  
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => addItemToCart(section));

  section.appendChild(button);
  return section;
};

const loadProducts = async () => {
  arrayProducts = await fetchProducts('computador');
  arrayProducts.results.forEach((product) => {
    const newSessionProduct = createProductItemElement({
      sku: product.id, name: product.title, image: product.thumbnail });    
    items[0].appendChild(newSessionProduct);    
  });    
};

window.onload = () => {
  loadProducts(); 
  if (localStorage.getItem('cartItems') !== null) {
    const savedCart = getSavedCartItems(); 
    console.log(savedCart);   
    loadLocalStoredSavedItemToCart(savedCart);
  }
};