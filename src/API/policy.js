import request from '../ulits/request';
export const getPolicy = () => {
    return request({
        url:'/policy/getlist',
        method:'get'
    })
}
export const searchPolicy = (data) => {
    return request({
        url: '/policy/search',
        method: 'post',
         data:{
            key:data
         }
    })
}
export const getPolicyDetail = (id) => {
    return request({
        url: '/policy/detail',
        method: 'get',
        params:{
            id:id
        }
    })
}
export const getComments =(id)=>{
    return request({
        url: '/policy/comment',
        method: 'get',
        params:{
            id:id
        }
    })
}
export const likeCount = (id,policy_id) => {
    return request({
        url: '/policy/like',
        method: 'post',
        data:{
        id:id,
        policy_id:policy_id
        }
    })
}
