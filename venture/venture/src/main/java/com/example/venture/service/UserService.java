package com.example.venture.service;

import com.example.venture.model.*;
import com.example.venture.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // public Set<LP> getAllLPs() {
    //     List<User> lps = userRepository.findByUserType(LP.class);
    //     Set<LP> lpSet = new HashSet<>();
    //     for (User user : lps) {
    //         lpSet.add((LP) user);
    //     }
    //     return lpSet;
    // }

    // public Set<VC> getAllVCs() {
    //     List<User> vcs = userRepository.findByUserType(VC.class);
    //     Set<VC> vcSet = new HashSet<>();
    //     for (User user : vcs) {
    //         vcSet.add((VC) user);
    //     }
    //     return vcSet;
    // }

    public List<Fund> getFundsForUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return null;
        }
        if (user instanceof LP) {
            return ((LP) user).getFunds();
        } else {
            return ((VC) user).getFunds();
        }
    }

    @Transactional
    public User saveOrUpdateUser(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
