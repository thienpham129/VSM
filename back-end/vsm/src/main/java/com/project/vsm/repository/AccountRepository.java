package com.project.vsm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.AccountEntity;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {
	Optional<AccountEntity> findByEmail(String email);

	boolean existsByEmail(String email);

	List<AccountEntity> findByRole(String role);
}
