package com.example.venture.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("V")
public class VC extends User {

    @OneToMany(mappedBy = "vc", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Fund> funds;

    public VC(String name, String email, String phoneNumber) {
        super(name, email, phoneNumber);
    }
}
