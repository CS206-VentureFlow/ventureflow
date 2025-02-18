package com.example.venture;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.example.venture.model.Fund;
import com.example.venture.model.LP;
import com.example.venture.model.VC;
import com.example.venture.service.FundDataService;
import com.example.venture.service.FundService;
import com.example.venture.service.UserService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class PopulateData {

    private final FundDataService fundDataService;
    private final FundService fundService;
    private final UserService userService;


    private void populateLP(int number) {
        for (int i = 0; i < number; i++) {
            LP lp = new LP("LP " + i,  "email" + i + "@xyz.com", "1234567890");
            userService.saveUser(lp);
        }
    }

    private void populateVC(int number) {
        for (int i = 0; i < number; i++) {
            VC vc = new VC("VC " + i,  "email" + i + "@xyz.com", "1234567890");
            userService.saveUser(vc);
        }
    }


    private void populateFund(int number, int numLP) {
        List<LP> lps = new ArrayList<>();
        lps.add((LP) userService.getUserById(2L));
        VC vc = (VC) userService.getUserById(1L);
        
        // Create fund for each VC with all LP a
        Fund fund = new Fund("Fund 0", lps, vc);
        fundService.saveFund(fund);
    }

    @EventListener(ContextRefreshedEvent.class)
    @Transactional
    public void populate() {
        int numFunds = 1;
        int numVC = 1;
        int numLP = 2;

        populateVC(numVC);
        populateLP(numLP);
        populateFund(numFunds, numLP);
    }
}
