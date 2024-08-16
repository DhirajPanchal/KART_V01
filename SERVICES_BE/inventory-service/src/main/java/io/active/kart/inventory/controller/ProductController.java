package io.active.kart.inventory.controller;


import io.active.kart.base.core.BaseController;
import io.active.kart.base.dto.ListRequest;
import io.active.kart.base.dto.ListResponse;
import io.active.kart.base.dto.ProductDTO;
import io.active.kart.base.entity.Product;
import io.active.kart.inventory.repository.ProductRepository;
import io.active.kart.inventory.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static io.active.kart.base.core.BaseConstant.*;


@RestController
@RequestMapping("/api/inventory/category/{categoryId}/subcategory/{subCategoryId}/product")
public class ProductController
        extends BaseController<Product, ProductDTO, ProductRepository, ProductService> {


    public ProductController(ProductService service) {
        super(service);
    }


    @PostMapping
    public ResponseEntity<ProductDTO> post(
            @PathVariable Long categoryId,
            @PathVariable Long subCategoryId,
            @Valid @RequestBody ProductDTO dto) {

        System.out.println("__ ProductController . POST : " + categoryId + " , " + subCategoryId + " , " + dto);
        ProductDTO savedDto = service.post(subCategoryId, dto);

        return new ResponseEntity<>(savedDto, HttpStatus.CREATED);

    }


    @PostMapping("/list")
    public ResponseEntity<ListResponse<ProductDTO>> list(@PathVariable Long categoryId,
                                                         @PathVariable Long subCategoryId,
                                                         @RequestParam(name = PAGE_INDEX, defaultValue = PAGE_INDEX_DEFAULT) int index,
                                                         @RequestParam(name = PAGE_SIZE, defaultValue = PAGE_SIZE_DEFAULT) int size,
                                                         @RequestBody(required = false) ListRequest requestBody) {

        System.out.println(" ______ ProductController . POST - LIST : " + categoryId + " - " + subCategoryId + " - " + requestBody);

        if (requestBody == null) {
            requestBody = defaultListRequest;
        }
        requestBody.getSort().forEach((key, value) -> System.out.println(key + " :: " + value));

        ListResponse<ProductDTO> listResponse = service.list(categoryId, subCategoryId, index, size, requestBody);

        return new ResponseEntity<>(listResponse, HttpStatus.OK);

    }


}
