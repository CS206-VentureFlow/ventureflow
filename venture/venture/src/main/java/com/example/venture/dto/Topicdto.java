package com.example.venture.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@AllArgsConstructor
@Data
public class Topicdto {
    private Long id;
    private String message;
    private String sender;
}
