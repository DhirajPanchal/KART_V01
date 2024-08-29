package io.active.kart.store.client;

import io.active.kart.base.dto.CategoryDTO;
import io.active.kart.base.dto.ListRequest;
import io.active.kart.base.dto.ListResponse;
import io.active.kart.base.dto.SubCategoryDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import static io.active.kart.base.core.BaseConstant.*;
import static io.active.kart.base.core.BaseConstant.PAGE_SIZE_DEFAULT;

@FeignClient("inventory-service")
public interface InventoryFeignClient {

    @PostMapping("/api/inventory/category/list")
    public ResponseEntity<ListResponse<CategoryDTO>> list(@RequestParam(name = PAGE_INDEX, defaultValue = PAGE_INDEX_DEFAULT) int index,
                                                          @RequestParam(name = PAGE_SIZE, defaultValue = PAGE_SIZE_DEFAULT) int size,
                                                          @RequestBody(required = false) ListRequest requestBody);


    @PostMapping("/api/inventory/category/{categoryId}/subcategory/list")
    public ResponseEntity<ListResponse<SubCategoryDTO>> list(@PathVariable Long categoryId,
                                                             @RequestParam(name = PAGE_INDEX, defaultValue = PAGE_INDEX_DEFAULT) int index,
                                                             @RequestParam(name = PAGE_SIZE, defaultValue = PAGE_SIZE_DEFAULT) int size,
                                                             @RequestBody(required = false) ListRequest requestBody);
}
