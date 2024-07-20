import { displayCartCount } from "../../data/cart.js";

export function displayCheckoutQuantity(){
    document.querySelector(".return-to-home-link").innerHTML =
    displayCartCount() + " items";
}