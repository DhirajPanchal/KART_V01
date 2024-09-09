package io.active.kart.store.controller;

import io.active.kart.base.dto.CategoryDTO;
import io.active.kart.base.dto.ListRequest;
import io.active.kart.base.dto.ListResponse;
import io.active.kart.base.dto.SubCategoryDTO;
import io.active.kart.store.service.InventoryFeignService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static io.active.kart.base.core.BaseConstant.*;

@RestController
@RequestMapping("/api/store")
public class InventoryController {


    private final InventoryFeignService inventoryFeignService;

    public InventoryController(InventoryFeignService inventoryFeignService) {
        this.inventoryFeignService = inventoryFeignService;
    }

    @PostMapping("/category")
    public ResponseEntity<ListResponse<CategoryDTO>> list(@RequestParam(name = PAGE_INDEX, defaultValue = PAGE_INDEX_DEFAULT) int index,
                                                          @RequestParam(name = PAGE_SIZE, defaultValue = PAGE_SIZE_DEFAULT) int size,
                                                          @RequestBody(required = false) ListRequest requestBody) {
        System.out.println(" ______ InventoryController . POST - /categories " + requestBody);
        if (requestBody == null) {
            requestBody = defaultListRequest;
        }
        // Always return Non-Deleted Categories irrespective of request.
        if (requestBody.isIncludeDeleted()) {
            requestBody.setIncludeDeleted(false);
        }

        requestBody.getSort().forEach((key, value) -> System.out.println(key + " :: " + value));
        ListResponse<CategoryDTO> listResponse =
                inventoryFeignService.getCategoryList(index, size, requestBody);


        return ResponseEntity.status(HttpStatus.OK).body(listResponse);

    }

    @PostMapping("/category/{categoryId}/sub-category")
    public ResponseEntity<ListResponse<SubCategoryDTO>> list(@PathVariable Long categoryId,
                                                             @RequestParam(name = PAGE_INDEX, defaultValue = PAGE_INDEX_DEFAULT) int index,
                                                             @RequestParam(name = PAGE_SIZE, defaultValue = PAGE_SIZE_DEFAULT) int size,
                                                             @RequestBody(required = false) ListRequest requestBody) {
        System.out.println(" ______ InventoryController . POST - /sub-categories " + requestBody);
        if (requestBody == null) {
            requestBody = defaultListRequest;
        }
        // Always return Non-Deleted Categories irrespective of request.
        if (requestBody.isIncludeDeleted()) {
            requestBody.setIncludeDeleted(false);
        }

        requestBody.getSort().forEach((key, value) -> System.out.println(key + " :: " + value));

        ListResponse<SubCategoryDTO> listResponse =
                inventoryFeignService.getSubCategoryList(categoryId, index, size, requestBody);


        return ResponseEntity.status(HttpStatus.OK).body(listResponse);

    }

}