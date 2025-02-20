package com.example.venture.dto;

import java.util.HashMap;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Funddto {
    private Long id;
    private String fundName;
    // HashMap<LPName, LPID>
    private HashMap<String, Long> lps;
    private HashMap<String, Long> vc;
}
