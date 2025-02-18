package com.example.venture.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("L")
public class LP extends User {

    @ManyToMany(mappedBy = "lps", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Fund> funds;

    public LP(String name, String email, String phoneNumber) {
        super(name, email, phoneNumber);
    }
}
