//This class contains all the basic test scripts for UI automation using Playwright
const { test } = require('@playwright/test')
const { expect } = require('@playwright/test');

//TO run the test in this js file parallely we need to configure
// test.describe.configure({mode:'parallel'})

// context with browser property
//here we are tagging the testcase with custom tag web 
//To run the test case with tags npx playwright test --grep @web
test('@web Browser context Playwright test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://playwright.dev/');

}
)

//direct page property
test('page context text', async ({ page }) => {
  const username = page.locator('input[name="username"]');
  const password = page.locator('input[name="password"]');
  const sighIn = page.locator('input[type="submit"]');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise1/');
  const title = await page.title();
  // console.log('Page title:', title);
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await username.fill('rahulshetty');
  await password.fill('learning');
  await sighIn.click();
  // playwright has autowait supported method(https://playwright.dev/docs/actionability) and it wait until the timeout set in config.js file
  //textContent() is a method to get the text of the element
  console.log(await page.locator("[style='display: block;']").textContent());
  await expect(page.locator("[style='display: block;']")).toContainText('Incorrect');
  //fill("") is used to clear the text field
  await username.fill("");
  await username.fill("rahulshettyacademy");
  await password.fill("learning");
  await sighIn.click();
  // when the locator has multiple elements ,then the execution will throw error. So we need to use nth() method to select the index of the element
  // await page.locator('.card-title a').nth(0).click();

  //printing the list of webelements
  //The auto wait time for textContent() method is the default timeout set in the Playwright configuration, which is usually 30 seconds.
  // but allTextContents() method does not have auto wait feature.
  // The auto wait time for allTextContents() method is not applicable as it does not wait for elements to be available.
  console.log('first product', await page.locator('.card-title a').nth(0).textContent());
  const allTitles = await page.locator('.card-title a').allTextContents();
  console.log(allTitles);


}
)

test('page context with network wait', async ({ page }) => {
  const username = page.locator('input[id="userEmail"]');
  const password = page.locator('input[id="userPassword"]');
  const sighIn = page.locator('input[id="login"]');
  await page.goto('https://rahulshettyacademy.com/client/');
  await username.fill("sam@mailinator.com");
  await password.fill("SamKumar@123");
  await sighIn.click();
  // waitForLoadState() method is used to wait for network calls to be completed
  await page.waitForLoadState('networkidle');

  //sometime page.waitForLoadState('networkidle'); is flaky so in that case we can use below waitFor()
  await page.locator(".card-body b").nth(0).waitFor();

  const allTitles = await page.locator(".card-body b").allTextContents();
  console.log(allTitles);

})

test('Radio and checkbox test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator(".form-control:nth-child(1)").selectOption("consult");
  await page.locator("input[value='user']").click();
  // assert the radiobutton is checked or not
  await expect(page.locator("input[value='user']")).toBeChecked();
  // to get the boolean value of the radiobutton is checked or not
  console.log(await page.locator("input[value='user']").isChecked());
  //to confirm the alert popup
  await page.locator("#okayBtn").click();
  //pause the execution and it will open playwright inspector window
  // await page.pause();
  //to check the checkbox
  await page.locator("#terms").check();
  await expect(page.locator("#terms")).toBeChecked();
  // to uncheck the checkbox
  await page.locator("#terms").uncheck();
  // to assert the checkbox is unchecked or not 
  // note that await is outside the expect method .it is because await keyword will come only where the action is performed
  //await keyword only to be used where the action is performed here tobeChecked() is the action and it is outside hence await is outside
  await expect(page.locator("#terms")).not.toBeChecked();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  //assert the blinking text is displayed in home page.
  //Notice toHaveAttribute() method is used to assert the attribute of the element
  await expect(page.locator(".blinkingText:nth-child(1)")).toHaveAttribute("class", "blinkingText");

})

test('Child window test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const documentLink = page.locator(".blinkingText:nth-child(1)");
  // this below is to handle the child window
  const [newwindow] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click()
  ]);
  const text = await newwindow.locator(".red").textContent();
  console.log(text);
  // back to parent window using parent window page object
  await page.locator("#username").fill("rahulshettyacademy");
  // await page.pause();

})

