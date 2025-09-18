import request from '../ulits/request'
export const getCourse = (id) => {
    return request({
        url:'/course/university',
        method:'get',
        params:{
            id:id
        }
    })
}
export  const search =(keyword,id)=>{
    return request({
        url:'/course/search',
        method:'post',
        data:{
           keyword:keyword,
           id:id
        }
    })
}
export const tagtype = (tag,id) => {
    return request({
        url:'/course/tag',
        method:'post',
        data:{
            tag:tag,
            id:id
        }
    })
}
export const getComment = (id) => {
    return request({
        url:'/comment/comment',
        method:'get',
        params:{
            id:id
        }
    })
}
export const getCourseDetail = (id) => {
    return request({
        url:'/course_content/contentdetail',
        method:'get',
        params:{
            id:id
        }
    })
}
export const postComment = (id,content,course_id,username) => {
    return request({
        url:'/comment/comment',
        method:'post',
        data:{
            user_id:id,
            content:content,
            course_id:course_id,
            username:username
        }
    })
}