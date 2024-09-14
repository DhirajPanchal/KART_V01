package io.active.kart.crm.function;

import io.active.kart.base.dto.OrderDTO;
import io.active.kart.base.entity.Order;
import io.active.kart.base.entity.OrderItem;
import io.active.kart.base.entity.Product;
import io.active.kart.crm.repository.OrderItemRepository;
import io.active.kart.crm.repository.OrderRepository;
import io.active.kart.crm.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.function.StreamBridge;

import java.util.Optional;
import java.util.function.Function;

@AllArgsConstructor
public class CreateOrder implements Function<OrderDTO, Long> {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;


    private final StreamBridge streamBridge;

    @Override
    public Long apply(OrderDTO orderDTO) {

        System.out.println(" __ CreateOrder Function : ");
        System.out.println(orderDTO);

        if (orderDTO != null) {

            Order order = new Order();
            order.setCustomerUuid(orderDTO.getCustomerUuid());
            order.setBilled(orderDTO.getBilled());
            order.setIsDocTrigger(true);
            if (orderDTO.getName() != null && !orderDTO.getName().isBlank()) {
                order.setName(orderDTO.getName());
            } else {
                order.setName("P");
            }
            Order savedOrder = orderRepository.save(order);

            orderDTO.getItems().forEach((itemDTO) -> {
                OrderItem item = new OrderItem();
                item.setBilled(itemDTO.getBilled());
                item.setQuantity(itemDTO.getQuantity());
                Optional<Product> productOptional = productRepository.findById(itemDTO.getProductId());
                productOptional.ifPresent(item::setProduct);
                item.setName("P");
                item.setOrder(savedOrder);
                orderItemRepository.save(item);
            });


            System.out.println("Trigger Doc **************************************************** A ");
            var result = streamBridge.send("docGeneration-out-0", ("MSG_GEN-DOC_ORDER-ID_" + savedOrder.getId()));
            System.out.println("Trigger Doc **************************************************** B : " + result);
            System.out.println("Trigger Doc **************************************************** C ");

        }


        return 0L;

    }

}