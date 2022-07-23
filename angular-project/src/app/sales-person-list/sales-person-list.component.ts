import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {


  salesPersonList:SalesPerson[]=[
    new SalesPerson("Syed","Rahim","s.rahim@gmail.com",1111),
    new SalesPerson("Mahmood","Shahid","m.shahid@gmail.com",2222),
    new SalesPerson("Kister","Unzela","k.unzela@gmail.com",33),
    new SalesPerson("Hammad","Zuleqa","m.zuelqa@gmail.com",1444.99),

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
