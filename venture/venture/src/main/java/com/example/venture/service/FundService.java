package com.example.venture.service;

import com.example.venture.dto.Fund;
import com.example.venture.dto.VC;
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
    public Fund createFund(Fund fund) {
        return fundRepository.save(fund);
    }

    public Optional<Fund> getFundById(Long id) {
        return fundRepository.findById(id);
    }

    @Transactional
    public Fund updateFund(Fund fund) {
        // Make sure that the fund exists before updating.
        return fundRepository.save(fund);
    }

    @Transactional
    public void deleteFund(Long id) {
        fundRepository.deleteById(id);
    }

}
