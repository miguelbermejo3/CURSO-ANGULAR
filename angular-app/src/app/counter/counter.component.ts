import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  
})
export class CounterComponent implements OnInit{
  counter:number=0;
  @Input() title!:string;
  @Output() counterEmit:EventEmitter<number> = new EventEmitter();
  ngOnInit(): void {
    this.counter= parseInt(sessionStorage.getItem('counter') !)|| 0;
  }


  setCounter():void{
 this.counter++;
 sessionStorage.setItem('counter',this.counter.toString());
 this.counterEmit.emit(this.counter);
  }


}
