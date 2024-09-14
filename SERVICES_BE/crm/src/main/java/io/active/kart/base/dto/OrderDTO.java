package io.active.kart.base.dto;

import io.active.kart.base.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private Long id;

    private String customerUuid;

    private String name;

    private Double billed;

    private Boolean isDocTrigger;

    private Boolean isDocGen;

    private List<OrderItemDTO> items;

    public OrderDTO(Order order) {
        this.id = order.getId();
        this.customerUuid = order.getCustomerUuid();
        this.name = order.getName();
        this.billed = order.getBilled();
        this.isDocTrigger = order.getIsDocTrigger();
        this.isDocGen = order.getIsDocGen();
        items = order.getItems().stream().map(OrderItemDTO::new).collect(Collectors.toList());
    }

    public OrderDTO(String customer) {
        this.customerUuid = customer;
    }
}
