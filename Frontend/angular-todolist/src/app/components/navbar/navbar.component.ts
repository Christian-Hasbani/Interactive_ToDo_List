import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ MatIcon,MatButtonModule, MatInputModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
