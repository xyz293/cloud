import request from '../ulits/request'
export const get_policy = () => {
    return request({
        url:'/tags/policy',
        method:'get'
    })
}