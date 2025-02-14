package com.example.venture.service;

import com.example.venture.dto.FundData;
import com.example.venture.repository.FundDataRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FundDataService {

    private final FundDataRepository fundDataRepository;

    public FundData getFundDataById(Long id) {
        return fundDataRepository.findById(id).orElse(null);
    }

    @Transactional
    public void saveFundData(FundData fundData) {
        fundDataRepository.save(fundData);
    }

    @Transactional
    public void updateFundData(FundData fundData) throws IllegalArgumentException {
        if (fundData.getId() == null) {
            throw new IllegalArgumentException("Fund data ID is required");
        }
        fundDataRepository.save(fundData);
    }

    @Transactional
    public void deleteFundData(Long id) {
        fundDataRepository.deleteById(id);
    }

    // TODO: Check if fund data object already exist in DB


}
