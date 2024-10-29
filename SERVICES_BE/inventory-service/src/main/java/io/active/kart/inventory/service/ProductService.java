package io.active.kart.inventory.service;

import io.active.kart.base.core.BaseService;
import io.active.kart.base.dto.ListRequest;
import io.active.kart.base.dto.ListResponse;
import io.active.kart.base.dto.ProductDTO;
import io.active.kart.base.entity.Category;
import io.active.kart.base.entity.Product;
import io.active.kart.base.entity.SubCategory;
import io.active.kart.base.exception.APIException;
import io.active.kart.base.exception.ResourceNotFoundException;
import io.active.kart.inventory.repository.CategoryRepository;
import io.active.kart.inventory.repository.ProductRepository;
import io.active.kart.inventory.repository.SubCategoryRepository;
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


    @Override
    protected Product update(Product newEntity, Product existingEntity, ProductDTO dto) {

        System.out.println("__ SubCategoryService . PUT . UPDATE : ");

        newEntity.setCategory(existingEntity.getCategory());
        newEntity.setSubCategory(existingEntity.getSubCategory());

        return newEntity;

    }


    public ProductDTO post(Long subCategoryId, ProductDTO dto) {

        System.out.println("__ ProductService . POST : " + dto);

        Product entity = mapper.map(dto, typeEntityClass);

        SubCategory subCategory = subCategoryRepository.findById(subCategoryId)
                .orElseThrow(() -> new ResourceNotFoundException("SubCategory", "id", subCategoryId));
        entity.setSubCategory(subCategory);
        entity.setCategory(subCategory.getCategory());
        Product entityFromDb = repository.findByNameLikeIgnoreCase(entity.getName());

        if (entityFromDb != null)
            throw new APIException(typeEntityClass.getSimpleName() + " with the name " + entity.getName() + " already exists !!!");

        Product savedEntity = repository.save(entity);

        return mapper.map(savedEntity, typeDtoClass);

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

            if (Boolean.TRUE.equals(requestBody.isOnlyActive())) {
                page = this.repository.findBySubCategoryAndNameLikeIgnoreCaseAndActive(subCategory, getSearchValue(requestBody), true, pageable);
            } else {
                page = this.repository.findBySubCategoryAndNameLikeIgnoreCase(subCategory, getSearchValue(requestBody), pageable);
            }

        } else if (categoryId > 0 && subCategoryId == 0) {

            System.out.println("Products By Category");
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));

            if (Boolean.TRUE.equals(requestBody.isOnlyActive())) {
                page = this.repository.findByCategoryAndNameLikeIgnoreCaseAndActive(category, getSearchValue(requestBody), true, pageable);
            } else {
                page = this.repository.findByCategoryAndNameLikeIgnoreCase(category, getSearchValue(requestBody), pageable);
            }

        } else if (categoryId == 0) {
            System.out.println("Products By ALL");

            if (Boolean.TRUE.equals(requestBody.isOnlyActive())) {
                page = this.repository.findByNameLikeIgnoreCaseAndActive(getSearchValue(requestBody), true, pageable);
            } else {
                page = this.repository.findByNameLikeIgnoreCase(getSearchValue(requestBody), pageable);
            }

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


}