import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { DisplayTasksComponent } from "./components/display-tasks/display-tasks.component";

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, DisplayTasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = signal('angular-todolist');

}
