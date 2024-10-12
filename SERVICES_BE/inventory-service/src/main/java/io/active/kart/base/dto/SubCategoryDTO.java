package io.active.kart.base.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubCategoryDTO {

    private long id;

    @NotBlank
    @Size(min = 3, message = "SubCategory name must contain at least 3 characters")
    private String name;

    private CategoryDTO category;

    private Boolean isDeleted;


}
