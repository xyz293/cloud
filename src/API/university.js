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
        url: '/university/tag',
        method: 'get',
        params:{
            tag:type
        }
    })
}
export const Address = (key) => {
    return request({
        url: '/university/address',
        method: 'get',
        params:{
          address:key
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
export const getCollege_expert =(id,school_id)=>{
    return request({
        url: '/expert/college',
        method: 'get',
        params:{
            id:id,
            department_id:school_id
        }
    })
}
export const getCollege_course = (id,us_id) => {
    return request({
        url: '/course/college_course',
        method: 'get',
        params:{
            id:id,
            usid:us_id,
        }
    })
}

