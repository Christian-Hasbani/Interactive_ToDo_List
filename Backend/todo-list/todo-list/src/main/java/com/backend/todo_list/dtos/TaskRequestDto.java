package com.backend.todo_list.dtos;

import java.util.Date;

public class TaskRequestDto {
    private String title;
    private boolean task_is_done;
    private Date created_at;
    private int priority;
    private Date due_date;
}
