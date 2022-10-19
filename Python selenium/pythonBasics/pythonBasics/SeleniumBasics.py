from selenium import webdriver
from selenium.webdriver.chrome.service import Service
chromeString="C:\\Users\\kkrid\\Downloads\\chromedriver.exe"
firefoxString="C:\\Users\\kkrid\\Downloads\\geckodriver.exe"
s=Service(chromeString)
driver=webdriver.Chrome(service=s)
#driver=webdriver.Firefox(service=s)
driver.get("https://www.google.com/")
print(driver.title)
print(driver.current_url)

driver.maximize_window()

driver.get("https://chromedriver.chromium.org/downloads")
driver.refresh()
driver.back()
driver.minimize_window()
driver.quit()