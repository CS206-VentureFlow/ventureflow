package com.example.venture.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.example.venture.dto.Topicdto;
import com.example.venture.model.Topic;
import com.example.venture.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.venture.dto.LPdto;
import com.example.venture.dto.Messagedto;
import com.example.venture.dto.VCdto;
import com.example.venture.model.Fund;
import com.example.venture.model.LP;
import com.example.venture.model.Message;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/fund")
@AllArgsConstructor
public class FundController {

    private final FundService fundService;
    private final LPService lpService;
    private final VCService vcService;
    private final TopicService topicService;

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
    @GetMapping("/{fundID}/topics")
    public ResponseEntity<Set<Topicdto>> getMessages(@PathVariable Long fundID) {
        Fund fund = fundService.getFundById(fundID);
        if (fund == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Set<Topicdto> allTopics = new HashSet<>();
        for (Topic topic : fund.getTopics()) {
            allTopics.add(topicService.getTopicdto(topic.getId()));
        }
        return new ResponseEntity<>(allTopics, HttpStatus.OK);
    }

    // Post new topic for fund
    @PostMapping("/{fundID}/newTopic")
    public ResponseEntity<String> addTopic(@PathVariable Long fundID, @RequestBody Topicdto topicdto) {
        Fund fund = fundService.getFundById(fundID);
        if (fund == null) {
            return new ResponseEntity<>("Fund not found", HttpStatus.BAD_REQUEST);
        }
        Topic topic = new Topic(topicdto.getMessage(), topicdto.getSender(), fund);
        topicService.saveOrUpdateTopic(topic);
        return new ResponseEntity<>("Topic added", HttpStatus.OK);
    }

    // Get all data for fund
    @GetMapping("/{fundID}/getData")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getAllFundData(@PathVariable Long fundID) {
        Fund fund = fundService.getFundById(fundID);
        if (fund == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(fundService.getAllFundData(fundID), HttpStatus.OK);
    }
}
