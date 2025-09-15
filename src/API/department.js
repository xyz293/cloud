import request from '../ulits/request'
export const getDepartment = (id) => {
    return request({
        url: '/department/getDepartment',
        method: 'get',
        params:{
            id:id
        }
    })
}
export const getDepartmentByCompanyId = (id,companyid) => {
    return request({
        url: '/department/getDepartmentByCompanyId',
        method: 'get',
        params:{
            id:id,
            companyid:companyid
        }
    })
}