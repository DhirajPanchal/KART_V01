package io.active.kart.base.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ListResponse<E> {

    private List<E> list ;

    private Integer index;

    private Integer size;

    private Long totalElements;

    private Integer totalPages;

    private boolean lastPage;

}
