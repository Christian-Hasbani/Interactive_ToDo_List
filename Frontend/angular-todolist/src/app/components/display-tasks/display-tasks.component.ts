import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-tasks',
  imports: [],
  templateUrl: './display-tasks.component.html',
  styleUrl: './display-tasks.component.scss'
})
export class DisplayTasksComponent implements OnInit{
    constructor(private taskService: TaskService){}

    ngOnInit(): void {
      this.taskService.getAllTasks().subscribe(
        (data) => {
          console.log(data);

        },(error)=>{
          console.log(error);
        }
      );
    }
}
