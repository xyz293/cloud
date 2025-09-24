import request from '../ulits/request'

export const getNewsList = ()=>{
    return request.get('/news/list');
}

export const getNewsDetail = (id:number)=>{
    return request.get(`/news/detail/${id}`);
}

export const SearchNews = (key:string)=>{
    return request.post('/news/search',{
        key
    });
}

export const getNewstags = ()=>{
    return request.get('/tags/news');
}
export const NewsTags = (tag:string)=>{
    return request.post('/news/tag',{
        tag
    });
}
export const Search = (key:string)=>{
    return request.post('/news/search',{
        key
    });
}
export const getDetail =(id:number)=>{
    return request.get(`/news/detail/${id}`);
}

export const create_favorite = (user_id:number,news_id:number,news_title:string,category:string,content:string,cover_url:string)=>{
    return request.post('/news/create_favorite',{
        user_id:user_id,
        news_id:news_id,
        news_title:news_title,
        category:category,
        content:content,
        cover_url:cover_url
    })
}