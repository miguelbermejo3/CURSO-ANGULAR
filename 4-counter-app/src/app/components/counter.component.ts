import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../store/items.action';

@Component({
  selector: 'counter',
  imports: [],
  templateUrl: './counter.component.html',
  
})
export class CounterComponent {

  title:string='Contador utilizando Redux';
  counter:number=0;

  constructor(private store:Store<{counter:number}>){
    this.store.select('counter').subscribe(counter =>{
      this.counter= counter;
    });

  }

  increment():void{
   // this.counter++;
   this.store.dispatch(increment({add:3}));
    console.log('Incrementando el contador');
  }

  decrement():void{
   // this.counter--;
   this.store.dispatch(decrement());
    console.log('Disminuyendo el contador')
  }

  reset():void{
   // this.counter=0;
   this.store.dispatch(reset());
    console.log('Reseteando el contador');
  }
}
