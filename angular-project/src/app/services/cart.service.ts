import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../commons/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems:CartItem[]=[];
  totalPrice:Subject<number>=new Subject<number>();
  totalQuantity:Subject<number>=new Subject<number>();

  constructor() { }

    addToCart(cartItem:CartItem){


      let existingCartItem:CartItem=undefined!;
      let alreadyExistingCartItem:boolean=false;

      if(this.cartItems.length>0){

        this.cartItems.find(tempCartItem=>tempCartItem.id===cartItem.id)

        // for(let tempCartItem of this.cartItems ){
        //     if(tempCartItem.id==cartItem.id){
        //       existingCartItem=tempCartItem;
        //       break;
        //     }
        // }
      }
      alreadyExistingCartItem=(existingCartItem!=undefined);
      if(alreadyExistingCartItem){
        console.log(existingCartItem.quantity+" existingCartItem")      
        existingCartItem.quantity++;
      }else{
         this.cartItems.push(cartItem);
      }
      this.computeCartTools();

    }
        
    computeCartTools(){

      let totalQuantityValue:number=0;
      let totalPriceValue:number=0;
      for(let cartItem of this.cartItems){
          totalPriceValue+=cartItem.unitPrice*cartItem.quantity;
          totalQuantityValue+=cartItem.quantity;
      }
      this.totalPrice.next(totalPriceValue);
      this.totalQuantity.next(totalQuantityValue);
      this.logCartData(totalPriceValue,totalQuantityValue);
    }

    logCartData(totalPriceValue:number,totalQuantityValue:number){
      console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantityValue: ${totalQuantityValue}`);
      console.log('-------');
    }



}
