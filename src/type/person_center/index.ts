export interface Order{
    pay_time:string;
    product_id:number;
    product_name:string;
    product_price:number;
    quantity:number;
    create_time:string;
}
export interface Favoriteorder{
    product_id:number;
   product_name:string;
   product_price:number;
   create_time:string;
}