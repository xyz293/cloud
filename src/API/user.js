import request from '../ulits/request';
export const sendcode = (data) => {  //3671263704
    return request({
        url: '/user/sendcode',
        method: 'get',
        params:{
            phone:data.phone
        }
    })
}
export const register = (data) => {
    return request({
        url: '/user/regiser',
        method: 'post',
        data:{
            username:data.username,
            password:data.password,
            phone:data.phone,
            nickname:data.nickname,
            code:data.code
        }
    })
}
export const login = (data) => {
    return request({
        url: '/user/login',
        method: 'post',
        data:{
            phone:data.phone,
            password:data.password,
            role:data.role
        }
    })
}