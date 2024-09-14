package io.active.kart.base.dto;

import io.active.kart.base.entity.OrderItem;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OrderItemDTO {

    private Long id;

    private String product;

    private Long productId;

    private Long quantity;

    private Double billed;

    public OrderItemDTO(OrderItem orderItem) {
        this.id = orderItem.getId();
        if (orderItem.getProduct() != null) {
            this.product = orderItem.getProduct().getName();
            this.productId = orderItem.getProduct().getId();
        }
        this.quantity = orderItem.getQuantity();
        this.billed = orderItem.getBilled();
    }
}
