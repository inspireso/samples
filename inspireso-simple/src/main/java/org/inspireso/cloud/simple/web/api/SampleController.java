package org.inspireso.cloud.simple.web.api;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class SampleController {

    @Autowired
    Environment environment;

    @Value("${application.welcome:Welcome}")
    String welcome;

    @Value("${eureka.client.registerWithEureka:false}")
    boolean registerWithEureka;

    @Autowired
    RestTemplate template;

    @PostConstruct
    public void init() {
        System.out.println("registerWithEureka:" + registerWithEureka);
    }

    @ResponseBody
    @RequestMapping(value = "")
    String home() {
        return welcome;
    }

    @ResponseBody
    @RequestMapping(value = "/proxy")
    String hello() {
        return template.getForObject("http://simple.service/", String.class);
    }

    @ResponseBody
    @RequestMapping(value = "/env")
    String env(@RequestParam("key") String key) {
        return environment.getProperty(key);
    }

}
