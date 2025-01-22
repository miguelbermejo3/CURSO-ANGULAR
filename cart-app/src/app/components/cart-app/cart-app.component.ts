import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CatalogComponent } from '../catalog/catalog.component';
import { CartItem } from '../../models/cartitem';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'cart-app',
  imports: [CatalogComponent,CartModalComponent,NavBarComponent],
  templateUrl: './cart-app.component.html',
  
})
export class CartAppComponent implements OnInit{
//productos del catálogo
  products:Product[]=[];
//productos del carrito
  items:CartItem[]=[];

  //total del carrito
 // total:number=0;

  showCart:boolean=false;

  constructor(private service:ProductService){}


  ngOnInit(): void {
  this.products=this.service.findAll();
 
  this.items=JSON.parse(sessionStorage.getItem('cart')|| '[]') ;
   //this.calculateTotal();
  }

  onAddCart(product:Product):void{
    const hasItem=this.items.find(item =>item.product.id === product.id);

    if(hasItem){
      this.items=this.items.map(item=>{
        if(item.product.id === product.id){
          return {
            ... item, quantity:item.quantity+1
          }
        }
        return item;
      });
    }else{
      this.items=[... this.items, {product:{... product},quantity:1}] //clono el producto en vez de meter exactamente el mismo
    }
   // this.calculateTotal();
   // this.saveSession();
  }


  onDeleteCart(id:number):void{
    this.items=this.items.filter(item => item.product.id != id);
    //Al tener inicializado como array vacio, tenemos que borrar manualmente el último producto, ya que no lo reconoce como un cambio de onchanges
    if(this.items.length===0){
      sessionStorage.removeItem('cart');
    }



   // this.calculateTotal();
   // this.saveSession();
  }

  //YA NO ES NECESARIO CON EL ONCHANGE del hijo
  /*
calculateTotal():void{
  this.total=this.items.reduce((total,item)=> total+ item.quantity*item.product.price,0);
}

saveSession():void{
  sessionStorage.setItem('cart',JSON.stringify(this.items))
}
  */

openCloseCart():void{
  this.showCart=!this.showCart;
}

}
