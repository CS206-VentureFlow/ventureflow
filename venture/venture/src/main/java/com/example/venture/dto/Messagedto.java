package com.example.venture.dto;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Messagedto {
    private Long id;
    private String message;
    private String sender;
    // Contains the IDs of direct replies
    private Set<Long> replies;
}
