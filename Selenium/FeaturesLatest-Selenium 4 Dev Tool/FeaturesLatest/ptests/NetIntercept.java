import java.util.Optional;

import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v85.fetch.model.RequestStage;
import org.openqa.selenium.devtools.v85.network.model.ResourceType;
import org.openqa.selenium.devtools.v91.fetch.Fetch;
import org.openqa.selenium.devtools.v91.network.Network;
import org.openqa.selenium.devtools.v91.network.model.ConnectionType;
import org.openqa.selenium.devtools.v91.network.model.InterceptionStage;
import org.openqa.selenium.devtools.v91.network.model.RequestPattern;

import com.google.common.collect.ImmutableList;

import io.github.bonigarcia.wdm.WebDriverManager;

public class NetIntercept {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	
		WebDriverManager.chromedriver().setup();
		// Launching browser
        ChromeDriver driver = new ChromeDriver();
       DevTools devTools =  driver.getDevTools();
       
       devTools.createSession();
       devTools.addListener(Fetch.requestPaused(), request->
       {
      	 String mockedUrl;
       	if(request.getRequest().getUrl().contains("shetty"))
       		{
       		System.out.println("I went inside");
         	  mockedUrl =	request.getRequest().getUrl().replace("=shetty", "=BadGuy");
         	System.out.println(mockedUrl);
         	  
       		    
       	
       	devTools.send(Fetch.continueRequest(request.getRequestId(),Optional.of(mockedUrl),Optional.of(request.getRequest().getMethod())
       			, request.getRequest().getPostData(), Optional.empty()));
       	
       		}
       	else {
       		devTools.send(Fetch.continueRequest(request.getRequestId(),Optional.of(request.getRequest().getUrl()),Optional.of(request.getRequest().getMethod())
           			, request.getRequest().getPostData(), Optional.empty()));
       		
       	}
  		
  	});
       driver.get("https://rahulshettyacademy.com/angularAppdemo/");
            
     devTools.send(Fetch.enable(Optional.empty(),Optional.empty()));
     
     
    
  
     driver.findElement(By.cssSelector("button[routerlink*='library']")).click();
     
     

	}
}
