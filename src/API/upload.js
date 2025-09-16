import request from '../ulits/request';
export const chuncks = (data) => {
      return request({
        url: '/upload/chunk',
        method: 'post',
        data:data
    })
}
export const merge = (data) => {
    return request({
        url: '/upload/merge',
        method: 'post',
        data:data
    })
}