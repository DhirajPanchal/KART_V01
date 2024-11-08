package io.active.kart.store.repository;


import io.active.kart.base.core.BaseRepository;
import io.active.kart.base.entity.Category;
import io.active.kart.base.entity.SubCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface SubCategoryRepository extends BaseRepository<SubCategory> {

    Page<SubCategory> findByCategoryAndNameLikeIgnoreCaseAndDeleted(Category category, String name, boolean deleted, Pageable pageable);

}
