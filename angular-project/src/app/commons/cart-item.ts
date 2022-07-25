import { Product } from "../common/product";

export class CartItem {
    id!:number;
    name!:String;
    unitPrice!:number;
    imageUrl!:String
    quantity!:number
    constructor(product:Product){
        this.id=product.id;
        this.name=product.name;
        this.unitPrice=product.unitPrice;
        this.imageUrl=product.imageUrl;
        this.quantity=1;
    }
}
