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
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "lp_fund",
        joinColumns = @JoinColumn(name = "fund_id"),
        inverseJoinColumns = @JoinColumn(name = "lp_id")
    )
    private List<LP> lps;
    @ManyToOne
    @JoinColumn(name = "vc_id")
    private VC vc;

    // Fund Excel Data
    @OneToMany(mappedBy = "fund", cascade = CascadeType.ALL)
    private List<FundData> fundData;

    // Fund Notifications and Topics
    @OneToMany(mappedBy = "fund", cascade = CascadeType.ALL)
    private List<Notification> notifications;
    @OneToMany(mappedBy = "fund", cascade = CascadeType.ALL)
    private List<Topic> topics;

    public Fund(String fundName, List<LP> lps, VC vc) {
        this.fundName = fundName;
        this.lps = lps;
        this.vc = vc;
    }
}
