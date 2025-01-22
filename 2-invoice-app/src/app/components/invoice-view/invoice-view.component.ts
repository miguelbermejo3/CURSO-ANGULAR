import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'invoice-view',
  standalone:true,
  imports: [],
  templateUrl: './invoice-view.component.html',
  
})
export class InvoiceViewComponent {
@Input() name!:string;
@Input() id!:number;
}
