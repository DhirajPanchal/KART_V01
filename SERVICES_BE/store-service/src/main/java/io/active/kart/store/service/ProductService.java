package io.active.kart.store.service;

import io.active.kart.base.core.BaseService;
import io.active.kart.base.dto.ListRequest;
import io.active.kart.base.dto.ListResponse;
import io.active.kart.base.dto.ProductDTO;
import io.active.kart.base.entity.Category;
import io.active.kart.base.entity.Product;
import io.active.kart.base.entity.SubCategory;
import io.active.kart.base.exception.ResourceNotFoundException;
import io.active.kart.store.repository.CategoryRepository;
import io.active.kart.store.repository.ProductRepository;
import io.active.kart.store.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService extends BaseService<Product, ProductDTO, ProductRepository> {

    @Autowired
    protected SubCategoryRepository subCategoryRepository;

    @Autowired
    protected CategoryRepository categoryRepository;

    public ProductService(ProductRepository repository) {
        super(repository, Product.class, ProductDTO.class);
    }



    public ListResponse<ProductDTO> list(Long categoryId, Long subCategoryId, int index, int size, ListRequest requestBody) {

        System.out.println("__ ProductService . POST . LIST ");

        Sort sort = createSort(requestBody);
        System.out.println(" Search : |" + getSearchValue(requestBody) + "|");
        System.out.println(sort);
        Pageable pageable = PageRequest.of(index, size, sort);
        Page<Product> page = null;
        if (categoryId > 0 && subCategoryId > 0) {

            System.out.println("Products By SubCategory");
            SubCategory subCategory = subCategoryRepository.findById(subCategoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("SubCategory", "id", subCategoryId));

            page = this.repository.findBySubCategoryAndNameLikeIgnoreCaseAndDeleted(subCategory, getSearchValue(requestBody), false, pageable);


        } else if (categoryId > 0 && subCategoryId == 0) {

            System.out.println("Products By Category");
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));

            page = this.repository.findByCategoryAndNameLikeIgnoreCaseAndDeleted(category, getSearchValue(requestBody), false, pageable);


        } else if (categoryId == 0 ) {
            System.out.println("Products By ALL");

            page = this.repository.findByNameLikeIgnoreCaseAndDeleted(getSearchValue(requestBody), false, pageable);

        }

        ListResponse<ProductDTO> response = new ListResponse<>();

        if (page != null && page.hasContent()) {

            List<Product> list = page.getContent();
            List<ProductDTO> listDTO = list.stream()
                    .map(entity -> mapper.map(entity, typeDtoClass))
                    .toList();

            response.setList(listDTO);
            response.setTotalElements(page.getTotalElements());
            response.setIndex(page.getNumber());
            response.setSize(page.getSize());
            response.setTotalPages(page.getTotalPages());
            response.setLastPage(page.isLast());
        }

        return response;

    }



    @Override
    public ProductDTO get(Long id) {

        System.out.println("__ subCategoryId . GET : " + id);

        Product entity = repository.findByIdAndDeleted(id, Boolean.FALSE)
                .orElseThrow(() -> new ResourceNotFoundException(typeEntityClass.getSimpleName(), "id", id));

        return mapper.map(entity, typeDtoClass);

    }

    public ProductDTO post(Long subCategoryId, ProductDTO dto) {
        System.out.println("__ ProductService . POST # STORE (Operation Not Allowed): " + dto);
        throw new RuntimeException("# STORE (Operation Not Allowed)");
    }

    @Override
    public ProductDTO put(Long id, ProductDTO dto) {
        System.out.println("__ ProductService . PUT # STORE (Operation Not Allowed): " + id + " , " + dto);
        throw new RuntimeException("# STORE (Operation Not Allowed)");
    }

    @Override
    protected Product update(Product newEntity, Product existingEntity) {
        System.out.println("__ ProductService . PUT . UPDATE # STORE (Operation Not Allowed): ");
        throw new RuntimeException("# STORE (Operation Not Allowed)");
    }

    @Override
    public ProductDTO delete(Long id) {
        System.out.println("__ ProductService . DELETE # STORE (Operation Not Allowed): " + id);
        throw new RuntimeException("# STORE (Operation Not Allowed)");
    }


}