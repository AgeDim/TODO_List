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
@Table(name = "tasks", schema = "todo-list")
public class TaskEntity {

    @Id
    @SequenceGenerator(name = "task_id_sequence", sequenceName = "task_id_sequence", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_id_sequence")
    @Column(name = "id", columnDefinition = "serial primary key")
    private Long id;

    @Column(name = "name", columnDefinition = "varchar(255) NOT NULL")
    private String name;

    @Column(name = "comment", columnDefinition = "text")
    private String comment;

    @Temporal(TemporalType.DATE)
    private Date date;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "status NOT NULL")
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(name="priority", columnDefinition = "priority")
    private Priority priority;

    @Enumerated(EnumType.STRING)
    @Column(name = "color", columnDefinition = "color")
    private Color color;

    @Column(name = "list_id", columnDefinition = "integer NOT NULL REFERENCES lists ON DELETE RESTRICT")
    private Long listId;

    public TaskEntity(String name, String comment, Date date, Status status, Priority priority, Color color, Long listId){
        this.name = name;
        this.comment = comment;
        this.date = date;
        this.status = status;
        this.priority = priority;
        this.color = color;
        this.listId = listId;
    }
}
