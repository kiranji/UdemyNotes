import org.openqa.selenium.By;
import org.openqa.selenium.PageLoadStrategy;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import io.github.bonigarcia.wdm.WebDriverManager;

public class pageLoad {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		WebDriverManager.chromedriver().setup();
		ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.setPageLoadStrategy(PageLoadStrategy.NONE);
        WebDriver driver = new ChromeDriver(chromeOptions);
        long startTime = System.currentTimeMillis();
        driver.get("https://rahulshettyacademy.com");
        long endTime = System.currentTimeMillis();
        System.out.println("page loaded in " + (endTime - startTime));
        driver.close();
        
        
		
		
	}

}
