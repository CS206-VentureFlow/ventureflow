package com.example.venture.dto;

import java.util.HashMap;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LPdto {
    private Long id;
    private String name;
    private String email;
    private String contactNo;
    // HashMap<FundName, FundID>
    private HashMap<String, Long> funds;
}
