import request from '../ulits/request';
export const getProductlist = () => {
    return request({
        url: '/product/get_product_list',
        method: 'get',
    })
}
export const getProudet_tags =()=>{
    return request({
        url: '/tags/product',
        method: 'get',
    })
}
export const getProduct_brand_tags =()=>{
    return request({
        url: '/tags/product_brand_tags',
        method: 'get',
    })
}
export const getProduct_color_tags =()=>{
    return request({
        url: '/tags/product_color_tags',
        method: 'get',
    })
}
export const getProduct_price_tags =()=>{
    return request({
        url: '/tags/product_price_tags',
        method: 'get',
    })
}
export const getProduct_rating_tags =()=>{
    return request({
        url: '/tags/product_rating_tags',
        method: 'get',
    })
}
export const Selecttags = (data) => {
    return request({
        url: '/product/select_tags',
        method: 'post',
        data: {
            category:data.category,
            brand:data.brand,
            color:data.color,
            rating:data.rating,
            pricemin:data.pricemin,
            pricemax:data.pricemax
        }
    })
}
export const product_search = (data) => {
    return request({
        url: '/product/product_search',
        method: 'post',
        data: {
            keyword:data
        }
    })
}
export const getProduct_detail = (id) => {
    return request({
        url: `/product/product_detail/${id}`,
        method: 'get',
    })
}
export const purchase_product = (user_id,product_id,product_name,product_price) => {
    return request({
        url: '/center/create_order',
        method: 'post',
        data: {
            user_id:user_id,
            product_id:product_id,
            product_name:product_name,
            product_price:product_price,
            quantity:1,
            status:1,
        }
    })
}
export const addfavorite =(user_id,product_id,product_name,product_price)=>{
    return request({
        url: '/center/create_favorite',
        method: 'post',
        data: {
           user_id:user_id,
           product_id:product_id,
           product_name:product_name,
           product_price:product_price,
        }
    })
}
export const getFavoriteList = (user_id) => {
    return request({
        url: `/center/person_favorite/${user_id}`,
        method: 'get',
    })
}
export const getOrderlist = (user_id) => {
    return request({
        url: `/center/person_order/${user_id}`,
        method: 'get',
    })
}
export const deleteOrder = (id) => {
    return request({
        url: `/center/del_order/${id}`,
        method: 'delete',
    })
}
export const getNewsFavoriteList = (user_id)=>{
    return request.get(`/news/get_favorite/${user_id}`);
}
