import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

import { CartItem } from '../../models/cartitem';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'cart-app',
  imports: [NavBarComponent,RouterOutlet],
  templateUrl: './cart-app.component.html',
  
})
export class CartAppComponent implements OnInit{

//productos del carrito
  items:CartItem[]=[];

  //total del carrito
  total:number=0;

  

  constructor(private service:ProductService,private sharingDataService:SharingDataService,private router:Router){}


  ngOnInit(): void {
  
 
  this.items=JSON.parse(sessionStorage.getItem('cart')|| '[]') ;
   this.calculateTotal();
   this.onDeleteCart();
   this.onAddCart();
  }

  onAddCart():void{

    this.sharingDataService.productEventEmitter.subscribe(product =>{
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
      this.calculateTotal();
      this.saveSession();
      this.router.navigate(['/cart'], {state:{items:this.items,total:this.total}});

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

          this.items=this.items.filter(item => item.product.id != id);
          //Al tener inicializado como array vacio, tenemos que borrar manualmente el último producto, ya que no lo reconoce como un cambio de onchanges
          if(this.items.length===0){
            sessionStorage.removeItem('cart');
          }
          this.calculateTotal();
          this.saveSession();
          //refrescar la página del carro de compra
          this.router.navigateByUrl('/',{skipLocationChange:true}).then(() =>{
            this.router.navigate(['/cart'], {state:{items:this.items,total:this.total}});
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

 
calculateTotal():void{
  this.total=this.items.reduce((total,item)=> total+ item.quantity*item.product.price,0);
}

saveSession():void{
  sessionStorage.setItem('cart',JSON.stringify(this.items))
}
  


}
