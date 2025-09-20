import request from '../ulits/request';
export const getVerification = (id,college,university) => {
    return request({
        url:'/verification/getVerification',
        method:'get',
        params:{
            student_id:id,
            university_name:university,
            college_name:college
        }
    })
}
export const postVerification = (data) => {
    return request({
        url:'/verification/verification',
        method:'post',
        data:{
            student_id:data.student_id,
            university_name:data.university_name,
            college_name:data.college_name,
            student_name:data.student_name,
            grade:data.grade
        }
    })
}