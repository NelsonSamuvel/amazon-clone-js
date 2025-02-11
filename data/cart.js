export let cart;

loadFromStorage();
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  // const quantity = Number(document.querySelector(`.js-quantity-${productId}`).value);
  let matchingItem;
  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1, deliveryId: "1" });
  }

  saveToStorage();
}

export function removeCartItem(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
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

export function updateDeliveryOptions(productId, deliveryId) {
  const foundCartItem = cart.find((item) => item.productId === productId);
  foundCartItem.deliveryId = deliveryId;
  saveToStorage();
}

export function loadCart() {
  const promise = fetch("https://supersimplebackend.dev/cart")
    .then((response) => {
      return response.text();
    })
    .then((data) => console.log(data));
  return promise;
}


export async function loadCartFetch(){
  const response = await fetch("https://supersimplebackend.dev/cart");
  const data = await response.text();
  console.log(data);
}
