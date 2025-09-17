import request from '../ulits/request';
export const getlist =()=>{
    return request({
        url: '/university/getlist',
        method: 'get',
    })
}
export const search =(data)=>{
    return request({
        url: '/university/search',
        method: 'get',
        params:{
            keyword:data
        }
    })
}
export const type =(type)=>{
    return request({
        url: '/university/type',
        method: 'get',
        params:{
            type:type
        }
    })
}
export const Address = (key) => {
    return request({
        url: '/university/address',
        method: 'get',
        params:{
          keyword:key
        }
    })
}
export const detail = (id) => {
    return request({
        url: `/university/university/${id}`,
        method: 'get',
    })
}
export  const getCollege =(id)=>{
    return request({
        url: '/college/detail',
        method: 'get',
        params:{
            id:id
        }
    })
}

