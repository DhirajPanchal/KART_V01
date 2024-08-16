package io.active.kart.store.repository;

import io.active.kart.base.core.BaseRepository;
import io.active.kart.base.entity.Category;
import io.active.kart.base.entity.Product;
import io.active.kart.base.entity.SubCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends BaseRepository<Product> {


    Optional<Product> findByIdAndIsDeleted(Long id, boolean isDeleted);

    Page<Product> findBySubCategoryAndNameLikeIgnoreCaseAndIsDeleted(SubCategory subCategory, String name, boolean isDeleted, Pageable pageable);

    Page<Product> findByCategoryAndNameLikeIgnoreCaseAndIsDeleted(Category category, String name, boolean isDeleted, Pageable pageable);

}
