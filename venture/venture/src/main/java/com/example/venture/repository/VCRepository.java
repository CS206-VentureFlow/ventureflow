package com.example.venture.repository;

import com.example.venture.model.VC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VCRepository extends JpaRepository<VC, Long> {
}
