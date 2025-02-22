package com.example.venture.service;

import com.example.venture.model.Message;
import com.example.venture.repository.MessageRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;

    @Transactional
    public void saveOrUpdateMessage(Message message) {
        messageRepository.save(message);
    }

    public Message getMessageById(Long id) {
        return messageRepository.findById(id).orElse(null);
    }

    @Transactional
    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }
}
