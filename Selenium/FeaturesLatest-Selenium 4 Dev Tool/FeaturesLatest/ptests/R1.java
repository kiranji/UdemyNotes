import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import org.openqa.selenium.Pdf;
import org.openqa.selenium.PrintsPage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.print.PageSize;
import org.openqa.selenium.print.PrintOptions;

import java.util.Base64;

public class R1 {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub

		System.setProperty("webdriver.chrome.driver", "/Users/rahulshetty/Documents/chromedriver");
		ChromeOptions options = new ChromeOptions();
		options.addArguments("--headless");
		WebDriver driver = new ChromeDriver(options);
		
		
		driver.get("https://rahulshettyacademy.com");
		PrintsPage printer = (PrintsPage) driver;
		
		PrintOptions printOptions = new PrintOptions();
		PageSize p=printOptions.getPageSize();
	    printOptions.setPageRanges("1-2");
	   Pdf pdf=  printer.print(printOptions);
	   String content =pdf.getContent();
	   System.out.println(content);
	   FileOutputStream fos = new FileOutputStream("/users/rahulshetty/Documents/test.pdf");
	   byte[] decoder = Base64.getDecoder().decode(content);
	   fos.write(decoder);
	   fos.close();
	 
	   
	    //mob,geo,throttle,event,request, req fail, css block,performance, log,basiauth,pGELOAD
		
		
		
		
		
	}

}
