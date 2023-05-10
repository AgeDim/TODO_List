package com.example.backtodo.services;

import com.example.backtodo.entity.TaskListEntity;
import com.example.backtodo.repositories.TaskListRepository;
import com.example.backtodo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskListService {

    @Autowired
    private TaskListRepository taskListRepository;

    @Autowired
    private UserRepository userRepository;

    public List<TaskListEntity> getListsByUser(String email){
        return taskListRepository.getTaskListEntitiesByUserId(userRepository.findByEmail(email).getId());
    }

    public TaskListEntity addTaskList(String email, String name){
        TaskListEntity taskList = new TaskListEntity(name, userRepository.findByEmail(email).getId());
        return taskListRepository.save(taskList);
    }

    public void deleteTaskList(Long listId){
        taskListRepository.deleteById(listId);
    }
}
