package com.example.backtodo.controller;


import com.example.backtodo.DTO.AuthRequest;
import com.example.backtodo.exceptions.UserAlreadyExistsException;
import com.example.backtodo.exceptions.UserNotFoundException;
import com.example.backtodo.exceptions.WrongPasswordException;
import com.example.backtodo.security.JwtUtils;
import com.example.backtodo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest user) {
        try {
            userService.register(user);
            return ResponseEntity.ok(jwtUtils.generateToken(user.getEmail()));
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest user) {
        try {
            userService.login(user);
            return ResponseEntity.ok(jwtUtils.generateToken(user.getEmail()));
        } catch (UserNotFoundException | WrongPasswordException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/check")
    public ResponseEntity<?> check(@RequestHeader(HttpHeaders.AUTHORIZATION) String auth) {
        String token = jwtUtils.restructJwtHeader(auth);
        if(token != null){
            if(jwtUtils.validateToken(token)){
                return ResponseEntity.ok(jwtUtils.generateToken(jwtUtils.getEmailFromToken(token)));
            }
        }
        return ResponseEntity.ok("LOGOUT");
    }

}