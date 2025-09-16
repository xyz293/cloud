import request from '../ulits/request'
export const applyJob = (data) => {
    return request({
        url: '/application/send',
        method: 'post',
        data:{
            job_id:data.job_id,
            user_id:data.user_id,
            company_id:data.company_id,
            department_id:data.department_id,
            state:data.state,
            username:data.username,
            introduction:data.introduction,
        }
    })
}
export const getMyApplication = (data) => {
    return request({
        url: '/application/getmyapplication',
        method: 'get',
        params:{
            id:data
        }
    })
}