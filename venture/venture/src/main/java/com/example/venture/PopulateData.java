package com.example.venture;

import com.example.venture.model.*;
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
        for (int i = 0; i < number; i++) {
            Set<LP> lps = userService.getAllLPs();
            Set<VC> vcs = userService.getAlVCs();

            // Create fund for each VC with all LP a
            for (VC vc : vcs) {
                Fund fund = new Fund("Fund " + i, lps, vc);
                fundService.saveFund(fund);
            }
        }
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
