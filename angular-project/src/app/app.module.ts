import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesPersonListComponent } from './sales-person-list/sales-person-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http'
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes:Routes=[
  {path: 'products/:id',component:ProductDetailsComponent},
  {path: 'search/:keyword',component:ProductListComponent},
  {path: 'category/:id',component:ProductListComponent},
  {path: 'category',component:ProductListComponent},
  {path: 'products',component:ProductListComponent},
  {path: '',redirectTo:'/products',pathMatch:'full'},
  {path: '**',redirectTo:'/products',pathMatch:'full'}

]

@NgModule({
  declarations: [
    AppComponent,
    SalesPersonListComponent,
    ProductListComponent,
    SearchComponent,
    ProductDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
