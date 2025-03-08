package com.backend.todo_list.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "TSK_TASK")
public class TaskEntity {

    // COLUMNS
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "TSK_TITLE", nullable = false)
    private String title;


    @Column(name = "TSK_TASK_DONE", nullable = false)
    private boolean task_done;


    @Column(name = "TSK_CREATED_AT", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;


    @Column(name = "TSK_PRIORITY")
    private int priority;

    @Column(name = "TSK_DUE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date due_date;

    // GETTERS
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public boolean isTask_done() {
        return task_done;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public int getPriority() {
        return priority;
    }

    public Date getDue_date() {
        return due_date;
    }

    // setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setTask_done(boolean task_done) {
        this.task_done = task_done;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public void setDue_date(Date due_date) {
        this.due_date = due_date;
    }

    @Override
    public String toString() {
        return "TaskEntity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", taskIsDone=" + task_done +
                ", createdAt=" + created_at +
                ", priority=" + priority +
                ", dueDate=" + due_date +
                '}';
    }
}
