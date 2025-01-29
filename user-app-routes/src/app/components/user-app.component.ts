import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {

  users: User[] = [];
  


  constructor(private service: UserService, private sharingData: SharingDataService, private router:Router) {
    
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
    
  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe(user => {

      if (user.id > 0) {
        this.users = this.users.map(u => {
          if (u.id == user.id) {
            return { ...user }
          }
          return u;

        })
      } else {
        this.users = [... this.users, { ...user, id: new Date().getTime() }];
      }

      this.router.navigate(['/users'],{state:{users:this.users}});

      Swal.fire({
        title: "Guardado!",
        icon: "success",
        text: 'Usuario guardado con éxito'
      });
      


    })

  }

  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Está seguro de eliminar el usuario?",
        text: "No podrá recuperarlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si,borrar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.users = this.users.filter(user => user.id != id);
          this.router.navigate(['/users/create'],{skipLocationChange:true}).then(() =>{
            this.router.navigate(['/users'],{state:{users:this.users}});
          });
          Swal.fire({
            title: "Borrado!",
            text: "Usuario eliminado",
            icon: "success"
          });
        }
      });
    });
  }


}
