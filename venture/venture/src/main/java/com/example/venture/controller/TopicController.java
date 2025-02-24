package com.example.venture.controller;

import com.example.venture.dto.*;
import com.example.venture.model.*;
import com.example.venture.service.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/topic")
@AllArgsConstructor
public class TopicController {
    private final TopicService topicService;
    private final MessageService messageService;

    // Get all messages for topic
    @GetMapping("/{topicID}")
    public ResponseEntity<Set<Messagedto>> getAllMessages(@PathVariable Long topicID) {
        Topic topic = topicService.getTopicById(topicID);
        if (topic == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(topicService.getMessages(topicID), HttpStatus.OK);
    }

    // New Message for topic
    @PostMapping("/{topicID}/newMessage")
    public ResponseEntity<String> addMesaage(@PathVariable Long topicID, @RequestBody Messagedto messagedto) {
        Topic topic = topicService.getTopicById(topicID);
        if (topic == null) {
            return new ResponseEntity<>("Topic not found", HttpStatus.BAD_REQUEST);
        }
        Message message = new Message(messagedto.getMessage(), messagedto.getSender(), topic);
        messageService.saveOrUpdateMessage(message);
        return new ResponseEntity<>("Message added", HttpStatus.OK);
    }

}
