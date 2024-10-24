package io.active.kart.base.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Date;

public class BaseDTO {

    private long id;

    @NotBlank
    @Size(min = 3, message = "Category name must contain at least 3 characters")
    private String name;

    private Boolean active;

    private Boolean isDeleted;

    private Date createOn;

    private Date updatedOn;

}
