package io.active.kart.crm.function;

import io.active.kart.base.dto.OrderDTO;
import io.active.kart.base.entity.Order;
import io.active.kart.crm.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.util.function.Function;

public class GetOrder implements Function<Long, OrderDTO> {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public OrderDTO apply(Long id) {

        System.out.println(" __ GetOrder Function : " + id);

        Optional<Order> order = orderRepository.findById(id);

        System.out.println(order);

        if (order.isPresent()) {
            System.out.println(order.get().toString());

            return new OrderDTO(order.get());
        } else {
            System.out.println("Order Not Found ID : " + id);
        }

        return new OrderDTO();
    }

}