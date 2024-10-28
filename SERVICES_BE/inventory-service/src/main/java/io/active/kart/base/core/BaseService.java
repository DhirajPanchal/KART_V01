package io.active.kart.base.core;


import io.active.kart.base.dto.ListRequest;
import io.active.kart.base.dto.ListResponse;
import io.active.kart.base.entity.BaseEntity;
import io.active.kart.base.entity.Category;
import io.active.kart.base.exception.APIException;
import io.active.kart.base.exception.ResourceNotFoundException;
import io.active.kart.inventory.repository.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class BaseService<E extends BaseEntity, D, R extends BaseRepository<E>> {

    @Autowired
    protected ModelMapper mapper;

    protected final R repository;

    protected final Class<E> typeEntityClass;

    protected final Class<D> typeDtoClass;

    public BaseService(R repository, Class<E> typeEntityClass, Class<D> typeDtoClass) {
        this.repository = repository;
        this.typeEntityClass = typeEntityClass;
        this.typeDtoClass = typeDtoClass;
    }


    public D post(D dto) {

        System.out.println("__ BaseService . POST : " + dto);

        E entity = mapper.map(dto, typeEntityClass);
        System.out.println("entity ---------------------------------------- ");
        System.out.println(entity.toString());

        E entityFromDb = repository.findByNameLikeIgnoreCase(entity.getName());
        if (entityFromDb != null)
            throw new APIException(typeEntityClass.getSimpleName() + " with the name " + entity.getName() + " already exists !!!");

        E savedEntity = repository.save(entity);

        return mapper.map(savedEntity, typeDtoClass);

    }


    public D get(Long id) {

        System.out.println("__ BaseService . GET : " + id);

        E entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(typeEntityClass.getSimpleName(), "id", id));

        return mapper.map(entity, typeDtoClass);

    }


    public D put(Long id, D dto) {

        System.out.println("__ BaseService . PUT : " + id + " , " + dto);

        E existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(typeEntityClass.getSimpleName(), "id", id));

        E entity = mapper.map(dto, typeEntityClass);

        entity.setId(id);

        entity = update(entity, existing);

        E savedEntity = repository.save(entity);

        return mapper.map(savedEntity, typeDtoClass);

    }


    public D delete(Long id) {

        System.out.println("__ BaseService . DELETE : " + id);

        E entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(typeEntityClass.getSimpleName(), "id", id));

        entity.setDeleted(true);
        E savedEntity = repository.save(entity);

        return mapper.map(savedEntity, typeDtoClass);

    }


    protected E update(E newEntity, E existingEntity) {
        System.out.println("__ BaseService . PUT . UPDATE : ");
        newEntity.setDeleted(existingEntity.getDeleted());
        return newEntity;
    }


    public ListResponse<D> list(int index, int size, ListRequest requestBody) {

        System.out.println("__ BaseService . LIST : " + requestBody.isIncludeDeleted());

        Sort sort = createSort(requestBody);
        System.out.println(" Search : |" + getSearchValue(requestBody) + "|");
        System.out.println(sort);
        Pageable pageable = PageRequest.of(index, size, sort);
        Page<E> page;

        if (Boolean.TRUE.equals(requestBody.isIncludeDeleted())) {
            page = this.repository.findByNameLikeIgnoreCase(
                    getSearchValue(requestBody),
                    pageable);
        } else {
            page = this.repository.findByNameLikeIgnoreCaseAndDeleted(
                    getSearchValue(requestBody),
                    false,
                    pageable);
        }

        ListResponse<D> response = new ListResponse<>();

        if (page.hasContent()) {

            List<E> list = page.getContent();
            List<D> listDTO = list.stream()
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

    protected String getSearchValue(ListRequest requestBody) {
        if (requestBody != null && requestBody.getSearch() != null) {
            return '%' + requestBody.getSearch() + '%';
        } else {
            return '%' + "" + '%';
        }
    }


    //  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
    //  S O R T - Multi Sort Object Generation
    //  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

    protected Sort createSort(ListRequest payload) {
        System.out.println("SERVICE  __createSort() :::: ");
        Sort sort;

        List<Sort.Order> orders = new ArrayList<>();

        Set<String> keys = payload.getSort().keySet();
        int multi = -1;
        for (String key : keys) {
            multi++;
            System.out.println(multi + " - " + key + " [ " + payload.getSort().get(key) + " ]");
            String order = payload.getSort().get(key);
            if ("desc".equals(order)) {
                orders.add(Sort.Order.desc(key));
            } else {
                orders.add(Sort.Order.asc(key));
            }
        }
        System.out.println(" ORDERS :: ");
        System.out.println(orders);
        sort = Sort.by(orders);
        System.out.println(" SORT :: ");
        System.out.println(sort);
        return sort;
    }


}
