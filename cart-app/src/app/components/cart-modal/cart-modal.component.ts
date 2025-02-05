import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'cart-modal',
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html',
  
})
export class CartModalComponent {

  @Input() items:CartItem[]=[];
 // @Input() total=0;

  @Output() idProductEventEmitter=new EventEmitter();
  @Output() closeEventEmitter=new EventEmitter();

  onDeleteCart(id:number){
    this.idProductEventEmitter.emit(id);
  }



  closeCart():void{
    this.closeEventEmitter.emit();
  }
}
