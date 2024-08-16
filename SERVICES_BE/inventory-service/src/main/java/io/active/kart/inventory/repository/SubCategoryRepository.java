package io.active.kart.inventory.repository;


import io.active.kart.base.core.BaseRepository;
import io.active.kart.base.entity.Category;
import io.active.kart.base.entity.SubCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface SubCategoryRepository extends BaseRepository<SubCategory> {

    Page<SubCategory> findByCategoryAndNameLikeIgnoreCase(Category category, String name, Pageable pageable);

    Page<SubCategory> findByCategoryAndNameLikeIgnoreCaseAndIsDeleted(Category category, String name, boolean isDeleted, Pageable pageable);
}
