package com.project.vsm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.AccountEntity;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {
	Optional<AccountEntity> findByEmail(String email);

	boolean existsByEmail(String email);

	List<AccountEntity> findByRole(String role);

	@Query("SELECT COUNT(a) FROM AccountEntity a WHERE EXTRACT(MONTH FROM a.createDate) = :month AND EXTRACT(YEAR FROM a.createDate) = :year")
	long countAccountsByCurrentMonth(int month, int year);

	// Truy vấn lấy số lượng tài khoản tạo trong tháng trước
	@Query("SELECT COUNT(a) FROM AccountEntity a WHERE EXTRACT(MONTH FROM a.createDate) = :prevMonth AND EXTRACT(YEAR FROM a.createDate) = :year")
	long countAccountsByPreviousMonth(int prevMonth, int year);
}