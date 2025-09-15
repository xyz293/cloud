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