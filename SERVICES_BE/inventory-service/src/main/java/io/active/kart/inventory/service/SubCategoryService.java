package io.active.kart.inventory.service;

import io.active.kart.base.core.BaseService;
import io.active.kart.base.dto.ListRequest;
import io.active.kart.base.dto.ListResponse;
import io.active.kart.base.dto.SubCategoryDTO;
import io.active.kart.base.entity.Category;
import io.active.kart.base.entity.SubCategory;
import io.active.kart.base.exception.APIException;
import io.active.kart.base.exception.ResourceNotFoundException;
import io.active.kart.inventory.repository.CategoryRepository;
import io.active.kart.inventory.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Service
public class SubCategoryService
        extends BaseService<SubCategory, SubCategoryDTO, SubCategoryRepository> {


    @Autowired
    protected CategoryRepository categoryRepository;


    public SubCategoryService(SubCategoryRepository repository) {
        super(repository, SubCategory.class, SubCategoryDTO.class);
    }


    @Override
    protected SubCategory update(SubCategory newEntity, SubCategory existingEntity) {

        System.out.println("__ SubCategoryService . PUT . UPDATE : ");

        newEntity.setCategory(existingEntity.getCategory());
        return newEntity;

    }


    @PostMapping
    public SubCategoryDTO post(Long categoryId, SubCategoryDTO dto) {

        System.out.println("__ SubCategoryService . POST : " + dto);

        SubCategory entity = mapper.map(dto, typeEntityClass);

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));
        entity.setCategory(category);

        SubCategory entityFromDb = repository.findByNameLikeIgnoreCase(entity.getName());
        if (entityFromDb != null)
            throw new APIException(typeEntityClass.getSimpleName() + " with the name " + entity.getName() + " already exists !!!");

        SubCategory savedEntity = repository.save(entity);

        return mapper.map(savedEntity, typeDtoClass);

    }


    public ListResponse<SubCategoryDTO> list(Long categoryId, int index, int size, ListRequest requestBody) {

        System.out.println("__ SubCategoryService . POST . LIST  : ");

        Sort sort = createSort(requestBody);
        System.out.println(" Search : |" + getSearchValue(requestBody) + "|");
        System.out.println(sort);
        Pageable pageable = PageRequest.of(index, size, sort);
        Page<SubCategory> page = null;

        if (categoryId > 0) {

            System.out.println("SubCategories By Category");

            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("SubCategory", "id", categoryId));

            if (Boolean.TRUE.equals(requestBody.isIncludeDeleted())) {
                page = this.repository.findByCategoryAndNameLikeIgnoreCase(category, getSearchValue(requestBody), pageable);
            } else {
                page = this.repository.findByCategoryAndNameLikeIgnoreCaseAndIsDeleted(category, getSearchValue(requestBody), false, pageable);
            }
        } else if (categoryId == 0) {

            System.out.println("SubCategories By ALL");
            if (Boolean.TRUE.equals(requestBody.isIncludeDeleted())) {
                page = this.repository.findByNameLikeIgnoreCase(getSearchValue(requestBody), pageable);
            } else {
                page = this.repository.findByNameLikeIgnoreCaseAndIsDeleted(getSearchValue(requestBody), false, pageable);
            }
        }

        ListResponse<SubCategoryDTO> response = new ListResponse<>();

        if (page != null && page.hasContent()) {

            List<SubCategory> list = page.getContent();
            List<SubCategoryDTO> listDTO = list.stream()
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

