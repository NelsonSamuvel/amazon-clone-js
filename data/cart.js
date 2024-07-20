export let cart = JSON.parse(localStorage.getItem('cart')) ||  [];

export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}


export function addToCart(productId){
    const quantity = Number(document.querySelector(`.js-quantity-${productId}`).value);
      let matchingItem;
      cart.forEach((item) => {
        if (item.productId === productId) {
          matchingItem = item;
        }
      });
  
      if (matchingItem) {
        matchingItem.quantity+= quantity;
      } else {
        cart.push({ productId, quantity , deliveryId: '1' });
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