import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Products } from '../data/product.data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  findAll():Observable<Product[]>{
    return of( Products);
  }
}
