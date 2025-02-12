package com.example.venture.repository;

import com.example.venture.dto.LP;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LPRepository extends CrudRepository<LP, Long> {
}