test('E2E automation', async ({ page }) => {
  //This test if for login to the ecom app and select a product dynamically and add to cart and 
  //verify the product is added to cart in cart page 
  //checkout and fill the checkout page information ->select country from checkout page dynamically
  const username = page.locator('input[id="userEmail"]');
  const password = page.locator('input[id="userPassword"]');
  const sighIn = page.locator('input[id="login"]');
  const ProductList = page.locator('.card-body');
  const productSelect = "ZARA COAT 3";
  await page.goto('https://rahulshettyacademy.com/client/');
  await username.fill("sam@mailinator.com");
  await password.fill("SamKumar@123");
  await sighIn.click();
  // waitForLoadState() method is used to wait for network calls to be completed
  await page.waitForLoadState('networkidle');
  const allTitles = await page.locator(".card-body b").allTextContents();
  console.log(allTitles);
  const count = await ProductList.count();
  for (let i = 0; i < count; i++) {
    const productname = await ProductList.nth(i).locator("b").textContent();
    if (productname === productSelect) {
      // locator with text matching
      await ProductList.nth(i).locator("text= Add To Cart").click();
      console.log('product added to cart at index ' + i);
      // await page.pause();   
      break;
    }
  }
  //click on cart view button
  await page.locator("[routerlink*='cart']").click();

  await page.locator("div li").nth(0).waitFor();
  // we are checking if the item added to cart is displayed in the cart page
  //Here we are using locator with tagname:hash-text('') /This is special locator supported in playwright called as pseudo class https://playwright.dev/docs/other-locators#css-matching-by-text
  //isVisible() method does not have auto wait feature https://playwright.dev/docs/actionability .hence we are using waitFor() method before this step .Wait for the list in cart page is loaded
  const bool = await page.locator("h3:has-text('Zara Coat')").isVisible();
  expect(bool).toBeTruthy();

  //click on checkout button
  await page.locator("text=Checkout").click();
  await page.locator("[placeholder='Select Country']").waitFor();
  //here we are using pressSequentially() method to enter the text in dropdown one by one .
  //Since the dropdown suggestion will only appear when key is pressed one by one.
  //in case of fill() the text is directly filled in the field .So the suggested way is pressSequentially() method https://playwright.dev/docs/api/class-locator#locator-press-sequentially
  await page.locator("[placeholder='Select Country']").pressSequentially("Ind");
  //The below is to select the country from the dropdown

  const dropdownOptions = page.locator(".ta-item .ng-star-inserted");
  await dropdownOptions.nth(0).waitFor();
  const dropdowncount = await dropdownOptions.count();
  console.log('Dropdown count:', dropdowncount);
  for (let i = 0; i < dropdowncount; i++) {
    const country = await dropdownOptions.nth(i).textContent();
    console.log('Country:', country);
    if (country === ' India') {
      await dropdownOptions.nth(i).click();
      break;
    }
  }

  //Assert the email address from checkout page .Notice here the css is using parent <space> child css selector
  await expect(page.locator(".user__name [type='text']").first()).toHaveText("sam@mailinator.com");
  //click submit button
  await page.locator(".action__submit").click();
  //verify the confirmation page
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  //Grab the orderId
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log('Order Id:', orderId);


  //Go to order history tab
  await page.locator("[routerlink*='/myorders']").nth(1).click();

  //wait until the order page is loaded
  await page.locator("tr[class='ng-star-inserted'] th").first().waitFor();

  //Get all the orderIds from the order history page
  const rowColumn = page.locator("tr[class='ng-star-inserted']");

  //assert the orderId is displayed in the order history page

  for (let i = 0; i < await rowColumn.count(); i++) {
    const rowOrderId = await rowColumn.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      console.log('Order Id is displayed in order history page');
      //click view order page
      await page.locator(".btn-primary").nth(i).click();
      //verify the order Id is correct in the view order page
      expect(orderId.includes(await page.locator(".col-text").first().textContent())).toBeTruthy();
      break;
    }
  }

})

