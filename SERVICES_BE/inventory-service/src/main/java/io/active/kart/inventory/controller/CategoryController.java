package io.active.kart.inventory.controller;


import io.active.kart.base.core.BaseController;
import io.active.kart.base.dto.CategoryDTO;
import io.active.kart.base.dto.ListRequest;
import io.active.kart.base.dto.ListResponse;
import io.active.kart.base.entity.Category;
import io.active.kart.inventory.repository.CategoryRepository;
import io.active.kart.inventory.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static io.active.kart.base.core.BaseConstant.*;


@RestController
@RequestMapping("/api/inventory/category")
public class CategoryController extends BaseController<Category, CategoryDTO, CategoryRepository, CategoryService> {

    public CategoryController(CategoryService service) {
        super(service);
    }


    @PostMapping
    public ResponseEntity<CategoryDTO> post(@Valid @RequestBody CategoryDTO dto) {

        System.out.println("__ CategoryRestController . POST : " + dto);

        CategoryDTO savedDto = service.post(dto);
        return new ResponseEntity<>(savedDto, HttpStatus.CREATED);

    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> put(@Valid @RequestBody CategoryDTO dto,
                                           @PathVariable Long id) {
        System.out.println("__ CategoryRestController . PUT : " + id + " , " + dto);
        CategoryDTO savedDto = service.put(id, dto);
        return new ResponseEntity<>(savedDto, HttpStatus.OK);
    }

    @PostMapping("/list")
    public ResponseEntity<ListResponse<CategoryDTO>> list(@RequestParam(name = PAGE_INDEX, defaultValue = PAGE_INDEX_DEFAULT) int index,
                                                          @RequestParam(name = PAGE_SIZE, defaultValue = PAGE_SIZE_DEFAULT) int size,
                                                          @RequestBody(required = false) ListRequest requestBody) {
        System.out.println(" ______ CategoryRestController . POST - LIST " + requestBody);
        if (requestBody == null) {
            requestBody = defaultListRequest;
        }

        requestBody.getSort().forEach((key, value) -> System.out.println(key + " :: " + value));
        ListResponse<CategoryDTO> listResponse = service.list(index, size, requestBody);

        return new ResponseEntity<>(listResponse, HttpStatus.OK);

    }


}