package com.example.venture.controller;

import com.example.venture.dto.Fund;
import com.example.venture.dto.VC;
import com.example.venture.service.VCService;
import com.example.venture.utility.ExcelUtility;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/vc")
public class VCController {

    private final VCService vcService;
    private final ExcelUtility excelUtility;

    public VCController(VCService vcService, ExcelUtility excelUtility) {
        this.vcService = vcService;
        this.excelUtility = excelUtility;
    }

    @GetMapping("/{vcID}/profile")
    public ResponseEntity<VC> getProfile(@PathVariable Long vcID) {
        VC vc = vcService.getVCById(vcID);
        if (vc ==  null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(vc, HttpStatus.OK);
    }

    @GetMapping("/{vcID}/funds")
    public ResponseEntity<Set<Fund>> getFunds(@PathVariable Long vcID) {
        VC vc = vcService.getVCById(vcID);
        if (vc == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Set<Fund> allFunds = vc.getFunds();
        return new ResponseEntity<>(allFunds, HttpStatus.OK);
    }


    @PostMapping("/{vcID}/fund/{fundID}/upload")
    public ResponseEntity<String> uploadExcel(@PathVariable Long vcID, @PathVariable Long fundID, @RequestParam("file") MultipartFile file) {
        try {
            // Catch if this file is of the wrong type
            if (file == null || !file.getContentType().equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") || !file.getOriginalFilename().endsWith(".xlsx")) {
                return new ResponseEntity<>("Invalid file type", HttpStatus.BAD_REQUEST);
            }
            excelUtility.readExcel(file, fundID);
            return new ResponseEntity<>("Upload Successful", HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Error processing file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
