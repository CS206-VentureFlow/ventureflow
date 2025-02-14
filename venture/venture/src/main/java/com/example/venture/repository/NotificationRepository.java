package com.example.venture.repository;

import com.example.venture.dto.Notification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Set;

@Repository
public interface NotificationRepository extends CrudRepository<Notification, Long> {

    // Find notification from a specific fund AFTER a specific date
    @Query("SELECT n FROM Notification n WHERE n.fund.id = :fundId AND n.dateTime >= :startDate")
    Set<Notification> findNotificationsByFundIdAndDateTimeAfter(
            @Param("fundId") Long fundId,
            @Param("startDate") LocalDateTime startDate);

    // Find all notifications for a user (VC/LP) after a specific date
    @Query("SELECT n FROM Notification n JOIN n.fund.lps lp WHERE (n.fund.vc.id = :userId OR lp.id = :userId) AND n.dateTime >= :startDate")
    Set<Notification> findNotificationsByUserIdAndDateTimeAfter(
            @Param("userId") Long userId,
            @Param("startDate") LocalDateTime startDate);
}
