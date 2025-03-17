import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskUpdateService {
  private taskAddedSource = new Subject<void>();
  private taskUpdatedSource = new Subject<void>();

  taskAdded$ = this.taskAddedSource.asObservable();
    taskUpdated$ = this.taskUpdatedSource.asObservable();
    
  notifyTaskAdded() {
    this.taskAddedSource.next();
  }
  notifyTaskUpdated() {
    this.taskUpdatedSource.next();
  }
}