package com.example.venture.service;

import java.util.*;

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

        return new Funddto(fund.getId(), fund.getFundName(), lps, vc);
    }

    public Map<String, List<Map<String, Object>>> getAllFundData(Long fundID) {
        Fund fund = getFundById(fundID);
        Map<String, List<Map<String, Object>>> result = new HashMap<>();

        // Initialize lists for each metric
        result.put("irr", new ArrayList<>());
        result.put("tvpi", new ArrayList<>());
        result.put("dpi", new ArrayList<>());
        result.put("moic", new ArrayList<>());
        result.put("rvpi", new ArrayList<>());
        result.put("accelerator", new ArrayList<>());
        result.put("preSeed", new ArrayList<>());
        result.put("seed", new ArrayList<>());
        result.put("seriesA", new ArrayList<>());

        List<FundData> sortedData = fund.getFundData().stream()
                .sorted(Comparator.comparing(FundData::getDate))
                .toList();

        for (FundData data : sortedData) {
            Map<String, Object> irrEntry = new HashMap<>();
            irrEntry.put("month", data.getDate());
            irrEntry.put("value", data.getIrr());
            result.get("irr").add(irrEntry);

            Map<String, Object> tvpiEntry = new HashMap<>();
            tvpiEntry.put("month", data.getDate());
            tvpiEntry.put("value", data.getTvpi());
            result.get("tvpi").add(tvpiEntry);

            Map<String, Object> dpiEntry = new HashMap<>();
            dpiEntry.put("month", data.getDate());
            dpiEntry.put("value", data.getDpi());
            result.get("dpi").add(dpiEntry);

            Map<String, Object> moicEntry = new HashMap<>();
            moicEntry.put("month", data.getDate());
            moicEntry.put("value", data.getMoic());
            result.get("moic").add(moicEntry);

            Map<String, Object> rvpiEntry = new HashMap<>();
            rvpiEntry.put("month", data.getDate());
            rvpiEntry.put("value", data.getRvpi());
            result.get("rvpi").add(rvpiEntry);

            Map<String, Object> acceleratorEntry = new HashMap<>();
            acceleratorEntry.put("month", data.getDate());
            acceleratorEntry.put("value", data.getAccelerator());
            result.get("accelerator").add(acceleratorEntry);

            Map<String, Object> preSeedEntry = new HashMap<>();
            preSeedEntry.put("month", data.getDate());
            preSeedEntry.put("value", data.getPre_seed());
            result.get("preSeed").add(preSeedEntry);

            Map<String, Object> seedEntry = new HashMap<>();
            seedEntry.put("month", data.getDate());
            seedEntry.put("value", data.getSeed());
            result.get("seed").add(seedEntry);

            Map<String, Object> seriesAEntry = new HashMap<>();
            seriesAEntry.put("month", data.getDate());
            seriesAEntry.put("value", data.getSeries_a());
            result.get("seriesA").add(seriesAEntry);
        }

        return result;
    }
}
