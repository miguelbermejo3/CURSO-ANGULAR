import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { FormUserComponent } from './form-user/form-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  imports: [UserComponent,FormUserComponent],
  templateUrl: './user-app.component.html',
  styleUrls:['./user-app.component.css']
})
export class UserAppComponent implements OnInit{

  title:string='Bienvenido USERS';

  users:User[]=[];
  userSelected:User;
  open:boolean=false;

  constructor(private service:UserService){
    this.userSelected=new User();
  }

  ngOnInit(): void {
   this.service.getAll().subscribe(users => this.users = users);
  }

  addUser(user:User){
    if(user.id >0){
      this.users=this.users.map(u => {
        if(u.id == user.id){
          return {... user}
        }
        return u;

      })
    }else{
      this.users=[... this.users,{...user, id:new Date().getTime()}];
    }

    Swal.fire({
      title: "Guardado!",
      icon: "success",
      text:'Usuario guardado con éxito'
    });
    this.userSelected= new User();
    this.setOpen();
   
  }

  removeUser(id:number):void{
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
        this.users=this.users.filter(user=> user.id!=id);
        Swal.fire({
          title: "Borrado!",
          text: "Usuario eliminado",
          icon: "success"
        });
      }
    });
   
  }

  setSelectedUser(user:User):void{
    this.userSelected={... user};
    this.open=true;
  }

  setOpen():void{
    this.open = !this.open;
  }
}
