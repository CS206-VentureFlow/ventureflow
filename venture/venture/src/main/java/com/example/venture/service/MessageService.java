package com.example.venture.service;

import com.example.venture.model.*;
import com.example.venture.repository.MessageRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public Message getMessageById(Long id) {
        return messageRepository.findById(id).orElse(null);
    }

    @Transactional
    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    @Transactional
    public Message updateMessage(Message message) {
        if (messageRepository.findById(message.getId()).isEmpty()) {
            throw new IllegalArgumentException("Message with ID " + message.getId() + " does not exist.");
        }

        return messageRepository.save(message);
    }

    @Transactional
    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }
}
