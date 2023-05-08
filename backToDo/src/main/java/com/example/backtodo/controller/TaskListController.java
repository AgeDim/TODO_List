package com.example.backtodo.controller;

import com.example.backtodo.DTO.TaskListAddRequest;
import com.example.backtodo.services.TaskListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000/lists")
public class TaskListController {

    @Autowired
    private TaskListService taskListService;

    @GetMapping("/")
    public ResponseEntity<?> getLists(@RequestParam String user){
        try {
            return ResponseEntity.ok(taskListService.getListsByUser(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addList(@RequestBody TaskListAddRequest addRequest){
        try {
            taskListService.addTaskList(addRequest.getEmail(), addRequest.getTitle());
             return ResponseEntity.ok("Task list added.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteList(@RequestParam Long taskListId){
        try {
            taskListService.deleteTaskList(taskListId);
            return ResponseEntity.ok("Task list added.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }
}
