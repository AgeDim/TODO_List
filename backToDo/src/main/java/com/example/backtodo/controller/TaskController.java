package com.example.backtodo.controller;

import com.example.backtodo.DTO.TaskRequestObject;
import com.example.backtodo.services.TaskService;
import com.sun.xml.bind.v2.runtime.output.SAXOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/lists/tasks")
    public ResponseEntity<?> getTasks(@RequestParam Long id){
        try {
            return ResponseEntity.ok(taskService.getTasks(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }

    @PostMapping("/lists/tasks/add")
    public ResponseEntity<?> addTask(@RequestBody TaskRequestObject addRequest){
        System.out.println("PISYA");
        try {
            return ResponseEntity.ok().body(taskService.addTask(addRequest));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }

    @PostMapping("/lists/tasks/delete/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id){
        try {
            taskService.deleteTask(id);
            return ResponseEntity.ok().body("Task deleted.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }

    @PostMapping("/lists/tasks/change/{id}")
    public ResponseEntity<?> changeTaskInfo(@PathVariable Long id, @RequestBody TaskRequestObject taskRequestObject){
        try {
            return ResponseEntity.ok().body(taskService.changeTaskInfo(id, taskRequestObject));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }
}
