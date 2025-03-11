import { TaskService } from './../../services/task.service';
import { Component, inject, OnInit } from '@angular/core';
import { TaskComponent } from "../task/task.component";
import { CommonModule } from '@angular/common';


interface Task {
  id: number;
  title: string;
  taskIsDone: boolean;
  createdAt: Date;
  priority: number;
  dueDate: Date;
}

@Component({
  selector: 'app-display-tasks',
  imports: [TaskComponent,CommonModule],
  templateUrl: './display-tasks.component.html',
  styleUrl: './display-tasks.component.scss'
})
export class DisplayTasksComponent implements OnInit{
    tasks: Task[] = [
      {id: 0, title: "Task 1", taskIsDone: true, createdAt: new Date(), priority: 2, dueDate: new Date()},
      {id: 1, title: "Task 2", taskIsDone: false, createdAt: new Date(), priority: 1, dueDate: new Date()},
      {id: 2, title: "Task 3", taskIsDone: false, createdAt: new Date(), priority: 1, dueDate: new Date()},
      {id: 3, title: "Task 4", taskIsDone: false, createdAt: new Date(), priority: 0, dueDate: new Date()},
    ];

    constructor(){}
    private taskService = inject(TaskService);

    ngOnInit(): void {
      this.taskService.getAllTasks().subscribe(
        (data) => {
          //TODO fix the type here
          // this.tasks = data;
        }
      );
    }
}
