package io.active.kart.dms.function;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.function.Function;

@Configuration
public class DmsFunction {


    @Bean
    public Function<String, String> processDocGen() {
        return orderDetail -> {
            System.out.println(" ***  D M S  - processDocGen() : " + orderDetail);

            String[] array = orderDetail.split("_");


            return ("#" + array[array.length - 1]);
        };
    }

}