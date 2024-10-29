package io.active.kart.base.core;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseRepository<E> extends JpaRepository<E, Long> {

    E findByNameLikeIgnoreCase(String name);

    Page<E> findByNameLikeIgnoreCase(String name, Pageable pageDetails);

    Page<E> findByNameLikeIgnoreCaseAndActive(String name, boolean active, Pageable pageDetails);

}
