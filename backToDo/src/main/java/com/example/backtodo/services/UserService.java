package com.example.backtodo.services;

import com.example.backtodo.DTO.AuthRequest;
import com.example.backtodo.entity.UserEntity;
import com.example.backtodo.exceptions.UserAlreadyExistsException;
import com.example.backtodo.exceptions.UserNotFoundException;
import com.example.backtodo.exceptions.WrongPasswordException;
import com.example.backtodo.repositories.UserRepository;
import com.example.backtodo.security.Hasher;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void register(AuthRequest authRequest) throws UserAlreadyExistsException {
        if (userRepository.existsByEmail(authRequest.getEmail())) {
            throw new UserAlreadyExistsException("Email is already in use.");
        }
        UserEntity user = new UserEntity(authRequest.getEmail(), Hasher.encryptMD5(authRequest.getPassword()));
        userRepository.save(user);
    }

    public void login(AuthRequest authRequest) throws UserNotFoundException, WrongPasswordException {
        if (!userRepository.existsByEmail(authRequest.getEmail())) {
            throw new UserNotFoundException(authRequest.getEmail());
        }
        UserEntity entity = userRepository.findByEmail(authRequest.getEmail());
        if (!Hasher.encryptMD5(authRequest.getPassword()).equals(entity.getPassword())) {
            throw new WrongPasswordException(authRequest.getEmail());
        }
    }
}