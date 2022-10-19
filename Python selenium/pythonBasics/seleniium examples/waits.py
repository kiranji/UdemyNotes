import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.service import Service
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(ChromeDriverManager().install())

driver.get("https://rahulshettyacademy.com/seleniumPractise/#/")
driver.find_element(By.XPATH, "//input[@type='search']").send_keys("br")
time.sleep(3)
products = driver.find_elements(By.XPATH, "//button[@type='button']/parent::div[@class='product-action']")

wait = WebDriverWait(driver, 5)
driver.implicitly_wait(5)
selected_product = []
# wait.until(expected_conditions.element_to_be_clickable(By.XPATH,))
for product in products:
    print(product.find_element(By.XPATH, "preceding-sibling::h4").text)
    selected_product.append(product.find_element(By.XPATH, "preceding-sibling::h4").text)
    product.click()

driver.find_element(By.XPATH, "//*[@class='cart-icon']/img").click()
driver.find_element(By.XPATH, "//*[contains(text(),'PROCEED TO CHECKOUT')]").click()
time.sleep(3)
rows_count = driver.find_elements(By.XPATH, "//tbody/tr")
print(len(rows_count))
total=0.0
Sum=0.0
for i in range(0, len(rows_count)):

    quantity = rows_count[i].find_element(By.XPATH, "td[3]").text
    price = rows_count[i].find_element(By.XPATH, "td[4]").text
    total=float(quantity)*float(price)
    Sum=Sum+total

   # print("Quantity " + str(quantity) + " Price " + str(price))
print("total sum "+str(Sum))
cart_products = driver.find_elements(By.XPATH, "//td/p[@class='product-name']")
listed_product = []
for product in cart_products:
    listed_product.append(product.text)

assert listed_product == selected_product

print("Listed product ", listed_product)

total_amt = driver.find_element(By.CSS_SELECTOR, ".totAmt")
disc_per = driver.find_element(By.CSS_SELECTOR, ".discountPerc")
disc_amt = driver.find_element(By.CSS_SELECTOR, ".discountAmt")
before_discount_amt = disc_amt.text
print(
    "total amount " + total_amt.text + " discount percentage " + disc_per.text + " discounted amount " + disc_amt.text)
driver.find_element(By.CSS_SELECTOR, ".promoCode").send_keys("rahulshettyacademy")
driver.find_element(By.CSS_SELECTOR, ".promoBtn").click()

wait.until(expected_conditions.visibility_of(driver.find_element(By.CSS_SELECTOR, ".promoInfo")))
print(driver.find_element(By.CSS_SELECTOR, ".promoInfo").text)
assert driver.find_element(By.CSS_SELECTOR, ".promoInfo").text == "Code applied ..!"

total_amt = driver.find_element(By.CSS_SELECTOR, ".totAmt")
disc_per = driver.find_element(By.CSS_SELECTOR, ".discountPerc")
disc_amt = driver.find_element(By.CSS_SELECTOR, ".discountAmt")
final_discount_amt = disc_amt.text

print("****************  After discount **************")
print(
    "total amount " + total_amt.text + " discount percentage " + disc_per.text + " discounted amount " + disc_amt.text)

assert float(final_discount_amt) < int(before_discount_amt)
