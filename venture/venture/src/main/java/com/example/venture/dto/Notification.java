package com.example.venture.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    @Id
    @GeneratedValue
    private Long id;
    private String message;
    @ManyToOne
    @JoinColumn(name = "fund_id")
    private Fund fund;
}