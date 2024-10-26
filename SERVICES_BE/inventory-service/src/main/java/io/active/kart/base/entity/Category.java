package io.active.kart.base.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "category")
@EqualsAndHashCode(callSuper = true)
public class Category extends BaseEntity {

    @Override
    public String toString() {
        return "Category < " + super.toString() + " > ";
    }



}
