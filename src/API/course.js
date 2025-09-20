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
        url:'/course_comment/comment',
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
            courseId:id
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
export const getMyCourse = (id) => {
    return request({
        url:'/course_Center/course_user',
        method:'get',
        params:{
            id:id
        }
    })
}
export const postMyCourse = (user_id, name, image, code, type, university_id, college_id, state, description, college_name) => {
    return request({
        url:'/course_Center/select',
        method:'post',
        data:{
            user_id:user_id,
            name:name,
            image:image,
            code:code,
            type:type,
            university_id:university_id,
            college_id:college_id,
            state:state,
            description:description,
            college_name:college_name
        }
    })
}