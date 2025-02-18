package com.example.venture.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.venture.dto.LPdto;
import com.example.venture.dto.Messagedto;
import com.example.venture.dto.VCdto;
import com.example.venture.model.Fund;
import com.example.venture.model.LP;
import com.example.venture.model.Message;
import com.example.venture.service.FundService;
import com.example.venture.service.LPService;
import com.example.venture.service.MessageService;
import com.example.venture.service.VCService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/fund")
@AllArgsConstructor
public class FundController {

    private final FundService fundService;
    private final LPService lpService;
    private final VCService vcService;
    private final MessageService messageService;

    // TODO: GET endpoints for all columns of FundData

    // Get all LPs associated with a Fund
    @GetMapping("/{fundID}/lps")
    public ResponseEntity<Set<LPdto>> getLPs(@PathVariable Long fundID) {
        Fund fund = fundService.getFundById(fundID);
        if (fund == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Set<LPdto> allLPs = new HashSet<>();
        for (LP lp : fund.getLps()) {
            allLPs.add(lpService.getLPDto(lp.getId()));
        }
        return new ResponseEntity<>(allLPs, HttpStatus.OK);
    }

    // Get VC associated with a Fund
    @GetMapping("/{fundID}/vc")
    public ResponseEntity<VCdto> getVC(@PathVariable Long fundID) {
        Fund fund = fundService.getFundById(fundID);
        if (fund == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        VCdto vcDto = vcService.getVCDto(fund.getVc().getId());
        return new ResponseEntity<>(vcDto, HttpStatus.OK);
    }

    // Get all Messages associated with a Fund
    @GetMapping("/{fundID}/messages")
    public ResponseEntity<Set<Messagedto>> getMessages(@PathVariable Long fundID) {
        Fund fund = fundService.getFundById(fundID);
        if (fund == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Set<Messagedto> allMessages = new HashSet<>();
        for (Message message : fund.getMessages()) {
            allMessages.add(messageService.getMessagedto(message.getId()));
        }
        return new ResponseEntity<>(allMessages, HttpStatus.OK);
    }

    
}
