import java.util.Optional;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v91.network.Network;
import org.openqa.selenium.devtools.v91.network.model.ConnectionType;
import com.google.common.collect.ImmutableList;
import static org.openqa.selenium.devtools.v91.network.Network.loadingFailed;

import io.github.bonigarcia.wdm.WebDriverManager;

public class offlinethrottle {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		
		WebDriverManager.chromedriver().setup();
		// Launching browser
        ChromeDriver driver = new ChromeDriver();
       DevTools devTools =  driver.getDevTools();
       
       devTools.createSession();
       devTools.send(Network.enable(Optional.empty(), Optional.empty(), Optional.empty()));
       
       devTools.send(
               Network.emulateNetworkConditions(true, 2000, 200000, 100000, Optional.of(ConnectionType.ETHERNET)));
       
       devTools.addListener(loadingFailed(), loadingFailed ->
       {
           System.out.println(loadingFailed.getErrorText());
           System.out.println(loadingFailed.getTimestamp());
          // Assert.assertEquals(loadingFailed.getErrorText(), "net::ERR_INTERNET_DISCONNECTED");
       });

       long startTime = System.currentTimeMillis();
       driver.get("https://rahulshettyacademy.com/angularAppdemo/");
       driver.findElement(By.cssSelector("button[routerlink*='library']")).click();
       long endTime = System.currentTimeMillis();
       System.out.println("page loaded in " + (endTime - startTime));
       driver.close();
       
       
       
       
       
       
       
       
        
        
	}

}
