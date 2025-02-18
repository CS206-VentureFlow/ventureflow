package com.example.venture.service;

import com.example.venture.model.Fund;
import com.example.venture.repository.FundRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FundService {

    private final FundRepository fundRepository;

    public FundService(FundRepository fundRepository) {
        this.fundRepository = fundRepository;
    }

    @Transactional
    public Fund saveFund(Fund fund) {
        return fundRepository.save(fund);
    }

    public Fund getFundById(Long id) {
        return fundRepository.findById(id).orElse(null);
    }

    @Transactional
    public Fund updateFund(Fund fund) throws IllegalArgumentException {
        // Check if the Fund exists by its ID
        Optional<Fund> existingFund = fundRepository.findById(fund.getId());

        if (existingFund.isEmpty()) {
            throw new IllegalArgumentException("Fund with ID " + fund.getId() + " does not exist.");
        }

        // Make sure that the fund exists before updating.
        return fundRepository.save(fund);
    }

    @Transactional
    public void deleteFund(Long id) {
        fundRepository.deleteById(id);
    }

}
