import request from '../ulits/request';
export const getCompanyList = () => {
    return request({
        url: '/company/getAll',
        method: 'get',
    })
}
export const tagClass = (data) => {
    return request({
        url: '/company/tag',
        method: 'get',
        params:{
            industry:data
        }
    })
}
export const Search = (data) => {
    return request({
        url: '/company/search',
        method: 'post',
         data:{
            keyword:data
         }
    })
}
export const getCompanyDetail = (id) => {
    return request({
        url: '/company/detail',
        method: 'get',
        params:{
            id:id
        }
    })
}