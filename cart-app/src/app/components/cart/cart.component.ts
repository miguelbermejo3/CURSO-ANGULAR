import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',

})
// OnChanges se aplica cuando cambia un estado que proporciona el padre
export class CartComponent implements OnChanges{



  @Input() items: CartItem[] = [];
  total = 0;
  @Output() idProductEventEmitter = new EventEmitter();

  
  ngOnChanges(changes: SimpleChanges): void {
    let itemsChanges = changes['items'];
    this.calculateTotal();
    
      this.saveSession();
    
   
  }

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

  calculateTotal():void{
    this.total=this.items.reduce((total,item)=> total+ item.quantity*item.product.price,0);
  }
  
  saveSession():void{
    sessionStorage.setItem('cart',JSON.stringify(this.items))
  }
  
}
