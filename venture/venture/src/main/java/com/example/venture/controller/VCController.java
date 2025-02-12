package com.example.venture.controller;

import com.example.venture.dto.Fund;
import com.example.venture.dto.VC;
import com.example.venture.service.VCService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/vc")
public class VCController {

    private final VCService vcService;

    public VCController(VCService vcService) { this.vcService = vcService; }

    @GetMapping("/{vcID}/profile")
    public ResponseEntity<VC> getProfile(@PathVariable Long vcID) {
        VC vc = vcService.getVCById(vcID).orElse(null);
        if (vc ==  null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(vc, HttpStatus.OK);
    }

    @GetMapping("/{vcID}/funds")
    public ResponseEntity<Set<Fund>> getFunds(@PathVariable Long vcID) {
        VC vc = vcService.getVCById(vcID).orElse(null);
        if (vc == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Set<Fund> allFunds = vc.getFunds();
        return new ResponseEntity<>(allFunds, HttpStatus.OK);
    }
}
