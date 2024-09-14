package io.active.kart.base.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "order_detail")
public class Order extends BaseEntity {

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<OrderItem> items = new ArrayList<>();

    @Column(name = "customer_uuid")
    private String customerUuid;

    @Column(name = "billed")
    private Double billed;

    @Column(name = "doc_trigger", columnDefinition="tinyint(1) default 0")
    private Boolean isDocTrigger;

    @Column(name = "doc_gen", columnDefinition="tinyint(1) default 0")
    private Boolean isDocGen;

    @Override
    public String toString() {
        return "Order { " +
                "C=" + customerUuid +
                ", B=" + billed +
                ", items ["+items.size()+"] : " + items +
                " } ";
    }
}