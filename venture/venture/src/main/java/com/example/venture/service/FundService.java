package com.example.venture.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.venture.dto.FundDatadto;
import com.example.venture.dto.Funddto;
import com.example.venture.model.Fund;
import com.example.venture.model.FundData;
import com.example.venture.model.LP;
import com.example.venture.repository.FundRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FundService {

    private final FundRepository fundRepository;
    private final FundDataService fundDataService;

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

    // Get Funddto
    public Funddto getFunddto(Long fundId) {
        Fund fund = getFundById(fundId);
        if (fund == null) {
            return null;
        }

        HashMap<String, Long> lps = new HashMap<>();
        for (LP lp : fund.getLps()) {
            lps.put(lp.getName(), lp.getId());
        }

        HashMap<String, Long> vc = new HashMap<>();
        vc.put(fund.getVc().getName(), fund.getVc().getId());
        
        List<FundDatadto> fundDataDtos = new ArrayList<>();
        for (FundData fundData : fund.getFundData()) {
            fundDataDtos.add(fundDataService.getFundDatadto(fundData.getDate()));
        }

        return new Funddto(fund.getId(), fund.getFundName(), lps, vc, fundDataDtos);
    }
}
