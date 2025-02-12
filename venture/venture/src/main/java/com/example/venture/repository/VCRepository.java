package com.example.venture.repository;

import com.example.venture.dto.VC;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VCRepository extends CrudRepository<VC, Long> {
}
