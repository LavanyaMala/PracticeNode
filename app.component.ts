import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{ NavBarComponent } from './nav-bar/nav-bar.component'
import{ UserListComponent } from './user-list/user-list.component'
import{ UserAddComponent } from './user-add/user-add.component'
import { NgFor, NgIf } from '@angular/common';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf,NavBarComponent,UserListComponent,UserAddComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practiceapp';
}
