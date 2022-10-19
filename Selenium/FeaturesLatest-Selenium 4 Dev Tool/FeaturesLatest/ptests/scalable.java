import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v85.emulation.Emulation;
import org.openqa.selenium.devtools.v85.network.Network;
import org.openqa.selenium.devtools.v85.security.Security;

public class scalable {

	public static void main(String[] args) throws InterruptedException {
		// TODO Auto-generated method stub

		
		System.setProperty("webdriver.chrome.driver", "/Users/rahulshetty/Documents/chromedriver");
		ChromeOptions options = new ChromeOptions();
	
		ChromeDriver driver = new ChromeDriver(options);
	
		DevTools devTools =  driver.getDevTools();
	       
	       devTools.createSession();
	       devTools.send(Security.enable());
	       devTools.send(Security.setIgnoreCertificateErrors(true));
	       
	       devTools.send(Network.clearBrowserCache());
	     //  devTools.send(Emulation.setDeviceMetricsOverride(600, 1000, 50, true, Optional.empty(), Optional.empty(), Optional.empty(), Optional.empty(), Optional.empty(), Optional.empty(), Optional.empty(), Optional.empty()));
	       Map deviceMetrics = new HashMap()
	       {{  
	           put("width", 600);
	           put("height", 1000);
	           put("mobile", true);
	           put("deviceScaleFactor", 50);
	       }};
	       
	       driver.executeCdpCommand("Emulation.setDeviceMetricsOverride", deviceMetrics);

	       
	       driver.get("https://rahulshettyacademy.com/angularAppdemo/");
	       driver.findElement(By.cssSelector(".navbar-toggler-icon")).click();
	       Thread.sleep(2000);
	      
	       driver.findElement(By.linkText("Library")).click();
	       
		
		
		//driver.manage().window().fullscreen();
	//	driver.manage().window().setSize(new Dimension(375, 812));
	//
		//driver.manage().window().fullscreen();
		
		


	}

}
