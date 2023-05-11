package com.example.backtodo.services;

import com.example.backtodo.DTO.TaskRequestObject;
import com.example.backtodo.entity.Priority;
import com.example.backtodo.entity.Status;
import com.example.backtodo.entity.TaskEntity;
import com.example.backtodo.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

@Service
public class TaskService {

    private final DateFormat format = new SimpleDateFormat("dd.MM.yyyy", Locale.ENGLISH);

    @Autowired
    private TaskRepository taskRepository;

    public List<TaskEntity> getTasks(Long listId) {
        return taskRepository.getTaskEntitiesByListId(listId);
    }

    public void addTask(TaskRequestObject taskRequestObject) throws ParseException {
//        TaskEntity taskEntity = new TaskEntity(
//                taskRequestObject.getName(),
//                format.parse(taskRequestObject.getDeadline()),
//                Status.valueOf(taskRequestObject.getStatus()),
//                Priority.valueOf(taskRequestObject.getPriority()),
//                taskRequestObject.getListId()
//        );
        TaskEntity taskEntity = new TaskEntity();
        taskEntity.setName(taskRequestObject.getName());
        taskEntity.setDeadline(format.parse(taskRequestObject.getDeadline()));
        taskEntity.setStatus(Status.valueOf(taskRequestObject.getStatus()));
        taskEntity.setPriority(Priority.valueOf(taskRequestObject.getPriority()));
        taskEntity.setListId(taskRequestObject.getListId());
        System.out.println(taskRequestObject.getListId());

        taskRepository.save(taskEntity);
    }

    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }

    public void changeTaskInfo(Long taskId, TaskRequestObject taskRequestObject) throws ParseException {
        TaskEntity taskEntity = taskRepository.getTaskEntityById(taskId);
        taskEntity.setName(taskRequestObject.getName());
        taskEntity.setDeadline(format.parse(taskRequestObject.getDeadline()));
        taskEntity.setStatus(Status.valueOf(taskRequestObject.getStatus()));
        taskEntity.setPriority(Priority.valueOf(taskRequestObject.getPriority()));
        taskEntity.setListId(taskRequestObject.getListId());
        taskRepository.save(taskEntity);
    }
}