test('Label Locator  adiitional ways', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  //label locator is used to find the label of the element
  //getbylabel uses lable tag to click a checkbox or radiobutton by text
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  //getbyplaceholder is used to find the element by placeholder of input field
  await page.getByPlaceholder("Password").fill("password");

  //GetByRole is used to find the all the elements from the DOM html with the provided role(button,Alert,link etc )and we can pass additional attribute such as name to filter out elements
  await page.getByRole("button", { name: "Submit" }).click();

  //GetByText 
  // await page.getByText("Submit").click();

  //getByRole using link
  await page.getByRole("link", { name: "Shop" }).click();

  //in the shop page dynamically select add to cart -
  //Observe that we are using locator to find the card section and from the cards section we are dynamically filtering the card which has text Nokia ege and with in the nokia edge card section we are clicking the button.
  //There is only one button section in the card section so we are directly clicking the button
  //This is called as chaining of locators. ie output of one locator as input to another
  await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole('button').click();




  //  await page.pause();
}
)

test('E2E automation using other way using getlabel and other locating strategies', async ({ page }) => {
  //This test if for login to the ecom app and select a product dynamically and add to cart and 
  //verify the product is added to cart in cart page 
  //checkout and fill the checkout page information ->select country from checkout page dynamically
  const username = page.locator('input[id="userEmail"]');
  const password = page.getByPlaceholder("enter your passsword");
  const sighIn = page.getByRole("button", { name: "Login" });
  const ProductList = page.locator('.card-body');
  const productSelect = "ZARA COAT 3";
  await page.goto('https://rahulshettyacademy.com/client/');
  await username.fill("sam@mailinator.com");
  await password.fill("SamKumar@123");
  await sighIn.click();
  // waitForLoadState() method is used to wait for network calls to be completed
  await page.waitForLoadState('networkidle');
  const allTitles = await page.locator(".card-body b").allTextContents();
  console.log(allTitles);
  const count = await ProductList.count();
  await page.locator(".card").filter({ hasText: "ZARA COAT 3" }).getByRole('button', { name: "Add To Cart" }).click();

  //click on cart view button  ->This is because there are multiple buttons with cart name in the page .TO uniquely idenfy the required button we are first
  //finding the list because the quired item is under list and then we are chaining to find the required button
  await page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();

  await page.locator("div li").nth(0).waitFor();
  // we are checking if the item added to cart is displayed in the cart page
  //Here we are using locator with tagname:hash-text('') /This is special locator supported in playwright called as pseudo class https://playwright.dev/docs/other-locators#css-matching-by-text
  //isVisible() method does not have auto wait feature https://playwright.dev/docs/actionability .hence we are using waitFor() method before this step .Wait for the list in cart page is loaded
  const bool = await page.locator("h3:has-text('Zara Coat')").isVisible();
  expect(bool).toBeTruthy();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();


  //click on checkout button
  await page.getByRole('button', { name: "Checkout" }).click();
  await page.getByPlaceholder("Select Country").waitFor();
  //here we are using pressSequentially() method to enter the text in dropdown one by one .
  //Since the dropdown suggestion will only appear when key is pressed one by one.
  //in case of fill() the text is directly filled in the field .So the suggested way is pressSequentially() method https://playwright.dev/docs/api/class-locator#locator-press-sequentially
  await page.getByPlaceholder("Select Country").pressSequentially("Ind");
  //The below is to select the country from the dropdown

  const dropdownOptions = page.locator(".ta-item .ng-star-inserted");
  await dropdownOptions.nth(0).waitFor();

  //selecting the count
  page.getByRole('button', { name: "Ind" }).nth(1).click();

  //Assert the email address from checkout page .Notice here the css is using parent <space> child css selector
  await expect(page.locator(".user__name [type='text']").first()).toHaveText("sam@mailinator.com");
  //click submit button
  await page.locator(".action__submit").click();
  //verify the confirmation page
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  //Grab the orderId
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log('Order Id:', orderId);


  //Go to order history tab
  await page.locator("[routerlink*='/myorders']").nth(1).click();

  //wait until the order page is loaded
  await page.locator("tr[class='ng-star-inserted'] th").first().waitFor();

  //Get all the orderIds from the order history page
  const rowColumn = page.locator("tr[class='ng-star-inserted']");

  //assert the orderId is displayed in the order history page

  for (let i = 0; i < await rowColumn.count(); i++) {
    const rowOrderId = await rowColumn.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      console.log('Order Id is displayed in order history page');
      //click view order page
      await page.locator(".btn-primary").nth(i).click();
      //verify the order Id is correct in the view order page
      expect(orderId.includes(await page.locator(".col-text").first().textContent())).toBeTruthy();
      break;
    }
  }

})



