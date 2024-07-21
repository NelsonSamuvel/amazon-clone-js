

export class Cart {
  cartItems;
  #localKey;


  constructor(localKey){
    this.#localKey = localKey;

    this.#loadFromStorage();
  }

  #loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.#localKey)) ||  [];
  }
  saveToStorage(){
    localStorage.setItem(this.#localKey,JSON.stringify(this.cartItems));
  }
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
  }
  removeCartItem(productId) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
    this.saveToStorage();
    return this.cartItems;
  }
  displayCartCount() {
    let items = 0;
    this.cartItems.forEach((item) => {
      items += item.quantity;
    });
    return items;
  }

  updateDeliveryOptions(productId,deliveryId){
    const foundCartItem = this.cartItems.find(item => item.productId === productId);
    foundCartItem.deliveryId = deliveryId;
    this.saveToStorage();  
  }
}





