export interface Order{
    pay_time:string;
    product_id:number;
    product_name:string;
    product_price:number;
    quantity:number;
    status:number;
    create_time:string;
}
export interface Favoriteorder{
    id:number;
    product_id:number;
   product_name:string;
   product_price:number;
   created_at:string;
}
export interface NewsFavoriteorder{
    news_id:number;
    news_title:string;
    content:string;
    category:string;
    cover_url:string;
    create_time:string;
}