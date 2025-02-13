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
public class Fund {
    @Id @GeneratedValue
    private Long id;
    private String fundName;
    @ManyToMany(mappedBy = "funds")
    private Set<LP> lps = new HashSet<>();
    @ManyToOne
    @JoinColumn(name = "vc_id")
    private VC vc;
    @OneToMany(mappedBy = "fund")
    private Set<Notification> notifications = new HashSet<>();
    @OneToMany
    private List<FundData> fundData = new ArrayList<>();
}
