package com.example.backtodo.controller;

import com.example.backtodo.services.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000/tasks")
public class TaskController {

    @Autowired
    public ListService listService;

    @GetMapping("/lists")
    public ResponseEntity<?> getLists(@RequestParam String user){
        try {

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }
}
