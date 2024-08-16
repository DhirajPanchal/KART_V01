package io.active.kart.store.service;


import io.active.kart.base.core.BaseService;
import io.active.kart.base.dto.CategoryDTO;
import io.active.kart.base.entity.Category;
import io.active.kart.store.repository.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService extends BaseService<Category, CategoryDTO, CategoryRepository> {

    public CategoryService(CategoryRepository repository) {
        super(repository, Category.class, CategoryDTO.class);
    }

}
