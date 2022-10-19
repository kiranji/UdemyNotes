from selenium.webdriver.chrome import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By


chromeString = "C:\\Users\\kkrid\\Downloads\\chromedriver.exe"
firefoxString = "C:\\Users\\kkrid\\Downloads\\geckodriver.exe"
s = Service(chromeString)
driver = webdriver.Chrome(service=s)

driver.get("https://rahulshettyacademy.com/angularpractice/")
driver.find_element(By.XPATH, "(//*[@name='name'])[1]").send_keys("Kiranji")
driver.find_element(By.NAME, "email").send_keys("sam@maili")
driver.find_element(By.CSS_SELECTOR, "*[value='Submit']").click()
time.sleep(3)
text = driver.find_element(By.CSS_SELECTOR, "*[class*='alert alert-success']").text
#print(text)
