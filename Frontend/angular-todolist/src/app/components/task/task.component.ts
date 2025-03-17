import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../add-edit-dialog/addEditDialog.component';
import { TaskService } from '../../services/task.service';
import { TaskUpdateService } from '../../services/taskUpdate.service';
import { PriorityOptions } from '../../constants/task.constants';
import { TaskRequest } from '../../model/task.request.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ]
})
export class TaskComponent {
  @Input() task!: TaskRequest;
  @Input() taskId!: string;
  // Ensure this is a string emitter, not an Event
  @Output() taskDeleted = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private taskUpdateService: TaskUpdateService
  ) {}

  getPriorityName(priorityValue: number | null): string {
    if (priorityValue === null) {
      return 'None';
    }
    const priorityOption = PriorityOptions.find(option => option.value === priorityValue);
    return priorityOption ? priorityOption.name : 'Unknown';
  }

  onCheckboxChange(event: any): void {
    // Update task completion status in the backend
    const updatedTask: TaskRequest = {
      ...this.task,
      task_is_done: event.checked
    };
    
    this.taskService.updateTask(this.taskId, updatedTask).subscribe({
      next: () => {
        // Optional: Show a success message
        this.snackBar.open('Task status updated', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error updating task status:', err);
        // Revert the checkbox state if there was an error
        this.task.task_is_done = !event.checked;
        this.snackBar.open('Failed to update task status', 'Close', { duration: 3000 });
      }
    });
  }

  onEditTask(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        isEdit: true,
        task: this.task,
        taskId: this.taskId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // The dialog was closed with a result, meaning the task was updated
        // You can update the local task data if needed
        this.task = result;
        this.snackBar.open('Task updated successfully', 'Close', { duration: 3000 });
      }
    });
  }

  onDeleteTask(): void {
    if (window.confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.taskId).subscribe({
        next: () => {
          this.taskDeleted.emit(this.taskId.toString()); // Ensure string emission
          this.taskUpdateService.notifyTaskAdded();
          this.snackBar.open('Task deleted successfully', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error deleting task:', err);
          this.snackBar.open('Failed to delete task', 'Close', { duration: 3000 });
        }
      });
    }
  }
}