export let cart = [{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 2,
},{
    productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity : 1,
}];


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

      console.log(cart);
  }

export function removeCartItem(productId) {
  console.log("sda");
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  console.log(cart);
  return cart;
}