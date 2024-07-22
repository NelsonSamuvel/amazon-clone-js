import { Cart } from "../../data/cart-class.js";



export function displayCheckoutQuantity(){

    const cart = new Cart('cart');

    document.querySelector(".return-to-home-link").innerHTML =
    cart.displayCartCount() + " items";
}