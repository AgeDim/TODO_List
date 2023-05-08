package com.example.backtodo.controller;

import com.example.backtodo.DTO.TaskRequestObject;
import com.example.backtodo.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000/lists/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/")
    public ResponseEntity<?> getTasks(@RequestParam Long listId){
        try {
            return ResponseEntity.ok(taskService.getTasks(listId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addTask(@RequestBody TaskRequestObject addRequest){
        try {
            taskService.addTask(addRequest);
            return ResponseEntity.ok().body("Task added.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteTask(@RequestParam Long taskId){
        try {
            taskService.deleteTask(taskId);
            return ResponseEntity.ok().body("Task added.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }

    @PostMapping("/change/{taskId}")
    public ResponseEntity<?> changeTaskInfo(@PathVariable Long taskId, @RequestBody TaskRequestObject taskRequestObject){
        try {
            taskService.changeTaskInfo(taskId, taskRequestObject);
            return ResponseEntity.ok().body("Task info changed.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }
}
