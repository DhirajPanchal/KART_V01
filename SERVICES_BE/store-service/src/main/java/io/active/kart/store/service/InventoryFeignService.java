package io.active.kart.store.service;

import io.active.kart.base.dto.CategoryDTO;
import io.active.kart.base.dto.ListRequest;
import io.active.kart.base.dto.ListResponse;
import io.active.kart.base.dto.SubCategoryDTO;
import io.active.kart.store.client.InventoryFeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class InventoryFeignService {

    private final InventoryFeignClient inventoryFeignClient;

    public InventoryFeignService(InventoryFeignClient inventoryFeignClient) {
        this.inventoryFeignClient = inventoryFeignClient;
    }


    public ListResponse<CategoryDTO> getCategoryList(int index, int size, ListRequest requestBody) {

        System.out.println("__ InventoryFeignService . getCategoryList : ");

        ResponseEntity<ListResponse<CategoryDTO>> response
                = inventoryFeignClient.list(index, size, requestBody);

        return response.getBody();

    }

    public ListResponse<SubCategoryDTO> getSubCategoryList(Long categoryId, int index, int size, ListRequest requestBody) {

        System.out.println("__ InventoryFeignService . getSubCategoryList : ");

        ResponseEntity<ListResponse<SubCategoryDTO>> response
                = inventoryFeignClient.list(categoryId, index, size, requestBody);

        return response.getBody();

    }

}
