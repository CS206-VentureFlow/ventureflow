package com.example.venture.repository;

import com.example.venture.model.FundData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FundDataRepository extends JpaRepository<FundData, String> {
}
