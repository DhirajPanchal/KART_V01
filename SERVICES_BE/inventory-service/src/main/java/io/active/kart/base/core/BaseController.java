package io.active.kart.base.core;

import io.active.kart.base.entity.BaseEntity;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
public abstract class BaseController<E extends BaseEntity, D, R extends BaseRepository<E>, S extends BaseService<E, D, R>> {


    protected final S service;

    public BaseController(S service) {
        System.out.println("__ BaseController");
        this.service = service;
    }


    @GetMapping("/{id}")
    public ResponseEntity<D> get(@PathVariable Long id) {
        System.out.println("__ BaseController . GET : " + id);
        D savedDto = service.get(id);
        return new ResponseEntity<>(savedDto, HttpStatus.OK);
    }


//    @PutMapping("/{id}")
//    public ResponseEntity<D> put(@Valid @RequestBody D dto,
//                                 @PathVariable Long id) {
//        System.out.println("__ BaseController . PUT : " + id + " , " + dto);
//        D savedDto = service.put(id, dto);
//        return new ResponseEntity<>(savedDto, HttpStatus.OK);
//    }


    @DeleteMapping("/{id}")
    public ResponseEntity<D> delete(@PathVariable Long id) {
        System.out.println("__ BaseController . DELETE : " + id);
        D deletedDto = service.delete(id);
        return new ResponseEntity<>(deletedDto, HttpStatus.OK);
    }


}
