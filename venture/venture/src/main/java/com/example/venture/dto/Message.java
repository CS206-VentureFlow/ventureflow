package com.example.venture.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.compress.harmony.archive.internal.nls.Messages;

import java.util.*;

/*
* For VC and LP to communicate with each other
* - contains its own set of messages
*/
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id @GeneratedValue
    private Long id;
    private String message;
    private String sender;
    @ManyToOne
    private Fund fund;
    @ManyToMany
    @JoinTable(
            name = "message_replies",
            joinColumns = @JoinColumn(name = "message_id"),
            inverseJoinColumns = @JoinColumn(name = "reply_id")
    )
    private Set<Message> replies = new HashSet<>();


}
