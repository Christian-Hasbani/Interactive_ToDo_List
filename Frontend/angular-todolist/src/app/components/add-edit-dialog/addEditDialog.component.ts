import { TaskUpdateService } from '../../services/taskUpdate.service';
import { Component, inject, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { PriorityOptions } from '../../constants/task.constants';
import { TaskService } from '../../services/task.service';
import { TaskRequest } from '../../model/task.request.model';

interface PriorityOption {
  name: string,
  value: Number
}

interface DialogData {
  task?: TaskRequest;
  isEdit: boolean;
  taskId?: string;
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
  templateUrl: './addEditDialog.component.html',
  styleUrl: './addEditDialog.component.scss'
})
export class DialogComponent implements OnInit {
  taskName: string = '';
  dueDate: Date = new Date();
  priorityOptions = PriorityOptions;
  selectedPriority: number | null = null;
  isSubmitting: boolean = false;
  isEditMode: boolean = false;
  taskId: string | undefined;
  dialogTitle: string = 'Add Task';

  private taskService = inject(TaskService);

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private taskUpdateService: TaskUpdateService,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.isEdit && this.data.task) {
      this.isEditMode = true;
      this.dialogTitle = 'Edit Task';
      this.taskId = this.data.taskId;
      this.populateFormWithExistingTask(this.data.task);
    }
  }

  private populateFormWithExistingTask(task: TaskRequest): void {
    this.taskName = task.title;
    this.dueDate = task.due_date ? new Date(task.due_date) : new Date();
    this.selectedPriority = task.priority;
  }

  submitFunction() {
    if (!this.taskName || !this.dueDate || this.selectedPriority === null) {
      // Handle validation error
      console.error('Please fill in all required fields');
      return;
    }

    const taskRequest: TaskRequest = {
      title: this.taskName,
      task_is_done: this.isEditMode ? this.data.task?.task_is_done || false : false,
      created_at: this.isEditMode ? this.data.task?.created_at || new Date().toISOString() : new Date().toISOString(),
      due_date: this.dueDate.toISOString(),
      priority: this.selectedPriority
    };

    this.isSubmitting = true;

    if (this.isEditMode && this.taskId) {
      this.updateTask(this.taskId, taskRequest);
    } else {
      this.createTask(taskRequest);
    }
  }

  private createTask(taskRequest: TaskRequest): void {
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

  private updateTask(taskId: string, taskRequest: TaskRequest): void {
    this.taskService.updateTask(taskId, taskRequest).subscribe({
      next: (data) => {
        console.log('Task updated successfully:', data);
        this.taskUpdateService.notifyTaskUpdated();
        this.dialogRef.close(data);
      },
      error: (err) => {
        console.error('Error updating task:', err);
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}