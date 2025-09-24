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