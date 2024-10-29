package io.active.kart.inventory.repository;

import io.active.kart.base.core.BaseRepository;
import io.active.kart.base.entity.Category;
import io.active.kart.base.entity.Product;
import io.active.kart.base.entity.SubCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends BaseRepository<Product> {

    Page<Product> findBySubCategoryAndNameLikeIgnoreCase(SubCategory subCategory, String name, Pageable pageDetails);

    Page<Product> findByCategoryAndNameLikeIgnoreCase(Category category, String name, Pageable pageable);

    Page<Product> findBySubCategoryAndNameLikeIgnoreCaseAndActive(SubCategory subCategory, String name, boolean active, Pageable pageable);

    Page<Product> findByCategoryAndNameLikeIgnoreCaseAndActive(Category category, String name, boolean active, Pageable pageable);

}
