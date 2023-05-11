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
            taskService.addTask(addRequest);
            return ResponseEntity.ok().body("Task added.");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }

    @PostMapping("/lists/tasks/delete")
    public ResponseEntity<?> deleteTask(@RequestParam Long taskId){
        try {
            taskService.deleteTask(taskId);
            return ResponseEntity.ok().body("Task added.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }

    @PostMapping("/lists/tasks/change/{taskId}")
    public ResponseEntity<?> changeTaskInfo(@PathVariable Long taskId, @RequestBody TaskRequestObject taskRequestObject){
        try {
            taskService.changeTaskInfo(taskId, taskRequestObject);
            return ResponseEntity.ok().body("Task info changed.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred on the server");
        }
    }
}
