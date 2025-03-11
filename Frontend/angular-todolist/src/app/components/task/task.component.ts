import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule, MatCheckboxChange } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { PriorityOptions } from '../../constants/task.constants';

interface Task {
  id: number;
  title: string;
  taskIsDone: boolean;
  createdAt: Date;
  priority: number;
  dueDate: Date;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule, 
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})

export class TaskComponent {
  // task: Task = {
  //   id: 0,
  //   title: 'Test Task',
  //   taskIsDone: true,
  //   createdAt: new Date(),
  //   priority: 0,
  //   dueDate: new Date(),
  // };
  @Input() task!: Task;

  onCheckboxChange(event: MatCheckboxChange) {
    this.task.taskIsDone = event.checked; 
  }

  getPriorityName(priorityValue: number): string {
    const priority = PriorityOptions.find(option => option.value === priorityValue);
    return priority ? priority.name : ''; 
  }
}