import request from '../ulits/request'
export const getProvinceList = () => {
    return request({
        url: '/province/tag',
        method: 'get',
    })
}