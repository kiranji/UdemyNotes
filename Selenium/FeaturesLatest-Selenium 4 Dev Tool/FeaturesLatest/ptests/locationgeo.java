import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v91.emulation.Emulation;
import org.openqa.selenium.support.ui.WebDriverWait;


public class locationgeo {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		
		System.setProperty("webdriver.chrome.driver", "/Users/rahulshetty/Documents/chromedriver");
		ChromeOptions options = new ChromeOptions();
	
		ChromeDriver driver = new ChromeDriver();
		DevTools devTools =  driver.getDevTools();
	       
	       devTools.createSession();
	       Number a = 17; // Foat
	       Number b = 78; // Double
	       Number c = 1; // Double
	      // devTools.send(Emulation.setGeolocationOverride(Optional.of(a), Optional.of(a), Optional.of(c)));
		
		
		  Map coordinates = new HashMap()
		  {{
			  // 17 , 78  --  40 3madrid
		      put("latitude", 17);
		      put("longitude", 78);
		      put("accuracy", 1);
		  }};    
		  
		 driver.executeCdpCommand("Emulation.setGeolocationOverride", coordinates);
		  driver.get("https://google.com");
		  driver.findElement(By.name("q")).sendKeys("netflix",Keys.ENTER);
		  //driver.findElement(By.name("q")).sendKeys(Keys.ENTER);
		  driver.findElements(By.cssSelector(".LC20lb")).get(0).click();
		 System.out.println( driver.findElement(By.cssSelector(".our-story-card-title")).getText());
		  
		  
		  

}
	
}
