import request from '../ulits/request'
export const getCompanyTag = () => {
    return request({
        url: '/company_tag/tag',
        method: 'get',
    })
}