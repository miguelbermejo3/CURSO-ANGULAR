import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

import { CartItem } from '../../models/cartitem';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';
import { add, remove, total } from '../../store/items.action';


@Component({
  selector: 'cart-app',
  imports: [NavBarComponent,RouterOutlet],
  templateUrl: './cart-app.component.html',
  
})
export class CartAppComponent implements OnInit{

//productos del carrito
  items:CartItem[]=[];
 
  constructor(private sharingDataService:SharingDataService,private router:Router,private store:Store<{items:ItemsState}>){
    this.store.select('items').subscribe(state =>{
      this.items=state.items;
      this.saveSession();
    })

  }

  ngOnInit(): void {
  //  this.store.dispatch(total());
   this.onDeleteCart();
   this.onAddCart();
  }

  onAddCart():void{

    this.sharingDataService.productEventEmitter.subscribe(product =>{

      this.store.dispatch(add({product:product}));
      this.store.dispatch(total())
     
      
      this.router.navigate(['/cart'], {state:{items:this.items}});

      //alerta de aviso
      Swal.fire({
        title: "Carro de compra",
        text: "Nuevo producto añadido al carrito",
        icon: "success"
      });
    });
    
  }


  onDeleteCart():void{
    this.sharingDataService.idProductEventEmitter.subscribe(id=>{
      console.log('Se ha ejecutado el evento idProductEventEmitter');

      //alerta de borrado
      Swal.fire({
        title: "Estás seguro?",
        text: "Estas seguro de eliminar el producto del carro de compra?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar!"
      }).then((result) => {
        if (result.isConfirmed) {

          this.store.dispatch(remove({id:id}));
          this.store.dispatch(total());
          
          //refrescar la página del carro de compra
          this.router.navigateByUrl('/',{skipLocationChange:true}).then(() =>{
            this.router.navigate(['/cart'], {state:{items:this.items}});
          })




          Swal.fire({
            title: "Eliminado!",
            text: "Tu producto ha sido eliminado",
            icon: "success"
          });
        }
      });
    })
   
  }

saveSession():void{
  sessionStorage.setItem('cart',JSON.stringify(this.items))
}
  
}
