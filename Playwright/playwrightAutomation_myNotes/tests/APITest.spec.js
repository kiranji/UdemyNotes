//This file contains test using API and UI automation
//The test script uses the APIUtils class to get the token and create order
const {test ,expect,request}= require('@playwright/test');
const { log } = require('console');
const {APIUtils}=require('./APIUtils');
const loginPayload={"userEmail":"sam@mailinator.com","userPassword":"SamKumar@123"};
const CreateOrderPayload={"orders":[{"country":"Cuba","productOrderedId":"67a8dde5c0d3e6622a297cc8"}]};
let response;

test.beforeAll(async ()=>{
 const apiContext= await request.newContext();
 const apiutils=new APIUtils(apiContext,loginPayload);
response=await apiutils.createOrder(CreateOrderPayload); 
console.log("Printing response")
console.log(response);


})

test('E2E automation', async({page})=>{
    //This test if for login to the ecom app and select a product dynamically and add to cart and 
    //verify the product is added to cart in cart page 
    //checkout and fill the checkout page information ->select country from checkout page dynamically
      const username=page.locator('input[id="userEmail"]');
      const password=page.locator('input[id="userPassword"]');
      const sighIn=page.locator('input[id="login"]');
      const ProductList=page.locator('.card-body');
      const productSelect="ZARA COAT 3";


      //This is to add the token taken from API script to the local storage of the browser
      page.addInitScript(value=>{
        window.localStorage.setItem('token',value);

      },response.token);

      await  page.goto('https://rahulshettyacademy.com/client/');
    //   await username.fill("sam@mailinator.com");
    //   await password.fill("SamKumar@123");
    //   await sighIn.click();
      // waitForLoadState() method is used to wait for network calls to be completed
      await page.waitForLoadState('networkidle');
      

        //Go to order history tab
        await page.locator("[routerlink*='/myorders']").click();
  
        //wait until the order page is loaded
        await page.locator("tr[class='ng-star-inserted'] th").first().waitFor();
  
        //Get all the orderIds from the order history page
        const rowColumn= page.locator("tr[class='ng-star-inserted']");
        
        //assert the orderId is displayed in the order history page
  
        for(let i=0;i<await rowColumn.count();i++){
          const rowOrderId=await rowColumn.nth(i).locator("th").textContent();
          if(response.orderId.includes(rowOrderId)){
            console.log('Order Id is displayed in order history page');
            //click view order page
            await page.locator(".btn-primary").nth(i).click();
            //verify the order Id is correct in the view order page
            expect(response.orderId.includes(await page.locator(".col-text").first().textContent())).toBeTruthy();
           await page.pause();
            break;
          }
        }
        
      })