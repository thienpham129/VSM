package com.project.vsm.dto.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level =  AccessLevel.PRIVATE)
public class PageableResponse {
    int pageNumber;
    int pageSize;
    int totalPage;
    long totalRecord;

    public PageableResponse setPageNumber (int pageNumber){
        this.pageNumber = pageNumber + 1;
        return this;
    }

    public PageableResponse setPageSize (int pageSize){
        this.pageSize = pageSize;
        return this;
    }

    public PageableResponse setToltalPage (int totalPage){
        this.totalPage = totalPage;
        return this;
    }

    public PageableResponse setTotalRecord ( long totalRecord){
        this.totalRecord = totalRecord;
        return this;
    }
}
