# _`KART v01`_

### _Backend   ::  Springboot base Microservices._
### _Frontend ::  React & Angular based Microfrontend_

## _Release R02_
### _Branch_ : service_discovery_registration

| Service | Desc / Features / References  |
| ------ | ------ |
| config-service | [Spring Cloud Config Server][PlDb] |
| eureka-server | [Spring Cloud Netflix Eureka][PlOd] |
|  | [Spring Cloud OpenFeign][PlAa] |
| inventory-service | Business: Operations |
| store-service | Business: Public |
| RabbitMQ (A) | For config push - Refresh/BusRefresh/Monitor|
| SQL (A)  |  Local (schema: active_kart) |
| SQL (B) |  Dockerized (service: kart_db_mysql) |

> Note: `Check proper branch. Not all branches have all the services.`


   [PlDb]: <https://spring.io/projects/spring-cloud-config>
   [PlOd]: <https://spring.io/projects/spring-cloud-netflix>
   [PlAa]: <https://spring.io/projects/spring-cloud-openfeign>
