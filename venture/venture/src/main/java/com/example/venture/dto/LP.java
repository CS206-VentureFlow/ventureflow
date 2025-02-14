package com.example.venture.dto;

import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("L")
public class LP extends User {

    @ManyToMany
    @JoinTable(name = "lp_fund",
        joinColumns =
            @JoinColumn(name="lp_id"),
        inverseJoinColumns =
            @JoinColumn(name="fund_id"))
    private Set<Fund> funds = new HashSet<>();

    public LP(String name, String email, String phoneNumber) {
        super(name, email, phoneNumber);
    }
}
