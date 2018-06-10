package com.hj.phiau;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;

/**
 * @author zhenbiao.cai
 * @date 2018/6/10 12:19
 */
@SpringBootApplication
@EnableCaching
public class App {

    @Bean
    public EmbeddedServletContainerCustomizer containerCustomizer(){
        return container -> {
            container.setSessionTimeout(1800);//单位为S
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
