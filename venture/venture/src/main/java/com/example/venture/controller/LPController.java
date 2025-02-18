package com.example.venture.controller;

import com.example.venture.model.*;
import com.example.venture.service.*;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/lp")
@AllArgsConstructor
public class LPController {

    private final UserService userService;
    private final NotificationService notificationService;

    @GetMapping("/{lpID}/profile")
    public ResponseEntity<LP> getProfile(@PathVariable Long lpID) {
        LP lp = (LP) userService.getUserById(lpID);
        if (lp == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(lp, HttpStatus.OK);
    }

    @GetMapping("/{lpID}/funds")
    public ResponseEntity<Set<Fund>> getFunds(@PathVariable Long lpID) {
        User lp = userService.getUserById(lpID);
        if (lp == null || !(lp instanceof LP)) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        LP castToLP = (LP) lp;
        Set<Fund> allFunds = castToLP.getFunds();
        return new ResponseEntity<>(allFunds, HttpStatus.OK);
    }

    // Get all notifications for LP for the past week (all funds)
    @GetMapping("/{lpID}/notifications")
    public ResponseEntity<Set<Notification>> getNotifications(@PathVariable Long lpID) {
        User lp = userService.getUserById(lpID);
        if (lp == null || !(lp instanceof LP)) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Set<Notification> allNotifications = notificationService.getRecentNotificationsForUser(lpID);
        return new ResponseEntity<>(allNotifications, HttpStatus.OK);
    }
}
