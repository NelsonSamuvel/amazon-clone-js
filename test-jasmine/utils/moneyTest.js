import { formatCurrency } from "../../scripts/utils/money.js";

describe("test suite : Format Currency", () => {
  it("convert cents to dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });


  it("works with 0",()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  })

  it("rounds the cents" ,()=>{
    expect(formatCurrency(2000.5)).toEqual('20.00');

    expect(formatCurrency(2000.4)).toEqual(`20.00`);

    
    expect(formatCurrency(-25)).toEqual(`-0.25`);
  })




});
