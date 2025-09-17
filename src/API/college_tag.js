import request from '../ulits/request'
export const getTag = () => {
    return request({
        url: 'course_tag/tag',
        method: 'get',
    })
}