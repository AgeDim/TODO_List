package com.example.backtodo.controller;

import com.example.backtodo.DTO.TaskListAddRequest;
import com.example.backtodo.services.TaskListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
public class TaskListController {

    @Autowired
    private TaskListService taskListService;

    @GetMapping("/lists")
    public ResponseEntity<?> getLists(@RequestParam String email) {
        try {
            return ResponseEntity.ok(taskListService.getListsByUser(email));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }

    @PostMapping("/lists/add")
    public ResponseEntity<?> addList(@RequestBody TaskListAddRequest addRequest) {
        try {
            return ResponseEntity.ok(taskListService.addTaskList(addRequest.getEmail(), addRequest.getTitle()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }

    @PostMapping("/lists/delete/{id}")
    public ResponseEntity<?> deleteList(@PathVariable Long id) {
        try {
            taskListService.deleteTaskList(id);
            return ResponseEntity.ok("Task list deleted.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }
}
