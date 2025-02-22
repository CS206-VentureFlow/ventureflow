package com.example.venture.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Entity
@NoArgsConstructor
@Data
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "userType", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("U")
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String contactNo;
    private String dashboardLayout;

    public User(String name, String email, String phoneNumber) {
        this.name = name;
        this.email = email;
        this.contactNo = phoneNumber;
        // Default dashboard layout
        this.dashboardLayout = "irr#true#lineChart#6M,moic#true#lineChart#6M,tvpi#true#lineChart#6M,dpi#true#lineChart#6M,rvpi#true#lineChart#6M";
    }
}
