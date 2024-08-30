
![N|Solid](https://raw.githubusercontent.com/DhirajPanchal/KART_V01_CONFIG/main/cart_01.png) 
# _active_ KART v01
Prototypal for online store and back operations application.
Backend :: Springboot based Microservices.
Frontend :: React & Angular based Microfrontend.

[![N|Solid](https://raw.githubusercontent.com/DhirajPanchal/KART_V01_CONFIG/main/DP_02.png)](https://www.linkedin.com/in/dhirajpanchal)
```sh
dhiraj.r.panchal@gmail.com
```
```sh
https://www.linkedin.com/in/dhirajpanchal
```

# Release : R03 | Branch : gateway

| Service | Desc / Features / References  |
| ------ | ------ |
| config-service | [Spring Cloud Config Server][PlDb] |
| eureka-server | [Spring Cloud Netflix Eureka][PlOd] |
|  | [Spring Cloud OpenFeign][PlAa] |
| gateway-server | [Spring Cloud Gateway][PlAb] |
| inventory-service | Business: Operations |
| store-service | Business: Public |
| RabbitMQ (A) | For config push - Refresh/BusRefresh/Monitor|
| SQL (A)  |  Local (schema: active_kart) |
| SQL (B) |  Dockerized (service: kart_db_mysql) |

> Note: `Check proper branch. Not all branches have all the services.`

   [PlDb]: <https://spring.io/projects/spring-cloud-config>
   [PlOd]: <https://spring.io/projects/spring-cloud-netflix>
   [PlAa]: <https://spring.io/projects/spring-cloud-openfeign>
   [PlAb]: <https://spring.io/projects/spring-cloud-gateway>
   [PlAc]: <https://www.linkedin.com/in/dhirajpanchal>
   [PlAd]: <mailto:dhiraj.r.panchal@gmail.com>
