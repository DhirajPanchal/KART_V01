
![N|Solid](https://raw.githubusercontent.com/DhirajPanchal/KART_V01_CONFIG/main/active-cart-01.jpg) 

### Prototypal for online store and back operations application.
#### Backend :: Springboot based Microservices.
#### Frontend :: React & Angular based Microfrontend.


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

Maintained by:

[![N|Solid](https://raw.githubusercontent.com/DhirajPanchal/KART_V01_CONFIG/main/DP_02.png)](https://www.linkedin.com/in/dhirajpanchal)

email: dhiraj.r.panchal@gmail.com

linkedin: https://www.linkedin.com/in/dhirajpanchal




   [PlDb]: <https://spring.io/projects/spring-cloud-config>
   [PlOd]: <https://spring.io/projects/spring-cloud-netflix>
   [PlAa]: <https://spring.io/projects/spring-cloud-openfeign>
   [PlAb]: <https://spring.io/projects/spring-cloud-gateway>
   [PlAc]: <https://www.linkedin.com/in/dhirajpanchal>
   [PlAd]: <mailto:dhiraj.r.panchal@gmail.com>
