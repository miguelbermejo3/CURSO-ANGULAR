import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter/counter.component';
@Component({
  selector: 'app-root',
  imports: [CommonModule,CounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{


  //declaro las variables para usarlas en el html pudiendo darle valor o tipo
  title = 'Hola Mundo Angular!';
  subTitle='Contador con estado de session'
  usuarios=['Miguel','Antonio','Paco'];
  visible:boolean=false;
  counter:number=0;

  ngOnInit(): void {
    this.counter=parseInt(sessionStorage.getItem('counter') !)|| 0;
  }

  setVisible():void{
    //si es falso cambia a true y viceversa
    this.visible=this.visible? false: true;
    console.log(this.visible);
  }

  setCounter(event:number):void{
    this.counter=event;
  }
}
