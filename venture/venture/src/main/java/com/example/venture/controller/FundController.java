package com.example.venture.controller;

import com.example.venture.dto.*;
import com.example.venture.service.*;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
@RequestMapping("/api/v1/fund")
@AllArgsConstructor
public class FundController {

    private final FundService fundService;
    private final FundDataService fundDataService;
    private final LPService lpService;
    private final VCService vcService;
    private final MessageService messageService;

    // TODO: GET endpoints for all columns of FundData

    // Get all LPs associated with a Fund
    @GetMapping("/{fundID}/lps")
    public ResponseEntity<Set<LP>> getLPs(@PathVariable Long fundID) {
        Fund fund = fundService.getFundById(fundID);
        if (fund == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Set<LP> allLPs = fund.getLps();
        return new ResponseEntity<>(allLPs, HttpStatus.OK);
    }

    // Get VC associated with a Fund
    @GetMapping("/{fundID}/vc")
    public ResponseEntity<VC> getVC(@PathVariable Long fundID) {
        Fund fund = fundService.getFundById(fundID);
        if (fund == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        VC vc = fund.getVc();
        return new ResponseEntity<>(vc, HttpStatus.OK);
    }

    // Get all Messages associated with a Fund
    @GetMapping("/{fundID}/messages")
    public ResponseEntity<Set<Message>> getMessages(@PathVariable Long fundID) {
        Fund fund = fundService.getFundById(fundID);
        if (fund == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Set<Message> allMessages = fund.getMessages();
        return new ResponseEntity<>(allMessages, HttpStatus.OK);
    }

    // Get
}
