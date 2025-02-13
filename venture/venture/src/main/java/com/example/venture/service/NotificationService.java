package com.example.venture.service;

import com.example.venture.dto.Notification;
import com.example.venture.repository.NotificationRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;


@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public Notification getNotificationById(Long id) {
        return notificationRepository.findById(id).orElse(null);
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
