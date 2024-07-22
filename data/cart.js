export let cart;


loadFromStorage();
export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) ||  [];
}

export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}


export function addToCart(productId){
    // const quantity = Number(document.querySelector(`.js-quantity-${productId}`).value);
      let matchingItem;
      cart.forEach((item) => {
        if (item.productId === productId) {
          matchingItem = item;
        }
      });
  
      if (matchingItem) {
        matchingItem.quantity+= 1;
      } else {
        cart.push({ productId, quantity : 1 , deliveryId: '1' });
      }

      saveToStorage();
  }

export function removeCartItem(productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  saveToStorage();
  return cart;
}


export function displayCartCount() {
  let cartItems = 0;
  cart.forEach((item) => {
    cartItems += item.quantity;
  });
  return cartItems;
}


export function updateDeliveryOptions(productId,deliveryId){
  const foundCartItem = cart.find(item => item.productId === productId);
  foundCartItem.deliveryId = deliveryId;
  saveToStorage();

}



export function loadCart(loadFunc){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load',()=>{
     console.log(xhr.response);
    loadFunc();
  })

  xhr.open('GET',"https://supersimplebackend.dev/cart");
  xhr.send();
}