package com.example.venture.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.venture.dto.Funddto;
import com.example.venture.dto.LPdto;
import com.example.venture.dto.Notificationdto;
import com.example.venture.model.Fund;
import com.example.venture.model.LP;
import com.example.venture.model.Notification;
import com.example.venture.model.User;
import com.example.venture.service.FundService;
import com.example.venture.service.LPService;
import com.example.venture.service.NotificationService;
import com.example.venture.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/lp")
@AllArgsConstructor
public class LPController {

    private final LPService lpService;
    private final FundService fundService;
    private final UserService userService;
    private final NotificationService notificationService;

    @GetMapping("/{lpID}/profile")
    public ResponseEntity<LPdto> getProfile(@PathVariable Long lpID) {
        LPdto lp = lpService.getLPDto(lpID);
        if (lp == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(lp, HttpStatus.OK);
    }

    @GetMapping("/{lpID}/funds")
    public ResponseEntity<Set<Funddto>> getFunds(@PathVariable Long lpID) {
        User lp = userService.getUserById(lpID);
        if (lp == null || !(lp instanceof LP)) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        LP castToLP = (LP) lp;
        Set<Funddto> allFunds = new HashSet<>();
        for (Fund fund : castToLP.getFunds()) {
            allFunds.add(fundService.getFunddto(fund.getId()));
        }
        return new ResponseEntity<>(allFunds, HttpStatus.OK);
    }

    // Get all notifications for LP for the past week (all funds)
    @GetMapping("/{lpID}/notifications")
    public ResponseEntity<Set<Notificationdto>> getNotifications(@PathVariable Long lpID) {
        User lp = userService.getUserById(lpID);
        if (lp == null || !(lp instanceof LP)) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Set<Notificationdto> allNotifications = new HashSet<>();
        for (Notification notification : notificationService.getRecentNotificationsForUser(lp.getId())) {
            allNotifications.add(notificationService.getNotificationdto(notification.getId()));
        }
        return new ResponseEntity<>(allNotifications, HttpStatus.OK);
    }
}
