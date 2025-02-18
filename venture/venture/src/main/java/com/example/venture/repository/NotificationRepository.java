package com.example.venture.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.venture.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Find notification from a specific fund AFTER a specific date
    @Query("SELECT n FROM Notification n WHERE n.fund.id = :fundId AND n.dateTime >= :startDate")
    List<Notification> findNotificationsByFundIdAndDateTimeAfter(
            @Param("fundId") Long fundId,
            @Param("startDate") LocalDateTime startDate);

    // Find all notifications for a user (VC/LP) after a specific date
    @Query("SELECT n FROM Notification n JOIN n.fund.lps lp WHERE (n.fund.vc.id = :userId OR lp.id = :userId) AND n.dateTime >= :startDate")
    List<Notification> findNotificationsByUserIdAndDateTimeAfter(
            @Param("userId") Long userId,
            @Param("startDate") LocalDateTime startDate);
}
