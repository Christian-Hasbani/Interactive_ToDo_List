import { TaskService } from './../../services/task.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-tasks',
  imports: [],
  templateUrl: './display-tasks.component.html',
  styleUrl: './display-tasks.component.scss'
})
export class DisplayTasksComponent implements OnInit{
    constructor(){}
    private taskService = inject(TaskService);

    ngOnInit(): void {
      this.taskService.getAllTasks().subscribe(
        (data) => {
          console.log(data);
        }
      );
    }
}
