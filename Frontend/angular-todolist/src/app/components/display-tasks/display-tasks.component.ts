import { TaskUpdateService } from './../../services/taskUpdate.service';
import { TaskService } from './../../services/task.service';
import { Component, inject, OnInit } from '@angular/core';
import { TaskComponent } from "../task/task.component";
import { CommonModule } from '@angular/common';
import { TaskResponse } from '../../model/task.response.model';
import { Task } from '../../model/task.model';




@Component({
  selector: 'app-display-tasks',
  imports: [TaskComponent,CommonModule],
  templateUrl: './display-tasks.component.html',
  styleUrl: './display-tasks.component.scss'
})
export class DisplayTasksComponent implements OnInit{
    tasks: Task[] = [];

    constructor(private taskUpdateService:TaskUpdateService){}
    private taskService = inject(TaskService);

    ngOnInit() {
      this.loadTasks();
      //Update the list of tasks when a new task is added      
      this.taskUpdateService.taskAdded$.subscribe(() => {
        // this.loadTasks();
      });
    }

    loadTasks(){
      this.taskService.getAllTasks().subscribe(responses => {
        this.tasks = responses.map(response => ({
          id: response.id,
          title: response.title,
          task_is_done: response.task_is_done,
          created_at: response.created_at ? new Date(response.created_at) : new Date(),
          priority: response.priority ?? 0,
          due_date: response.due_date ? new Date(response.due_date) : new Date()
        }));
      });

    }
}
