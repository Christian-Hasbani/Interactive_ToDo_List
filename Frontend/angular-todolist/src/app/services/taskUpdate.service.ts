import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskUpdateService {
  private taskAddedSource = new Subject<void>();
  
  taskAdded$ = this.taskAddedSource.asObservable();
  
  notifyTaskAdded() {
    this.taskAddedSource.next();
  }
}