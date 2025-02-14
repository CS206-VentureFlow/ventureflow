package com.example.venture.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LP {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    @ManyToMany
    @JoinTable(name = "lp_fund",
        joinColumns =
            @JoinColumn(name="lp_id"),
        inverseJoinColumns =
            @JoinColumn(name="fund_id"))
    private Set<Fund> funds = new HashSet<>();

    public LP(String name, String email, String phoneNumber) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
