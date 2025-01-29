import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[]=[{
    id:1,
    name:'Miguel',
    lastName:'Bermejo',
    email:'miguelbermejo1@gmail.com',
    username:'miguelbf',
    password:'miguel'
  },
  {
    id:2,
    name:'Jose',
    lastName:'Rodriguez',
    email:'jrodriguez@gmail.com',
    username:'Jose',
    password:'jose'
  }];

  constructor() { }

getAll():Observable<User[]>{
  return of(this.users);
}

}
