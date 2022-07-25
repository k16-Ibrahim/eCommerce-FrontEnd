import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartItem } from 'src/app/commons/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  product =new Product()

  constructor(private route:ActivatedRoute,private productService:ProductService,private cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( ()=>
      this.showProductDetails()
    )
  }
  addToCart(){
    const cartItem=new CartItem(this.product);
    this.cartService.addToCart(cartItem);
    
  }
  showProductDetails(){
      const theProductId= +this.route.snapshot.paramMap.get('id')!;
      this.productService.getProducts(theProductId).subscribe(
        data=>{
          this.product=data;
        }
      )
  }




}
