const items = document.getElementsByClassName('items');
const cartItems = document.getElementsByClassName('cart__items');
const totalPrice = document.querySelector('.total-price');
const buttonEmptyCart = document.querySelector('.empty-cart');
const sectionContainer = document.querySelector('.container');

totalPrice.innerText = 'Carrinho Vazio';

const createProductImageElement = (imageSource) => {
  const imageSourceHD = imageSource.replace('I', 'W');
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSourceHD;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const getArrayValuesFromItemsCart = () => {
  const itemsCartValues = [];
  cartItems[0].childNodes.forEach((li) => {
    const array = li.innerText.split(' | ');
    array.forEach((detail) => {
      const [key, value] = detail.split(': ');
      if (key === 'PRICE') itemsCartValues.push(value.replace('$', ''));
    });  
  });  
  return itemsCartValues;   
};

const calcCartTotalValue = () => {
  const cartProductsValues = getArrayValuesFromItemsCart();
  const totalCartVAlue = cartProductsValues.reduce((acc, curr) => acc + parseFloat(curr), 0.0);
  totalPrice.innerText = totalCartVAlue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }); // rounds off values and sets to two decimal places. To increase decimal places add more 0.
};

const cartItemClickListener = (event) => {
  cartItems[0].removeChild(event.target);
  saveCartItems(cartItems[0].outerHTML);
  calcCartTotalValue(); 
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const showLoadingAlert = () => {
  const loadingAlert = document.createElement('h3');
  loadingAlert.innerText = '[Carregando...]';
  loadingAlert.className = 'loading';
  sectionContainer.insertBefore(loadingAlert, sectionContainer.childNodes[0]);  
};

const hideLoadingAlert = () => {
  sectionContainer.removeChild(sectionContainer.childNodes[0]);
};

const addItemToCart = async (section) => {
  showLoadingAlert();
  objItem = await fetchItem(getSkuFromProductItem(section));
  hideLoadingAlert();
  const newSessionProduct = createCartItemElement({
    sku: objItem.id, name: objItem.title, salePrice: objItem.price });    
  cartItems[0].appendChild(newSessionProduct);
  saveCartItems(cartItems[0].outerHTML);
  calcCartTotalValue();
};

const loadLocalStoredSavedItemToCart = (savedItems) => {
  cartItems[0].outerHTML = savedItems;
  cartItems[0].childNodes.forEach((li) => li.addEventListener('click', cartItemClickListener));  
  calcCartTotalValue();
};

const createProductItemElement = ({ sku, name, image, price }) => {
  const formatedPrice = price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
  const section = document.createElement('section');
  section.className = 'item';  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'price', formatedPrice));

  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => addItemToCart(section));

  section.appendChild(button);
  return section;
};

const loadProducts = async () => {
  showLoadingAlert();
  arrayProducts = await fetchProducts('computador');
  hideLoadingAlert();
  arrayProducts.results.forEach((product) => {
    const newSessionProduct = createProductItemElement({
      sku: product.id, name: product.title, image: product.thumbnail, price: product.price });    
    items[0].appendChild(newSessionProduct);    
  });    
};

const handleButtonEmptyCart = () => {
  buttonEmptyCart.addEventListener('click', () => {
    cartItems[0].innerHTML = '';
    calcCartTotalValue();
    saveCartItems(cartItems[0].outerHTML);
  });  
};

window.onload = () => {
  loadProducts(); 
  handleButtonEmptyCart();
  if (localStorage.getItem('cartItems') !== null) {
    const savedCart = getSavedCartItems();     
    loadLocalStoredSavedItemToCart(savedCart);
  }  
};