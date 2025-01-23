import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

//servicio para pasar información por rutas entre componentes cualquieras
export class SharingDataService {

 private  _idProductEventEmitter: EventEmitter<number> = new EventEmitter();
  private  _productEventEmitter: EventEmitter<Product>=new EventEmitter();

  constructor() { }


  get idProductEventEmitter():EventEmitter<number>{
    return this._idProductEventEmitter;
  }

  get productEventEmitter():EventEmitter<Product>{
    return this._productEventEmitter;
  }
}
