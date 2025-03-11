import { Component, ViewEncapsulation } from '@angular/core';
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
  dueDate: Date  = new Date();
  priorityOptions = PriorityOptions;
  selectedPriority: Number | null = null;
  
  constructor(private dialogRef:MatDialogRef<DialogComponent>){}

  // TODO: Add POST/PUT functions
  submitFunction(){
    console.log("Task name: ",this.taskName);
    console.log("Task due date: ", this.dueDate),
    console.log("Task priority: ",this.selectedPriority)

    this.dialogRef.close({
      taskName: this.taskName,
      dueDate: this.dueDate,
      selectedPriority: this.selectedPriority
    })
  }
}
