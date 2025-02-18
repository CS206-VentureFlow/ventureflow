package com.example.venture.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fund {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fundName;

    // Mapped Users
    @ManyToMany(mappedBy = "funds")
    private Set<LP> lps = new HashSet<>();
    @ManyToOne
    @JoinColumn(name = "vc_id")
    private VC vc;

    // Fund Excel Data
    @OneToMany
    private List<FundData> fundData = new ArrayList<>();

    // Fund Notifications and Messages
    @OneToMany(mappedBy = "fund")
    private Set<Notification> notifications = new HashSet<>();
    @OneToMany(mappedBy = "fund")
    private Set<Message> messages = new HashSet<>();

    public Fund(String fundName, Set<LP> lps, VC vc) {
        this.fundName = fundName;
        this.lps = lps;
        this.vc = vc;
    }
}
