import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DialogComponent } from '../add-edit-dialog/addEditDialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ MatIcon,MatButtonModule, MatInputModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px', 
    });
    
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        // Dialog closed with task added
      }
    })
  }
}
