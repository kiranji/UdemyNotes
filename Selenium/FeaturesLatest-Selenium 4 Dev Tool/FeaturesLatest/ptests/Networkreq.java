import java.util.Optional;

import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v91.fetch.model.RequestPattern;
import org.openqa.selenium.devtools.v91.network.Network;

import io.github.bonigarcia.wdm.WebDriverManager;

public class Networkreq {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		
		WebDriverManager.chromedriver().setup();
		// Launching browser
        ChromeDriver driver = new ChromeDriver();
       DevTools devTools =  driver.getDevTools();
       
       devTools.createSession();
       devTools.send(Network.enable(Optional.empty(), Optional.empty(), Optional.empty()));
     
       devTools.addListener(Network.requestWillBeSent(),
               entry -> {
            	   
                   System.out.println("Request URI : " + entry.getRequest().getUrl()+"\n"
                   + " With method : "+entry.getRequest().getMethod() + "\n");
                   entry.getRequest().getMethod();
                   
                   System.out.println(entry.getRequestId());
               });
       devTools.addListener(Network.responseReceived(),
               entry -> {
            	   
                   System.out.println("Request URI : " + entry.getResponse().getUrl()+"\n"
                   + " With method : "+entry.getResponse().getStatus() + "\n");
                  
                   
                   System.out.println(entry.getRequestId());
               });
       
       long startTime = System.currentTimeMillis();
       driver.get("https://rahulshettyacademy.com/angularAppdemo/");
       driver.findElement(By.cssSelector("button[routerlink*='library']")).click();
       long endTime = System.currentTimeMillis();
       System.out.println("page loaded in " + (endTime - startTime));
    
       //body
       
       
	}

}
