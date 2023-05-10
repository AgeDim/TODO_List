package com.example.backtodo.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "tasks", schema = "public")
public class TaskEntity {

    @Id
    @SequenceGenerator(name = "tasks_id_seq", sequenceName = "tasks_id_seq", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tasks_id_seq")
    @Column(name = "id", columnDefinition = "serial primary key")
    private Long id;

    @Column(name = "name", columnDefinition = "varchar(255) NOT NULL")
    private String name;

    @Temporal(TemporalType.DATE)
    @Column(name="deadline", columnDefinition = "date")
    private Date deadline;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "status NOT NULL")
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(name="priority", columnDefinition = "priority")
    private Priority priority;

    @Column(name = "list_id", columnDefinition = "integer NOT NULL REFERENCES lists ON DELETE RESTRICT")
    private Long listId;

    public TaskEntity(String name, Date deadline, Status status, Priority priority, Long listId){
        this.name = name;
        this.deadline = deadline;
        this.status = status;
        this.priority = priority;
        this.listId = listId;
    }
}
