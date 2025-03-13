import { TaskUpdateService } from './../../services/taskUpdate.service';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { PriorityOptions } from '../../constants/task.constants';
import { TaskService } from '../../services/task.service';
import { TaskRequest } from '../../model/task.request.model';

interface PriorityOption {
  name: string,
  value: Number
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButton, 
    MatDivider, 
    MatInputModule, 
    MatIconModule, 
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],  
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  taskName: string = '';
  dueDate: Date = new Date();
  priorityOptions = PriorityOptions;
  selectedPriority: number | null = null;
  isSubmitting: boolean = false;

  private taskService = inject(TaskService);
  
  constructor(private dialogRef: MatDialogRef<DialogComponent>,
    private taskUpdateService: TaskUpdateService
  ) {}

  

  submitFunction() {
    if (!this.taskName || !this.dueDate || this.selectedPriority === null) {
      // Handle validation error
      console.error('Please fill in all required fields');
      return;
    }

    const taskRequest: TaskRequest = {
      title: this.taskName,
      task_is_done: false, 
      created_at: new Date().toISOString(), 
      due_date: this.dueDate.toISOString(),
      priority: this.selectedPriority
    };

    this.isSubmitting = true;
    this.taskService.createTask(taskRequest).subscribe({
      next: (data) => {
        console.log('Task created successfully:', data);
        this.taskUpdateService.notifyTaskAdded();      
        this.dialogRef.close(data);
      },
      error: (err) => {
        console.error('Error creating task:', err);
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
  
  
  
}
