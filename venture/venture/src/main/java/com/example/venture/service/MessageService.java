package com.example.venture.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.venture.dto.Messagedto;
import com.example.venture.model.Message;
import com.example.venture.repository.MessageRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public Message getMessageById(Long id) {
        return messageRepository.findById(id).orElse(null);
    }

    public Messagedto getMessagedto(Long messageId) {
        Message message = getMessageById(messageId);
        if (message == null) {
            return null;
        }

        Set<Long> replies = new HashSet<>();
        for (Message reply : message.getReplies()) {
            replies.add(reply.getId());
        }

        return new Messagedto(message.getId(), message.getMessage(), message.getSender(), replies);
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
