package com.example.venture.service;

import com.example.venture.dto.LP;
import com.example.venture.repository.LPRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LPService {
    private final LPRepository lpRepository;

    public LPService(LPRepository lpRepository) {
        this.lpRepository = lpRepository;
    }

    public LP getLPById(Long id) {
        return lpRepository.findById(id).orElse(null);
    }

    @Transactional
    public LP saveLP(LP lp) {
        return lpRepository.save(lp);
    }

    @Transactional
    public LP updateLP(LP lp) {
        // Check if the Fund exists by its ID
        Optional<LP> existingLP = lpRepository.findById(lp.getId());

        if (existingLP.isEmpty()) {
            throw new IllegalArgumentException("LP with ID " + lp.getId() + " does not exist.");
        }

        return lpRepository.save(lp);
    }

    @Transactional
    public void deleteLP(Long id) {
        lpRepository.deleteById(id);
    }

}
