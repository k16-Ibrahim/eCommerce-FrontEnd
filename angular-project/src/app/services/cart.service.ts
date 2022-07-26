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


  remove(cartItem:CartItem){
      cartItem.quantity--;
      if(cartItem.quantity==0){
        this.removeItem(cartItem)
      }else{
        this.computeCartTools()
      }
  }

  removeItem(cartItem:CartItem){
    const itemIndex=this.cartItems.findIndex(i=>i.id==cartItem.id);
    if(itemIndex>-1){
      this.cartItems.splice(itemIndex,1)
      this.computeCartTools()
    }
  }


    addToCart(cartItem:CartItem){


      let existingCartItem:CartItem=undefined!;
      let alreadyExistingCartItem:boolean=false;

      if(this.cartItems.length>0){

//        this.cartItems.find(tempCartItem=>tempCartItem.id===cartItem.id)

        for(let tempCartItem of this.cartItems ){
            if(tempCartItem.id==cartItem.id){
              existingCartItem=tempCartItem;
              break;
            }
        }
      }
      alreadyExistingCartItem=(existingCartItem!=undefined);
      if(alreadyExistingCartItem){
        existingCartItem.quantity++;
        console.log(existingCartItem+" existingCartItem Quantity")      
      }else{
         this.cartItems.push(cartItem);
         console.log(cartItem+" cartItem")      

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
      // console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantityValue: ${totalQuantityValue}`);
      // console.log('-------');
    }



}
