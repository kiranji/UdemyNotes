import java.util.Optional;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v85.network.Network;

import com.google.common.collect.ImmutableList;

import io.github.bonigarcia.wdm.WebDriverManager;

public class netwEmul {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		
		WebDriverManager.chromedriver().setup();
		// Launching browser
        ChromeDriver driver = new ChromeDriver();
       DevTools devTools =  driver.getDevTools();
       
       devTools.createSession();
       devTools.send(Network.enable(Optional.empty(), Optional.empty(), Optional.empty()));
       
       devTools.send(Network.setBlockedURLs(ImmutableList.of("*.css","*GetBook*")));
       driver.get("http://localhost:4200/");
       driver.findElement(By.cssSelector("button[routerlink*='library']")).click();
       
       
       
       
       
        
        
	}

}
