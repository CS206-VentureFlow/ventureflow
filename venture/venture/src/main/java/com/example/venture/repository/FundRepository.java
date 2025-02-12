package com.example.venture.repository;

import com.example.venture.dto.Fund;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FundRepository extends CrudRepository<Fund, Long> {
}
