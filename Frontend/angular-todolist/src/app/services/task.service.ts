import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskResponse } from '../model/task.response.model';

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
}
