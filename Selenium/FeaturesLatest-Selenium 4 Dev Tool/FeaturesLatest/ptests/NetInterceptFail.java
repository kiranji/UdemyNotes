import static org.openqa.selenium.devtools.v91.network.Network.loadingFailed;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v91.network.model.ErrorReason;
import org.openqa.selenium.devtools.v91.fetch.Fetch;
import org.openqa.selenium.devtools.v91.fetch.model.RequestPattern;

import com.google.common.collect.ImmutableList;

import io.github.bonigarcia.wdm.WebDriverManager;

public class NetInterceptFail {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	
		WebDriverManager.chromedriver().setup();
		// Launching browser
        ChromeDriver driver = new ChromeDriver();
       DevTools devTools =  driver.getDevTools();
       
       devTools.createSession();
       driver.get("https://rahulshettyacademy.com/angularAppdemo/");
       Optional<List<RequestPattern>> rpList = Optional.of(Arrays.asList(new RequestPattern(Optional.of("*GetBook*"),Optional.empty(),Optional.empty())));
       
       
       
     devTools.send(Fetch.enable(rpList,Optional.empty()));
     devTools.addListener(Fetch.requestPaused(), request->
     {
    	
     	
     	devTools.send(Fetch.failRequest(request.getRequestId(), ErrorReason.FAILED));
     	
     		
		
	});
     devTools.addListener(loadingFailed(), loadingFailed ->
     {
         System.out.println(loadingFailed.getErrorText());
         System.out.println(loadingFailed.getTimestamp());
        // Assert.assertEquals(loadingFailed.getErrorText(), "net::ERR_INTERNET_DISCONNECTED");
     });
  
     driver.findElement(By.cssSelector("button[routerlink*='library']")).click();
     
     

	}
}
