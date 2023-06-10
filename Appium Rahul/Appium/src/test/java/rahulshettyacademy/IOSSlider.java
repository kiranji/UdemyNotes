package rahulshettyacademy;

import java.util.HashMap;
import java.util.Map;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebElement;
import org.testng.Assert;
import org.testng.annotations.Test;

import io.appium.java_client.AppiumBy;

public class IOSSlider extends IOSBaseTest{

	
	@Test
	public void IOSSliderTest() throws InterruptedException
	{
		
	WebElement slider =	driver.findElement(AppiumBy.iOSClassChain("**/XCUIElementTypeSlider[`label == 'AppElem'`]"));	
	slider.sendKeys("0%"); //setValue
	Assert.assertEquals("0%", slider.getAttribute("value"));
	slider.sendKeys("1%");	
	Assert.assertEquals("100%", slider.getAttribute("value"));
	
		
	}
}
