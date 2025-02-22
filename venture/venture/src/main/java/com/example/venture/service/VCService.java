package com.example.venture.service;

import java.util.HashMap;

import org.springframework.stereotype.Service;

import com.example.venture.dto.VCdto;
import com.example.venture.model.Fund;
import com.example.venture.model.User;
import com.example.venture.model.VC;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class VCService {
    UserService userService;

    // Get VC DTO
    public VCdto getVCDto(Long vcId) {
        User user = userService.getUserById(vcId);
        if (user == null || !(user instanceof VC)) {
            return null;
        }
        VC vc = (VC) user;
        HashMap<String, Long> fundMap = new HashMap<>();
        for (Fund fund : vc.getFunds()) {
            fundMap.put(fund.getFundName(), fund.getId());
        }
        return new VCdto(vc.getId(), vc.getName(), vc.getEmail(), vc.getContactNo(), fundMap, vc.getDashboardLayout());
    }

    // Get dashboard layout for VC
    public String getDashboardLayout(Long vcId) {
        User vc = userService.getUserById(vcId);
        if (vc == null || !(vc instanceof VC)) {
            return null;
        }
        return ((VC) vc).getDashboardLayout();
    }

    // Save dashboard layout for VC
    public void saveDashboardLayout(Long vcId, String layout) {
        User vc = userService.getUserById(vcId);
        if (vc == null || !(vc instanceof VC)) {
            return;
        }
        vc.setDashboardLayout(layout);
        userService.saveOrUpdateUser(vc);
    }
}
