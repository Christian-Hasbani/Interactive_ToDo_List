import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule, MatCheckboxChange } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { PriorityOptions } from '../../constants/task.constants';
import { Task } from '../../model/task.model';

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

  @Input() task!: Task;

  onCheckboxChange(event: MatCheckboxChange) {
    this.task.task_is_done = event.checked; 
  }

  getPriorityName(priorityValue: number): string {
    const priority = PriorityOptions.find(option => option.value === priorityValue);
    return priority ? priority.name : ''; 
  }
}