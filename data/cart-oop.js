
function Cart(localKey){
  const cart = {
    cartItems : undefined,
    loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(localKey)) ||  [];
    },
    saveToStorage(){
      localStorage.setItem(localKey,JSON.stringify(this.cartItems));
    },
    addToCart(productId){
      // const quantity = Number(document.querySelector(`.js-quantity-${productId}`).value);
        let matchingItem;
        this.cartItems.forEach((item) => {
          if (item.productId === productId) {
            matchingItem = item;
          }
        });
    
        if (matchingItem) {
          matchingItem.quantity+= 1;
        } else {
          this.cartItems.push({ productId, quantity : 1 , deliveryId: '1' });
        }
  
        this.saveToStorage();
    },
    removeCartItem(productId) {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
      this.saveToStorage();
      return this.cartItems;
    },
    displayCartCount() {
      let items = 0;
      this.cartItems.forEach((item) => {
        items += item.quantity;
      });
      return this.cartItems;
    },
  
    updateDeliveryOptions(productId,deliveryId){
      const foundCartItem = this.cartItems.find(item => item.productId === productId);
      foundCartItem.deliveryId = deliveryId;
      this.saveToStorage();  
    }
  }


  return cart;
}



const cart = Cart('cart-oop');

const business = Cart('cart-business');






cart.loadFromStorage();

business.loadFromStorage();

cart.addToCart("8c9c52b5-5a19-4bcb-a5d1-158a74287c53");

business.addToCart("8c9c52b5-5a19-4bcb-a5d1-158a74287c53");


console.log(cart);

console.log(business);


