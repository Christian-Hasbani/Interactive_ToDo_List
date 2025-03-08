package com.backend.todo_list.dtos;

import java.util.Date;

public class TaskRequestDto {
    private String title;
    private boolean task_is_done;
    private Date created_at;
    private int priority;
    private Date due_date;

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isTask_is_done() {
        return task_is_done;
    }

    public void setTask_is_done(boolean task_is_done) {
        this.task_is_done = task_is_done;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public Date getDue_date() {
        return due_date;
    }

    public void setDue_date(Date due_date) {
        this.due_date = due_date;
    }
}
