package com.example.venture.controller;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.venture.dto.Funddto;
import com.example.venture.dto.Notificationdto;
import com.example.venture.dto.VCdto;
import com.example.venture.model.Fund;
import com.example.venture.model.Notification;
import com.example.venture.model.User;
import com.example.venture.model.VC;
import com.example.venture.service.FundService;
import com.example.venture.service.NotificationService;
import com.example.venture.service.UserService;
import com.example.venture.service.VCService;
import com.example.venture.utility.ExcelUtility;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/vc")
@AllArgsConstructor
public class VCController {

    private final UserService userService;
    private final VCService vcService;
    private final FundService fundService;
    private final ExcelUtility excelUtility;
    private final NotificationService notificationService;

    @GetMapping("/{vcID}/profile")
    public ResponseEntity<VCdto> getProfile(@PathVariable Long vcID) {
        User vc = userService.getUserById(vcID);
        if (vc == null || !(vc instanceof VC)) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        VCdto vcDto = vcService.getVCDto(vcID);
        return new ResponseEntity<>(vcDto, HttpStatus.OK);
    }

    @GetMapping("/{vcID}/funds")
    public ResponseEntity<Set<Funddto>> getFunds(@PathVariable Long vcID) {
        User vc = userService.getUserById(vcID);
        if (vc == null || !(vc instanceof VC)) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        VC castToVC = (VC) vc;
        Set<Funddto> allFunds = new HashSet<>();
        for (Fund fund : castToVC.getFunds()) {
            allFunds.add(fundService.getFunddto(fund.getId()));
        }
        return new ResponseEntity<>(allFunds, HttpStatus.OK);
    }

    // Get all notifications for VC for the past week (all funds)
    @GetMapping("/{vcID}/notifications")
    public ResponseEntity<Set<Notificationdto>> getNotifications(@PathVariable Long vcID) {
        User vc = userService.getUserById(vcID);
        if (vc == null || !(vc instanceof VC)) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Set<Notificationdto> allNotifications = new HashSet<>();
        for (Notification notification : notificationService.getRecentNotificationsForUser(vc.getId())) {
            allNotifications.add(notificationService.getNotificationdto(notification.getId()));
        }
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
