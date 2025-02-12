package com.example.venture.controller;

import com.example.venture.dto.Fund;
import com.example.venture.dto.LP;
import com.example.venture.service.LPService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/lp")
public class LPController {

    private final LPService lpService;

    public LPController(LPService lpService) { this.lpService = lpService; }

    @GetMapping("/{lpID}/profile")
    public ResponseEntity<LP> getProfile(@PathVariable Long lpID) {
        LP lp = lpService.getLPById(lpID).orElse(null);
        if (lp ==  null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(lp, HttpStatus.OK);
    }

    @GetMapping("/{lpID}/funds")
    public ResponseEntity<Set<Fund>> getFunds(@PathVariable Long lpID) {
        LP lp = lpService.getLPById(lpID).orElse(null);
        if (lp == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Set<Fund> allFunds = lp.getFunds();
        return new ResponseEntity<>(allFunds, HttpStatus.OK);
    }
}
