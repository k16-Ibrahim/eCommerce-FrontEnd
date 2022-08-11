import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopItService {

  constructor() { }

  getCreditMonths(startMonth:number):Observable<number[]>{
      let data:number[]=[]
      for(let i=startMonth;i<=12;i++){
        data.push(i);
      }
      return of(data);
  }

  getCreditYears():Observable<number[]>{
    let data:number[]=[]
    const startYear:number=new Date().getFullYear();
    const endYear:number=startYear+10;
    for(let i=startYear;i<=endYear;i++){
      data.push(i);
    }
    return of(data);
}


}
