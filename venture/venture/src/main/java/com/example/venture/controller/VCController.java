package com.example.venture.controller;

import com.example.venture.dto.*;
import com.example.venture.service.*;
import com.example.venture.utility.ExcelUtility;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/v1/vc")
@AllArgsConstructor
public class VCController {

    private final VCService vcService;
    private final ExcelUtility excelUtility;
    private final NotificationService notificationService;

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

    // Get all notifications for VC for the past week (all funds)
    @GetMapping("/{vcID}/notifications")
    public ResponseEntity<Set<Notification>> getNotifications(@PathVariable Long vcID) {
        VC vc = vcService.getVCById(vcID);
        if (vc == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Set<Notification> allNotifications = notificationService.getRecentNotificationsForUser(vcID);
        return new ResponseEntity<>(allNotifications, HttpStatus.OK);
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
