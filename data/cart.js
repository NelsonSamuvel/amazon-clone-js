export let cart = JSON.parse(localStorage.getItem('cart')) ||  [];


function saveToStorage(){
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
        cart.push({ productId, quantity });
      }

      saveToStorage();
  }

export function removeCartItem(productId) {
  console.log("sda");
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  saveToStorage();
  return cart;
}