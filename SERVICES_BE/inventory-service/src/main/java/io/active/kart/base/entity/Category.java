package io.active.kart.base.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "category")
public class Category extends BaseEntity {

    @Override
    public String toString() {
        return "Category < " + super.toString() + " > ";
    }

}
