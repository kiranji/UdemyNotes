import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Stream;

import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.devtools.DevTools;

import org.openqa.selenium.logging.LogEntries;
import org.openqa.selenium.logging.LogEntry;
import org.openqa.selenium.logging.LogType;

import io.github.bonigarcia.wdm.WebDriverManager;



public class consoleLogEvent {

	public static void main(String[] args) throws InterruptedException {
		// TODO Auto-generated method stub
		WebDriverManager.chromedriver().setup();
		// Launching browser
		   ChromeDriver driver = new ChromeDriver();
		   
//	       DevTools devTools =  driver.getDevTools();
//	       devTools.createSession();
//	       devTools.send(Log.enable());
//	       devTools.addListener(Log.entryAdded(), logEntry ->{
//	    	   System.out.println("log: "+logEntry.getText());
//               System.out.println("level: "+logEntry.getLevel());
//	    	   
//	       });
	       
        
        driver.get("https://rahulshettyacademy.com/angularAppdemo/");
        driver.findElement(By.linkText("Browse Products")).click();
	    driver.findElement(By.partialLinkText("Selenium")).click();
	    driver.findElement(By.cssSelector(".add-to-cart")).click();
	    driver.findElement(By.linkText("Cart")).click();
	    driver.findElement(By.id("exampleInputEmail1")).clear();
	    driver.findElement(By.id("exampleInputEmail1")).sendKeys("2");
        // Mentioning type of Log 
//        
        // Retrieving all log 
	    LogEntries entry = driver.manage().logs().get(LogType.BROWSER);
        List<org.openqa.selenium.logging.LogEntry> logs= entry.getAll();
        // Print one by one
        for(LogEntry e: logs)
        {
        System.out.println("Message is: " +e.getMessage());
    	System.out.println("Level is: " +e.getLevel());
        }
        
//       
//       
       //page load strategy
        //clour
        //device portal
        //css block
        //throttle
        //geo location
        //print
        //grid
        //consolelog
        //base auth
        //4 videos
        //performancec  - friday
        //stub response
        //stop response
  
       
	}
 

}
