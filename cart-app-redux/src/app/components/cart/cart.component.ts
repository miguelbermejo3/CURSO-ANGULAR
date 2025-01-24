import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { ItemsState } from '../../store/items.reducer';
import { Store } from '@ngrx/store';
import { total } from '../../store/items.action';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',

})

export class CartComponent implements OnInit{

  items: CartItem[] = [];
  total = 0;

  constructor(private sharingDataService: SharingDataService, private store: Store<{ items: ItemsState }>) {
    this.store.select('items').subscribe(state => {
      this.items = state.items;
      this.total = state.total;
    });

  }
  ngOnInit(): void {
   this.store.dispatch(total());
  }

  onDeleteCart(id: number) {
    this.sharingDataService.idProductEventEmitter.emit(id);
  }

}
