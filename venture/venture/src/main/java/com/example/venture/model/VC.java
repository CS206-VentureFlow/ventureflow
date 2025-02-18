package com.example.venture.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("V")
public class VC extends User {

    @OneToMany(mappedBy = "vc")
    private Set<Fund> funds = new HashSet<>();

    public VC(String name, String email, String phoneNumber) {
        super(name, email, phoneNumber);
    }
}
