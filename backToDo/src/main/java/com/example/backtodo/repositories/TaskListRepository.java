package com.example.backtodo.repositories;

import com.example.backtodo.entity.TaskListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskListRepository extends JpaRepository<TaskListEntity, Long> {
    List<TaskListEntity> getTaskListEntitiesByUserId(Long userId);

}
