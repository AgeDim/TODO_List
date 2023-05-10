package com.example.backtodo.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "task_lists", schema = "public")
public class TaskListEntity {

    @Id
    @SequenceGenerator(name = "task_lists_id_seq", sequenceName = "task_lists_id_seq", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_lists_id_seq")
    @Column(name = "id", columnDefinition = "serial primary key")
    private Long id;

    @Column(name="name", columnDefinition = "varchar(31) NOT NULL")
    private String name;

    @Column(name="user_id", columnDefinition = "integer NOT NULL REFERENCES users ON DELETE RESTRICT")
    private Long userId;

    public TaskListEntity(String name, Long userId){
        this.name = name;
        this.userId = userId;
    }

}
