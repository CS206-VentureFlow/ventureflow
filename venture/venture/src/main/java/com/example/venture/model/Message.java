package com.example.venture.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
// Reply to a topic
public class Message {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;
    private String sender;
    @ManyToOne
    private Topic topic;

    public Message(String message, String sender, Topic topic) {
        this.message = message;
        this.sender = sender;
        this.topic = topic;
    }
}
