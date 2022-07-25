import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartItem } from 'src/app/commons/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  currentCategoryId!:number;
  previousCategoryId: number=2;

  //new properties for pagination

  thePageNumber:number=1;
  thePageSize:number=10;
  theTotalElements:number=0;


  constructor(private ProductService:ProductService, private  route:ActivatedRoute,private cartService:CartService) { 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>this.listProducts());
  }
  listProducts(){
    const searchMode=this.route.snapshot.paramMap.has('keyword');
    if(searchMode){
        this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }

  handleSearchProducts(){

    const theKeyword=this.route.snapshot.paramMap.get('keyword')!;
    this.ProductService.searchProducts(theKeyword).subscribe(
      data=>{
          this.products=data;
      }
    )
    
  }

  handleListProducts(){
    const hasCategoryId=this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId= +this.route.snapshot.paramMap.get('id')!;
    }else{
      this.currentCategoryId=2;
    }

    //reset the page for new category id
    if(this.previousCategoryId!=this.currentCategoryId){
      this.thePageNumber=1;
    }
    this.previousCategoryId=this.currentCategoryId;



    this.ProductService.getProductListByPagination(this.thePageNumber-1,this.thePageSize,this.currentCategoryId)
    .subscribe(this.processResult())
    

    // this.ProductService.getProductList(this.currentCategoryId).subscribe(
    //   data=>{
    //     this.products=data;
    //   }
    // )
  }

  processResult(){
   return  (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) =>{
      console.log(data._embedded.products)
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    };
  }

  addToCart(product:Product){
    const theCartItem=new CartItem(product);
    console.log(theCartItem+" theCartItem")
    this.cartService.addToCart(theCartItem);
  }
  
}
