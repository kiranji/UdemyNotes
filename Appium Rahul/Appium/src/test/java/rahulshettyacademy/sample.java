package rahulshettyacademy;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebElement;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;

import com.google.common.collect.ImmutableMap;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import io.appium.java_client.service.local.AppiumDriverLocalService;
import io.appium.java_client.service.local.AppiumServiceBuilder;

public class sample {

	public AndroidDriver driver;
	public AppiumDriverLocalService service;
	
	@BeforeClass
	public void ConfigureAppium() throws MalformedURLException
	{
		
//		 service = new AppiumServiceBuilder().withAppiumJS(new File("//usr//local//lib//node_modules//appium//build//lib//main.js"))
//				.withIPAddress("127.0.0.1").usingPort(4723).build();
//			service.start();
DesiredCapabilities caps = new DesiredCapabilities();
    	
    	// Set your access credentials
caps.setCapability("browserstack.user", "rahulshetty_bm6tXG");
caps.setCapability("browserstack.key", "avTb7CjxY6Ga6KcsCwJe");
    	
    	// Set URL of the application under test
    	caps.setCapability("app", "bs://971299524f839aa95e852372b6fd465aae139101");
    	
    	// Specify device and os_version for testing
    	caps.setCapability("device", "Google Pixel 3");
    	caps.setCapability("os_version", "9.0");
        
    	// Set other BrowserStack capabilities
    	caps.setCapability("project", "First Java Project");
    	caps.setCapability("build", "browserstack-build-1");
    	caps.setCapability("name", "first_test");
								
//			UiAutomator2Options options = new UiAutomator2Options();
//		//	options.setDeviceName("RahulPhone");
//			options.setChromedriverExecutable("//Users//rahulshetty//documents//chromedriver 11");
//			options.setCapability("app", "bs://11ab7560cd5aadf057f231ed8eb6a63b4eb2fe88");
//			options.setCapability("device", "Google Pixel 3");
//			options.setCapability("os_version", "9.0");
//			options.setCapability("browserstack.user", "rahulshetty_nS1FoC");
//			options.setCapability("browserstack.key", "posWWBstBhozEJ9uwsau");
		//	options.setApp("//Users//rahulshetty//workingcode//Appium//src//test//java//resources//ApiDemos-debug.apk");	
			//options.setApp("//Users//rahulshetty//workingcode//Appium//src//test//java//resources//General-Store.apk");
			
			 driver = new AndroidDriver(new URL("http://hub.browserstack.com"), caps);
			 driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
	}
	
	public void longPressAction(WebElement ele)
	{
		((JavascriptExecutor)driver).executeScript("mobile: longClickGesture",
				ImmutableMap.of("elementId",((RemoteWebElement)ele).getId(),
						"duration",2000));
	}
	
	public void scrollToEndAction()
	{
		boolean canScrollMore;
		do
		{
		 canScrollMore = (Boolean) ((JavascriptExecutor) driver).executeScript("mobile: scrollGesture", ImmutableMap.of(
			    "left", 100, "top", 100, "width", 200, "height", 200,
			    "direction", "down",
			    "percent", 3.0
			    
			));
		}while(canScrollMore);
	}
	
	
	public void swipeAction(WebElement ele,String direction)
	{
		((JavascriptExecutor) driver).executeScript("mobile: swipeGesture", ImmutableMap.of(
				"elementId", ((RemoteWebElement)ele).getId(),
			 
			    "direction", direction,
			    "percent", 0.75
			));
		
		
	}
	
	
	public Double getFormattedAmount(String amount)
	{
		Double price = Double.parseDouble(amount.substring(1));
		return price;
		
	}
	@AfterClass
	public void tearDown()
	{
		driver.quit();
        service.stop();
		}
	
}
