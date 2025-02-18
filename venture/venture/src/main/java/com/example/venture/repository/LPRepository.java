package com.example.venture.repository;

import com.example.venture.model.LP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LPRepository extends JpaRepository<LP, Long> {
}
