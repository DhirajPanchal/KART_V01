package io.active.kart.base.init;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.Map;

@Configuration
public class AnnotationDrivenEndpointsListener {
    private final Logger LOGGER = LoggerFactory.getLogger("AnnotationDrivenEndpointsListener.class");

    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) {

        System.out.println("***********************************************************************************************");
        System.out.println("* END POINTs ");
        System.out.println("***********************************************************************************************");

        ApplicationContext applicationContext = event.getApplicationContext();
        RequestMappingHandlerMapping requestMappingHandlerMapping = applicationContext
                .getBean("requestMappingHandlerMapping", RequestMappingHandlerMapping.class);
        Map<RequestMappingInfo, HandlerMethod> map = requestMappingHandlerMapping.getHandlerMethods();
        map.forEach((key, value) -> System.out.printf("%-100s %s%n", key + " :: ", value) );
        System.out.println("***********************************************************************************************|");
    }
}