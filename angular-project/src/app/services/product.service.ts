import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl='http://localhost:8080/products'
  
  constructor(private HttpClient:HttpClient) { }



  getProductListByPagination(thePageNumber:number,thePageSize:number,currentCategoryId:number): Observable<GetResponse> {

    console.log("thePageNumber "+(thePageNumber) + " thePageSize"+thePageSize+" currentCategoryId"+currentCategoryId)

    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${currentCategoryId}&page=${thePageNumber}&size=${thePageSize}`;
     return this.HttpClient.get<GetResponse>(searchUrl);
}

  getProductList(theCategoryId:number): Observable<Product[]> {

        const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
      return this.HttpClient.get<GetResponse>(searchUrl).pipe(
        map(response=>response._embedded.products)
      )
  }

  getProducts(productId:number){
      const searchUrl= `${this.baseUrl}/${productId}`;
      return this.HttpClient.get<Product>(searchUrl);
  }

  searchProducts(theKeyword:String){
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.HttpClient.get<GetResponse>(searchUrl).pipe(
      map(response=>response._embedded.products)
    )
  }

}
interface GetResponse{
  _embedded:{
    products:Product[]
  },
  page : {
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}

