package com.example.venture.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FundData {
    @Id @GeneratedValue
    private Long id;
    @ManyToOne
    @JoinColumn(name = "fund_id")
    private Fund fund;

}
