package io.active.kart.base.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@MappedSuperclass
public abstract class BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @NotBlank
    @Column(name = "name")
    private String name;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Column(name = "created_on")
    private Date createOn;

    @Column(name = "updated_on")
    private Date updatedOn;

}
