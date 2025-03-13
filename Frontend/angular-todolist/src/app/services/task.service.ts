import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskResponse } from '../model/task.response.model';
import { TaskRequest } from '../model/task.request.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private url : string = "http://localhost:8080/api/tasks";

  constructor() { }
  
  getAllTasks():Observable<TaskResponse[]>{
    return this.http.get<TaskResponse[]>(this.url);
  }

  createTask(task: Partial<TaskRequest>): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.url, task);
  }

}
