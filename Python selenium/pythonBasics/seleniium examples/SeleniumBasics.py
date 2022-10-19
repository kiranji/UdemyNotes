import time

from select import select
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select

chromeString = "C:\\Users\\kkrid\\Downloads\\chromedriver.exe"
firefoxString = "C:\\Users\\kkrid\\Downloads\\geckodriver.exe"
s = Service(chromeString)
driver = webdriver.Chrome(service=s)
# driver=webdriver.Firefox(service=s)
# driver.get("https://www.google.com/")
# print(driver.title)
# print(driver.current_url)
# driver.maximize_window()
# driver.get("https://chromedriver.chromium.org/downloads")
# driver.refresh()
# driver.back()
# driver.minimize_window()


driver.get("https://rahulshettyacademy.com/angularpractice/")
driver.find_element(By.XPATH, "(//*[@name='name'])[1]").send_keys("Kiranji")
driver.find_element(By.NAME, "email").send_keys("sam@maili")
driver.find_element(By.CSS_SELECTOR, "*[value='Submit']").click()
time.sleep(1)
text = driver.find_element(By.CSS_SELECTOR, "*[class*='alert alert-success']").text

# Assertion

assert "success".lower() in text.lower()

# select class for dropdown
slct = Select(driver.find_element(By.XPATH, "//*[@id='exampleFormControlSelect1']"))
slct.select_by_index(1)

driver.get("http://3.110.88.201/dropdownsPractise/")

auto_suggest_element = driver.find_element(By.CSS_SELECTOR, "#autosuggest")
auto_suggest_element.send_keys("Ind")
time.sleep(2)
list = driver.find_elements(By.CSS_SELECTOR, ".ui-menu-item a");
for i in range(len(list)):
    if list[i].text.lower() == "india":
        list[i].click()
        break

print(driver.find_element(By.CSS_SELECTOR, "#autosuggest").get_attribute("value"))
time.sleep(2)

driver.get("https://rahulshettyacademy.com/AutomationPractice/")
checkboxes = driver.find_elements(By.CSS_SELECTOR, "label input[type='checkbox']")
for check in checkboxes:
    check.click()
    assert check.is_selected()


driver.find_element(By.CSS_SELECTOR,"[name='enter-name']").send_keys("hello")
driver.find_element(By.CSS_SELECTOR,"[value='Alert']").click()
print(driver.switch_to.alert.text)
assert "hello" in driver.switch_to.alert.text
driver.switch_to.alert.dismiss()
driver.quit()
