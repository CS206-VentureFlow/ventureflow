package com.example.venture.service;

import com.example.venture.model.VC;
import com.example.venture.repository.VCRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VCService {

    private final VCRepository vcRepository;

    public VCService(VCRepository vcRepository) {
        this.vcRepository = vcRepository;
    }

    public VC getVCById(Long id) {
        return vcRepository.findById(id).orElse(null);
    }

    @Transactional
    public VC saveVC(VC vc) {
        return vcRepository.save(vc);
    }

    @Transactional
    public VC updateVC(VC vc) {
        Optional<VC> existingVC = vcRepository.findById(vc.getId());
        if (existingVC.isEmpty()) {
            throw new IllegalArgumentException("VC with ID " + vc.getId() + " does not exist.");
        }
        return vcRepository.save(vc);
    }

    @Transactional
    public void deleteVC(Long id) {
        vcRepository.deleteById(id);
    }
    
}
