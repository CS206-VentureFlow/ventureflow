package com.example.venture.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

/*
* For VC and LP to communicate with each other
* - contains its own set of messages
*/
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Topic {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String topic;
    private String sender;
    @ManyToOne
    private Fund fund;
    @OneToMany(mappedBy = "topic", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Message> replies;

    public Topic(String topic, String sender, Fund fund) {
        this.topic = topic;
        this.sender = sender;
        this.fund = fund;
    }
}
