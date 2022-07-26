import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/commons/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {


  cartItems:CartItem[]=[];
  totalPrice!:number;
  totalQuantity!:number;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.listCartItems();
  }
  
  

 

  listCartItems(){
      this.cartItems=this.cartService.cartItems;
      console.log(this.cartItems)

      this.cartService.totalPrice.subscribe(
        data=>this.totalPrice=data
      );
      this.cartService.totalQuantity.subscribe(
        data=>this.totalQuantity=data
      );

      this.cartService.computeCartTools()
  }

  incrementQuantity(cartItem:CartItem){
    this.cartService.addToCart(cartItem)
  }

  decrementQuantity(cartItem:CartItem){
    this.cartService.remove(cartItem)
  }

}
