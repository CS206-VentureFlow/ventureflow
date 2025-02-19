package com.example.venture.service;

import org.springframework.stereotype.Service;

import com.example.venture.dto.FundDatadto;
import com.example.venture.model.FundData;
import com.example.venture.repository.FundDataRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Service
@AllArgsConstructor
public class FundDataService {
    private final FundDataRepository fundDataRepository;

    public FundData getFundDataById(LocalDate date) {
        return fundDataRepository.findById(date).orElse(null);
    }

    @Transactional
    public void saveOrUpdateFundData(FundData fundData) {
        if (fundData.getDate() == null) {
            throw new IllegalArgumentException("Fund data date is required");
        }

        FundData existingData = fundDataRepository.findById(fundData.getDate()).orElse(null);
        if (existingData != null) {
            // Update existing data
            existingData.setFund(fundData.getFund());
            existingData.setIrr(fundData.getIrr());
            existingData.setTvpi(fundData.getTvpi());
            existingData.setDpi(fundData.getDpi());
            existingData.setMoic(fundData.getMoic());
            existingData.setRvpi(fundData.getRvpi());
            fundDataRepository.save(existingData);
        } else {
            // Save new data
            fundDataRepository.save(fundData);
        }
    }

    @Transactional
    public void deleteFundData(LocalDate date) {
        fundDataRepository.deleteById(date);
    }

    public FundDatadto getFundDatadto(LocalDate date) {
        FundData fundData = getFundDataById(date);
        if (fundData == null) {
            return null;
        }
        return new FundDatadto();
    }
}
