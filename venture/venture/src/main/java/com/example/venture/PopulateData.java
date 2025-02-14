package com.example.venture;

import com.example.venture.dto.*;
import com.example.venture.service.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@AllArgsConstructor
public class PopulateData {

    private final FundDataService fundDataService;
    private final FundService fundService;
    private final VCService vcService;
    private final LPService lpService;


    private void populateLP(int number) {
        for (int i = 0; i < number; i++) {
            LP lp = new LP("LP " + i,  "email" + i + "@xyz.com", "1234567890");
            lpService.saveLP(lp);
        }
    }

    private void populateVC(int number) {
        for (int i = 0; i < number; i++) {
            VC vc = new VC("VC " + i,  "email" + i + "@xyz.com", "1234567890");
            vcService.saveVC(vc);
        }
    }

    private void populateFund(int number, int numLP) {
        for (int i = 0; i < number; i++) {
            Fund fund = new Fund();
            fund.setFundName("Fund " + i);

            Set<LP> lps = new HashSet<>();
            for (int j = 0; j < numLP; j++) {
                lps.add(lpService.getLPById((long) j));
            }
            fund.setLps(lps);

            fund.setVc(vcService.getVCById(1L));

            fundService.saveFund(fund);
        }
    }

    @EventListener(ContextRefreshedEvent.class)
    @Transactional
    public void populate() {
        int numFunds = 1;
        int numVC = 1;
        int numLP = 2;

        populateFund(numFunds, numLP);
        populateVC(numVC);
        populateLP(numLP);
    }
}
