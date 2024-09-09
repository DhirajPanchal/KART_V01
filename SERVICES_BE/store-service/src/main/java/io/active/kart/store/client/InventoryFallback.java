package io.active.kart.store.client;

import io.active.kart.base.dto.CategoryDTO;
import io.active.kart.base.dto.ListRequest;
import io.active.kart.base.dto.ListResponse;
import io.active.kart.base.dto.SubCategoryDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class InventoryFallback implements InventoryFeignClient {
    @Override
    public ResponseEntity<ListResponse<CategoryDTO>> list(int index, int size, ListRequest requestBody) {
        return null;
    }

    @Override
    public ResponseEntity<ListResponse<SubCategoryDTO>> list(Long categoryId, int index, int size, ListRequest requestBody) {
        return null;
    }
}
