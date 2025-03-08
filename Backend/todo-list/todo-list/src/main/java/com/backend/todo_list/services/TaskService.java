package com.backend.todo_list.services;

import com.backend.todo_list.dtos.TaskRequestDto;
import com.backend.todo_list.dtos.TaskResponseDto;
import com.backend.todo_list.entities.TaskEntity;
import com.backend.todo_list.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<TaskResponseDto> getAllTasks() {
        List<TaskEntity> tasks = taskRepository.findAll();
        return tasks.stream()
                .map(this::mapToTaskResponseDto)
                .collect(Collectors.toList());
    }

    public Optional<TaskResponseDto> getTaskById(Long id) {
        return taskRepository.findById(id)
                .map(this::mapToTaskResponseDto);
    }

    public TaskResponseDto createTask(TaskRequestDto taskRequestDto) {
        TaskEntity taskEntity = new TaskEntity();
        taskEntity.setTitle(taskRequestDto.getTitle());
        taskEntity.setTask_done(taskRequestDto.isTask_is_done());
        taskEntity.setCreated_at(taskRequestDto.getCreated_at());
        taskEntity.setPriority(taskRequestDto.getPriority());
        taskEntity.setDue_date(taskRequestDto.getDue_date());

        TaskEntity savedTask = taskRepository.save(taskEntity);

        return mapToTaskResponseDto(savedTask);
    }

    public TaskResponseDto updateTask(Long id, TaskRequestDto taskRequestDto) {
        TaskEntity taskEntity = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        taskEntity.setTitle(taskRequestDto.getTitle());
        taskEntity.setTask_done(taskRequestDto.isTask_is_done());
        taskEntity.setCreated_at(taskRequestDto.getCreated_at());
        taskEntity.setPriority(taskRequestDto.getPriority());
        taskEntity.setDue_date(taskRequestDto.getDue_date());

        TaskEntity updatedTask = taskRepository.save(taskEntity);

        return mapToTaskResponseDto(updatedTask);
    }

    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found with id: " + id);
        }

        taskRepository.deleteById(id);
    }

    private TaskResponseDto mapToTaskResponseDto(TaskEntity taskEntity) {
        TaskResponseDto dto = new TaskResponseDto();
        dto.setId(taskEntity.getId());
        dto.setTitle(taskEntity.getTitle());
        dto.setTask_is_done(taskEntity.isTask_done());
        dto.setCreated_at(taskEntity.getCreated_at());
        dto.setPriority(taskEntity.getPriority());
        dto.setDue_date(taskEntity.getDue_date());
        return dto;
    }

}