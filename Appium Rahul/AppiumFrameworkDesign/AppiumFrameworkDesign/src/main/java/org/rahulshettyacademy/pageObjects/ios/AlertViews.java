package org.rahulshettyacademy.pageObjects.ios;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.rahulshettyacademy.utils.IOSActions;

import io.appium.java_client.AppiumBy;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.ios.IOSDriver;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;
import io.appium.java_client.pagefactory.iOSXCUITFindBy;

public class AlertViews extends IOSActions{

	
	IOSDriver driver;

	//GrandParent(AppiumUtils) -> IOSActions -> AlertViews
	public AlertViews(IOSDriver driver)
	{
		super(driver);
		this.driver =driver;
		PageFactory.initElements(new AppiumFieldDecorator(driver), this); //
		
	}
	//driver.findElement(AppiumBy.iOSClassChain("**/XCUIElementTypeStaticText[`label =='Text Entry'`]")).click();
	@iOSXCUITFindBy(iOSClassChain="**/XCUIElementTypeStaticText[`label =='Text Entry'`]")
	private WebElement textEntryMenu;
	
	//driver.findElement(AppiumBy.iOSNsPredicateString("type == 'XCUIElementTypeStaticText' AND value BEGINSWITH[c] 'Confirm'")).click();
	@iOSXCUITFindBy(iOSNsPredicate="type == 'XCUIElementTypeStaticText' AND value BEGINSWITH[c] 'Confirm'")
	private WebElement confirmMenuItem;
	
	 @iOSXCUITFindBy(iOSClassChain = "**/XCUIElementTypeCell")
	    private WebElement textBox;

	   @iOSXCUITFindBy(accessibility = "OK")
	   private WebElement acceptPopUp;
	
	   @iOSXCUITFindBy(iOSNsPredicate = "name BEGINSWITH[c] 'A message'")
	    private WebElement confirmMessage;

	    @iOSXCUITFindBy(iOSNsPredicate = "label == 'Confirm'")
	    private WebElement submit;
	    
	    
	    public void fillTextLabel(String name)
	    {
	    	
	    	textEntryMenu.click();
	    	textBox.sendKeys(name);
	    	acceptPopUp.click();
	    		
	    }
	    
	    public String getConfirmMessage()
	    {
	    	confirmMenuItem.click();
	    	return confirmMessage.getText();
	    }
	    
	    

	
	
	
	
}
