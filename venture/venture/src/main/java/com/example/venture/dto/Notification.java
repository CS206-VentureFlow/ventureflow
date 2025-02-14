package com.example.venture.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/*
    Notifications for a particular fund --> same for all VCs and LPs since they should be notified of the same funds details
*/

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    @Id
    @GeneratedValue
    private Long id;
    private String message;
    private LocalDateTime dateTime;
    @ManyToOne
    @JoinColumn(name = "fund_id")
    private Fund fund;
}