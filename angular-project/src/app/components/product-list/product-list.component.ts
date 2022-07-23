import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  currentCategoryId!:number;

  constructor(private ProductService:ProductService, private  route:ActivatedRoute) { 
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
    this.ProductService.getProductList(this.currentCategoryId).subscribe(
      data=>{
        this.products=data;
      }
    )
  }

}
