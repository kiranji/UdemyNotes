import java.util.List;
import java.util.Optional;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v91.performance.Performance;
import org.openqa.selenium.devtools.v91.performance.model.Metric;
import org.openqa.selenium.json.Json;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.github.bonigarcia.wdm.WebDriverManager;

public class PerformanceMetric {

	public static void main(String[] args) throws JsonProcessingException {
		// TODO Auto-generated method stub

		
		WebDriverManager.chromedriver().setup();
		// Launching browser
        ChromeDriver driver = new ChromeDriver();
       DevTools devTools =  driver.getDevTools();
       ObjectMapper mapper = new ObjectMapper();

       
       devTools.createSession();
       devTools.send(Performance.enable(Optional.empty()));
       driver.get("https://rahulshettyacademy.com");
       List<Metric> metrics = devTools.send(Performance.getMetrics());
       for (Metric metric : metrics) {
           
    	      String jsonStr = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(metric);

    	      MetricPojo perf = mapper.readValue(jsonStr, MetricPojo.class);
    	      System.out.println(perf.getName());
    	      System.out.println(perf.getValue());
    	      

       }
       
       

       
       
       
	}

}
