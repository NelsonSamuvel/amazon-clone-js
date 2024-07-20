import { addToCart,loadFromStorage,cart } from "../../data/cart.js";


describe("add to cart",()=>{
    it("add existing cart item to the cart",()=>{
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId : "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                quantity : 1,
                deliveryId : '1',
            }]);
        })

        loadFromStorage();

        addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
        expect(cart[0].quantity).toEqual(2);
    })


    it("add new item into cart",()=>{

        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        })

        loadFromStorage();



        addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
        expect(cart[0].quantity).toEqual(1);

    })

})