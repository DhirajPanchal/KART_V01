package io.active.kart.inventory.controller;


import io.active.kart.base.core.BaseController;
import io.active.kart.base.dto.ListRequest;
import io.active.kart.base.dto.ListResponse;
import io.active.kart.base.dto.SubCategoryDTO;
import io.active.kart.base.entity.SubCategory;
import io.active.kart.inventory.repository.SubCategoryRepository;
import io.active.kart.inventory.service.SubCategoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static io.active.kart.base.core.BaseConstant.*;


@RestController
@RequestMapping("/api/inventory/category/{categoryId}/subcategory")
public class SubCategoryController extends BaseController<SubCategory, SubCategoryDTO, SubCategoryRepository, SubCategoryService> {

    public SubCategoryController(SubCategoryService service) {
        super(service);
    }

    @PostMapping
    public ResponseEntity<SubCategoryDTO> post(@PathVariable Long categoryId, @Valid @RequestBody SubCategoryDTO dto) {

        System.out.println("__ SubCategoryController . POST : " + categoryId + " , " + dto);

        SubCategoryDTO savedDto = service.post(categoryId, dto);

        return new ResponseEntity<>(savedDto, HttpStatus.CREATED);

    }


    @PutMapping("/{subCategoryId}")
    public ResponseEntity<SubCategoryDTO> put(@PathVariable Long categoryId, @PathVariable Long subCategoryId,  @Valid @RequestBody SubCategoryDTO dto) {

        System.out.println("__ SubCategoryController . PUT ******************** : " + categoryId + " , " + dto);

        SubCategoryDTO savedDto = service.put(categoryId, subCategoryId,  dto);

        return new ResponseEntity<>(savedDto, HttpStatus.CREATED);

    }

    @PostMapping("/list")
    public ResponseEntity<ListResponse<SubCategoryDTO>> list(@PathVariable Long categoryId,
                                                             @RequestParam(name = PAGE_INDEX, defaultValue = PAGE_INDEX_DEFAULT) int index,
                                                             @RequestParam(name = PAGE_SIZE, defaultValue = PAGE_SIZE_DEFAULT) int size,
                                                             @RequestBody(required = false) ListRequest requestBody) {

        System.out.println(" ______ SubCategoryController . POST - LIST : " + categoryId + " - " + requestBody);

        if (requestBody == null) {
            requestBody = defaultListRequest;
        }

        requestBody.getSort().forEach((key, value) -> System.out.println(key + " :: " + value));

        ListResponse<SubCategoryDTO> listResponse = service.list(categoryId, index, size, requestBody);

        return new ResponseEntity<>(listResponse, HttpStatus.OK);

    }


}
