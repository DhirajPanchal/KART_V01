package io.active.kart.base.init;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.Map;

@Configuration
public class EndpointsListener implements ApplicationListener<ContextRefreshedEvent> {
    private final Logger LOGGER = LoggerFactory.getLogger("EndpointsListener.class");

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

//        LOGGER.info("========================================================= onApplicationEvent");
//        System.out.println("************************************************************");
//        System.out.println("*****");
//        System.out.println("***** EndpointsListener");
//        System.out.println("*****");
//        System.out.println("************************************************************");
//
//        ApplicationContext applicationContext = event.getApplicationContext();
//        RequestMappingHandlerMapping requestMappingHandlerMapping = applicationContext
//                .getBean("requestMappingHandlerMapping", RequestMappingHandlerMapping.class);
//        Map<RequestMappingInfo, HandlerMethod> map = requestMappingHandlerMapping.getHandlerMethods();
//        map.forEach((key, value) -> LOGGER.info("{} ----------------------- {}", key, value));
    }
}