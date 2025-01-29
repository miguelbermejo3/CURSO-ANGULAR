import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'form-user',
  imports: [FormsModule],
  templateUrl: './form-user.component.html',
 
})
export class FormUserComponent {

    user:User;
   
  

  constructor(private router:Router,private sharingData:SharingDataService){
    if(this.router.getCurrentNavigation()?.extras.state){
      this.user=this.router.getCurrentNavigation()?.extras.state!['user'];
    }else{
      this.user= new User();
    }
    
  }

  onSubmit(userForm:NgForm):void{
    if(userForm.valid){
      console.log(this.user);
      this.sharingData.newUserEventEmitter.emit(this.user);
    }
   userForm.reset();
   userForm.resetForm();
  }

  onClear(userForm:NgForm):void{
    this.user=new User();
    userForm.reset();
   userForm.resetForm();
  }

 
}
