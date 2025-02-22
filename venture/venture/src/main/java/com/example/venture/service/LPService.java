package com.example.venture.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.stereotype.Service;

import com.example.venture.dto.LPdto;
import com.example.venture.model.Fund;
import com.example.venture.model.LP;
import com.example.venture.model.User;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class LPService {

    private final UserService userService;

    // Get LP DTO
    public LPdto getLPDto(Long lpId) {
        User user = userService.getUserById(lpId);
        if (user == null || !(user instanceof LP)) {
            return null;
        }
        LP lp = (LP) user;
        HashMap<String, Long> fundMap = new HashMap<>();
        for (Fund fund : new ArrayList<>(lp.getFunds())) {
            fundMap.put(fund.getFundName(), fund.getId());
        }
        return new LPdto(lp.getId(), lp.getName(), lp.getEmail(), lp.getContactNo(), fundMap, lp.getDashboardLayout());
    }

    // Get dashboard layout for LP
    public String getDashboardLayout(Long lpId) {
        User lp = userService.getUserById(lpId);
        if (lp == null || !(lp instanceof LP)) {
            return null;
        }
        return lp.getDashboardLayout();
    }

    // Save dashboard layout for LP
    public void saveDashboardLayout(Long lpId, String layout) {
        User lp = userService.getUserById(lpId);
        if (lp == null || !(lp instanceof LP)) {
            return;
        }
        lp.setDashboardLayout(layout);
        userService.saveOrUpdateUser(lp);
    }
}
