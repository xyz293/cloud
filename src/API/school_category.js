import request from '../ulits/request';
export const getSchoolCategory = () => {
    return request({
        url: '/school_category/tag',
        method: 'get',
    })
}