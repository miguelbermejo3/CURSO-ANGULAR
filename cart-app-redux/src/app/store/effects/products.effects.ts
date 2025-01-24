import { inject, Injectable } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, exhaustMap,map } from "rxjs";
import { findAll, load } from "../products.action";

@Injectable()
export class ProductsEffects{

    loadProduct$ = createEffect(
        () => inject(Actions).pipe(
            ofType(load),
            exhaustMap(() => this.service.findAll())
        ).pipe(
            map(products => (findAll({ products }))),
            catchError(()=> EMPTY)
        )
    );

    constructor(private service: ProductService) { }

  
}