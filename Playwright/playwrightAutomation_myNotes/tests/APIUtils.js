const {expect}= require('@playwright/test');
class APIUtils {

    constructor(apiContext,loginPayload){
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
    }

    async getToken(){
        const loginResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
            data:this.loginPayload
         });
         expect(loginResponse.status()).toBe(200);
        const loginResponseJson= await loginResponse.json();
        const token= loginResponseJson.token;
        console.log(token);
        return token;

    }

    async createOrder(CreateOrderPayload){
        //Notice this response object is created to store the token and orderId .This response object is returned to the test script
        let response={}
        response.token=await this.getToken();
        const CreateOrderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
            data:CreateOrderPayload,
            headers:{
                'authorization':response.token,
                'content-type':'application/json'
            }
        });
        expect(CreateOrderResponse.status()).toBe(201);
        const CreateOrderResponseJson= await CreateOrderResponse.json();
        console.log(CreateOrderResponseJson.orders[0]);
        const orderId=CreateOrderResponseJson.orders[0];
        response.orderId=orderId;
        return response;

    }
  }


  //Export the APIUtils class so that it can be used in the another script as import
  module.exports={APIUtils};
