package com.example.venture.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.venture.dto.*;
import com.example.venture.model.*;
import com.example.venture.repository.*;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TopicService {

    private final TopicRepository topicRepository;
    private final MessageRepository messageRepository;

    public Topic getTopicById(Long id) {
        return topicRepository.findById(id).orElse(null);
    }

    @Transactional
    public Topic saveOrUpdateTopic(Topic topic) {
        return topicRepository.save(topic);
    }


    @Transactional
    public void deleteTopic(Long id) {
        topicRepository.deleteById(id);
    }

    // Get Topicdto
    public Topicdto getTopicdto(Long topicId) {
        Topic topic = getTopicById(topicId);
        if (topic == null) {
            return null;
        }
        return new Topicdto(topic.getId(), topic.getTopic(), topic.getSender());
    }

    // Get all messages associated with a topic
    public Set<Messagedto> getMessages(Long topicId) {
        Topic topic = getTopicById(topicId);
        if (topic == null) {
            return null;
        }

        Set<Messagedto> allMessages = new HashSet<>();
        for (Message message : topic.getReplies()) {
            allMessages.add(new Messagedto(message.getMessage(), message.getSender()));
        }

        return allMessages;
    }
}
