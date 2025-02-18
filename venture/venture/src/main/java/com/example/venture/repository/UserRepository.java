package com.example.venture.repository;

import com.example.venture.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT e FROM User e WHERE type(e) = ?1")
    List<User> findByUserType(Class<? extends User> userType);
}
