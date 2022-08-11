import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { ShopItService } from 'src/app/services/shop-it.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  checkoutFormGroup!:FormGroup
  totalQuantity!:number
  totalPrice!:number
  creditMonth:number[]=[]
  creditYear:number[]=[]
  constructor(private formBuilder:FormBuilder,private ShopItService:ShopItService) { }

  ngOnInit(): void {

    this.checkoutFormGroup=this.formBuilder.group(
      {
        customer: this.formBuilder.group({
          firstName:[''],
          lastName:[''],
          email:['']
        }),
        shippingAddress:this.formBuilder.group({
          street:[''],
          city:[''],
          state:[''],
          country:[''],
          zipCode:['']
        }),
        billingAddress:this.formBuilder.group({
          street:[''],
          city:[''],
          state:[''],
          country:[''],
          zipCode:['']
        }),
        creditCard:this.formBuilder.group({
          cardType:[''],
          cardName:[''],
          cardNumber:[''],
          securityCode:[''],
          expirationMonth:[''],
          expirationYear:['']
        })
      });


      const startMonth:number=new Date().getMonth()+1;
      this.ShopItService.getCreditMonths(startMonth).subscribe(
        data=>this.creditMonth=data
      )
      this.ShopItService.getCreditYears().subscribe(data=>
          this.creditYear=data
        )
  }


  copyShippingAddressToBillingAddress(event:any){
      if(event.target.checked){
        this.checkoutFormGroup.controls.billingAddress
           .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      }
  
    }
    
 
  



  onSubmit(){
    console.log("Handling Submit Button "+this.checkoutFormGroup.get('customer')?.value)
    console.log("Handling Submit Button "+this.checkoutFormGroup.get('shippingAddress')?.value)

  }

}
