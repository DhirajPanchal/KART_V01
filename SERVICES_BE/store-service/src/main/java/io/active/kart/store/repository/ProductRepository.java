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


    Optional<Product> findByIdAndDeleted(Long id, boolean deleted);

    Page<Product> findBySubCategoryAndNameLikeIgnoreCaseAndDeleted(SubCategory subCategory, String name, boolean deleted, Pageable pageable);

    Page<Product> findByCategoryAndNameLikeIgnoreCaseAndDeleted(Category category, String name, boolean deleted, Pageable pageable);

}
