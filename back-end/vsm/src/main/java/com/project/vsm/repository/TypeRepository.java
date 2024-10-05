package com.project.vsm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.vsm.controller.model.TypeEntity;

@Repository
public interface TypeRepository extends JpaRepository<TypeEntity, Long> {

}
