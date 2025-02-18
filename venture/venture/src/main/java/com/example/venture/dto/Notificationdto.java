package com.example.venture.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Notificationdto {
    private Long id;
    private String message;
    private LocalDateTime dateTime;
}
