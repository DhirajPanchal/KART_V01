package io.active.kart.base.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private long id;

    @NotBlank
    @Size(min = 3, message = "Category name must contain at least 3 characters")
    private String name;

    private Boolean active;

    private Boolean isDeleted;

    private Date createdOn;

    private Date updatedOn;

    private SubCategoryDTO subCategory;

}
