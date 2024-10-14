import { NgFor } from '@angular/common';
import { UserService } from '../user.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  users:any[] =[];

  constructor(private userService: UserService){
    this.userService.getUsers().subscribe({
        next: (data)=>{
          this.users = data;
        },
        error: (err)=>{
          console.log(err)
        }
    });
  }
}