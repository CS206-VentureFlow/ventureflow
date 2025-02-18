package com.example.venture.service;

import com.example.venture.model.Notification;
import com.example.venture.repository.NotificationRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;


@Service
@AllArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public Notification getNotificationById(Long id) {
        return notificationRepository.findById(id).orElse(null);
    }

    // Returns all notification within the past week for 1 fund
    public Set<Notification> getRecentNotifications (Long fundId) {
        return notificationRepository.findNotificationsByFundIdAndDateTimeAfter(fundId, LocalDateTime.now().minusDays(7));
    }

    // Returns all notification within the past week for 1 user (VC/LP)
    public Set<Notification> getRecentNotificationsForUser (Long userId) {
        return notificationRepository.findNotificationsByUserIdAndDateTimeAfter(userId, LocalDateTime.now().minusDays(7));
    }

    @Transactional
    public void saveNotification(Notification notification) {
        notificationRepository.save(notification);
    }

    @Transactional
    public void updateNotification(Notification notification) throws IllegalArgumentException {
        if (notificationRepository.findById(notification.getId()).isEmpty()) {
            throw new IllegalArgumentException("Notification with ID " + notification.getId() + " does not exist.");
        }
        notificationRepository.save(notification);
    }

    @Transactional
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }

}
