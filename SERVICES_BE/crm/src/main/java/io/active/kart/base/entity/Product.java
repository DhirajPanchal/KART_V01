package io.active.kart.base.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product")
public class Product extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sub_category_id")
    private SubCategory subCategory;

    @Column(name = "image")
    private String image;

    public Product(String productName, Category category, SubCategory subCategory) {
        super.setName(productName);
        this.category = category;
        this.subCategory = subCategory;
    }

    @Override
    public String toString() {
        return " Product < " + super.toString() + subCategory + " > ";
    }

}

