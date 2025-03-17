import { TaskComponent } from './../task/task.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskUpdateService } from '../../services/taskUpdate.service';
import { Subscription } from 'rxjs';
import { TaskResponse } from '../../model/task.response.model';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-tasks',
  imports:[
    CommonModule,
    TaskComponent
  ],
  templateUrl: './display-tasks.component.html',
  styleUrls: ['./display-tasks.component.scss']
})
export class DisplayTasksComponent implements OnInit, OnDestroy {
  tasks: Array<{id: string, data: any}> = []; // Ensure task.id is a string
  private taskAddedSubscription: Subscription | undefined;
  private taskUpdatedSubscription: Subscription | undefined;

  constructor(
    private taskService: TaskService,
    private taskUpdateService: TaskUpdateService
  ) {}

  ngOnInit(): void {
    this.loadTasks();

    // Subscribe to task added/updated events
    this.taskAddedSubscription = this.taskUpdateService.taskAdded$.subscribe(() => {
      this.loadTasks();
    });

    this.taskUpdatedSubscription = this.taskUpdateService.taskUpdated$.subscribe(() => {
      this.loadTasks();
    });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.taskAddedSubscription) {
      this.taskAddedSubscription.unsubscribe();
    }
    if (this.taskUpdatedSubscription) {
      this.taskUpdatedSubscription.unsubscribe();
    }
  }

  loadTasks(): void {
    this.taskService.getTasks().pipe(
      map((taskResponses: TaskResponse[]) => {
        // Transform TaskResponse[] to the expected format
        return taskResponses.map(task => ({
          id: task.id.toString(), // Convert number to string
          data: {
            title: task.title,
            task_is_done: task.task_is_done,
            created_at: task.created_at,
            due_date: task.due_date,
            priority: task.priority
          }
        }));
      })
    ).subscribe({
      next: (transformedData) => {
        this.tasks = transformedData;
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
      }
    });
  }

  // Make sure the parameter type matches what's emitted from the task card
  onTaskDeleted(taskId: string): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
  
}