import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-user',
  imports: [FormsModule],
  templateUrl: './form-user.component.html',
 
})
export class FormUserComponent {

 @Input() user:User;
  @Output() newUserEventEmitter:EventEmitter<User> = new EventEmitter();
  
  @Output() openEventEmitter=new EventEmitter();

  constructor(){
    this.user= new User();
  }

  onSubmit(userForm:NgForm):void{
    if(userForm.valid){
      console.log(this.user);
      this.newUserEventEmitter.emit(this.user);
    }
   userForm.reset();
   userForm.resetForm();
  }

  onClear(userForm:NgForm):void{
    this.user=new User();
    userForm.reset();
   userForm.resetForm();
  }

  onOpenClose():void{
    this.openEventEmitter.emit();
  }
}
