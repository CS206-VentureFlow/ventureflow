package com.example.venture.repository;

import com.example.venture.dto.FundData;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FundDataRepository extends CrudRepository<FundData, Long> {
}
