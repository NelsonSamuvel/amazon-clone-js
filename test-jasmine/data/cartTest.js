import { addToCart,loadFromStorage,cart, removeCartItem} from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";


describe("add to cart",()=>{

    beforeEach(()=>{
        spyOn(localStorage,'setItem');
    })

    it("add existing cart item to the cart",()=>{


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
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
            productId : "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            quantity : 2,
            deliveryId : '1',
        }]));
        expect(cart[0].productId).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
        expect(cart[0].quantity).toEqual(2);
    })


    it("add new item into cart",()=>{

        

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        })

        loadFromStorage();



        addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
            productId : "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            quantity : 1,
            deliveryId : '1',
        }]));
        expect(cart[0].productId).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
        expect(cart[0].quantity).toEqual(1);

    })

})


describe("Remove from cart",()=>{
    let productId1 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
    let productId2 = "54e0eccd-8f36-462b-b68a-8182611d9add";
    beforeEach(()=>{
        spyOn(localStorage,"setItem");

        spyOn(localStorage,"getItem").and.callFake(()=>{
            return JSON.stringify([
                {
                  productId: productId1,
                  quantity: 1,
                  deliveryId: "1",
                }
              ])
        })
        loadFromStorage();

    })

    it("Remove a productId",()=>{
        removeCartItem("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart','[]');
        expect(cart).toEqual([])
    })

    it("remove ProductId but not in cart",()=>{
        removeCartItem("does not exist");
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: productId1,
            quantity: 1,
            deliveryId: "1",
          }]));
    })

})