package com.example.venture.controller;

import com.example.venture.dto.Messagedto;
import com.example.venture.model.Topic;
import com.example.venture.service.TopicService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/topic")
@AllArgsConstructor
public class TopicController {
    private final TopicService topicService;

    @GetMapping("/{topicID}")
    public ResponseEntity<Set<Messagedto>> getTopic(@PathVariable Long topicID) {
        Topic topic = topicService.getTopicById(topicID);
        if (topic == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(topicService.getMessages(topicID), HttpStatus.OK);
    }
}