test('Calendar handling', async ({ page }) => {
  const monthNumber = "6";
  const date = "15";
  const year = "2028";
  const expectedList = [monthNumber, date, year]

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  //click on calendar icon
  await page.locator(".react-date-picker.react-date-picker--closed").click();
  //click in top centre of calendar window
  await page.locator(".react-calendar__navigation__label").click();
  //click again to reach year selection
  await page.locator(".react-calendar__navigation__label").click();

  // select the year
  await page.getByText(year).click();

  //select the month -here we are getting the index of month by converting it to integer
  await page.locator("button[class='react-calendar__tile react-calendar__year-view__months__month']").nth(Number(monthNumber) - 1).click();

  //select the date

  await page.locator("//abbr[text()='" + date + "']").click();

  //Locator to uniquely identify the text of the date in calendar displayed

  await page.waitForTimeout(2000);
  //Notice the below locator returns list of elelements .This is to validate the date displayed in the calendar as text 
  const calendarDisplayedDate = await page.locator(".react-date-picker__inputGroup input[autocomplete='off']");
  const count = await calendarDisplayedDate.count();
  console.log('Printing date count: ' + count);

  for (let i = 0; i < count; i++) {
    const value = await calendarDisplayedDate.nth(i).getAttribute("value");
    expect(value).toBe(expectedList[i]);
  }

})

test('Additional concepts like alerts and mouse actions', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // await page.goto("https://google.com");
  // //TO navigae backward
  // await page.goBack();
  // //To navigate forward
  // await page.goForward();

  //TO use assertion with elelement displayed
  await expect(page.locator("#displayed-text")).toBeVisible();
  //Hiding the elelement and asserting the element is not visible
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).not.toBeVisible();
  await page.pause();
  //Alerts in playwright
  // this is listener which listens whether dialog(alert) opens.If yes then it accepts it
  page.on('dialog', async dialog => dialog.accept());

  //Notice click is performed after the listener is set
  await page.locator("#confirmbtn").click();

  //Mouse hover
  await page.locator("#mousehover").hover();

})



test('Frame Handling', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  const frame = page.frameLocator("#courses-iframe");
  //here notice we are :visible pseudo class to find the element which is visible. This is special locator supported in playwright called as pseudo class https://playwright.dev/docs/other-locators#css-locator
  //when there are multiple matches with the locator and getting strict mode violation then we can use :visible pseudo class to get the visible element
  //otherwise we can also point the element uniquely with nth() method as used below
  await frame.locator("[href='practice-project']:visible").click();
  await frame.locator(".form-column  h2").nth(0).waitFor();
  const text = await frame.locator(".form-column  h2:visible").textContent();
  console.log(text);

  //switching back to parent frame and printing some text
  console.log(await page.locator("h1:visible").textContent());

})

test('Visual testing', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.locator("[value='Hide']").click();

  //Take screenshot full page level
  await page.screenshot({ path: "screenshot.png" });

  //Take screenshot of the element[partial screenshot] 
  await page.locator("[value='Hide']").screenshot({ path: "screenshotElement.png" });

  //Visual testing 
  //note here we are not having the landing.png file initialy .SO when the test run first take ,it will automatically take screenshot 
  //and place it inside test-results folder
  //when the second time the test runs ,it will compare the screenshot(automatically taken previously) with the previous screenshot and if there is any difference it will throw error
  expect(await page.screenshot()).toMatchSnapshot("landing.png");

})





