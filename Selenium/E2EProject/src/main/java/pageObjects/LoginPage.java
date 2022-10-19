package pageObjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
//rahulonlinetutor@gmail.com
public class LoginPage {

	
	public WebDriver driver;
	
	private By email=By.cssSelector("[id='user_email']");
	private By password=By.cssSelector("[type='password']");
	private By login=By.cssSelector("[value='Log In']");
	private By forgotPassword = By.cssSelector("[href*='password/new']");
	
	
	
	
	public LoginPage(WebDriver driver) {
		// TODO Auto-generated constructor stub
		
		this.driver=driver;
		
	}



public ForgotPassword forgotPassword()
{
	driver.findElement(forgotPassword).click();
	return new ForgotPassword(driver);
	
}
	public WebElement getEmail()
	{
		return driver.findElement(email);
	}
	

	public WebElement getPassword()
	{
		return driver.findElement(password);
	}
	
	public WebElement getLogin()
	{
		return driver.findElement(login);
	}
	
	
	
}
