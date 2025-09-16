import request from '../ulits/request';
export const getDepartment_job = (id,companyid) => {   //第一个公司的id
    console.log(companyid);
    return request({
        url: '/job/getjob',
        method: 'get',
        params:{
            id:id,
           company_id:companyid
        }
    })
}
export const searchJob_department = (name,department_id,company_id) => {
    return request({
        url: '/job/searchjob',
        method: 'get',
        params:{
           name:name,
           department_id:department_id,
           company_id:company_id
        }
    })
}
export const getJoblist =()=>{
    return request({
        url: '/job/getlist',
        method: 'get',
    })
}
export const searchJob = (key) => {
    return request({
        url: '/job/search',
        method: 'get',
        params:{
           key:key,
        }
    })
}