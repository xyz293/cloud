import { useParams } from 'react-router-dom';
import {getDepartmentByCompanyId} from '../../../API/department'
import {getDepartment_job,searchJob_department} from '../../../API/job'
import {useEffect,useState} from 'react'    //第个id是部门id，第二个id是企业id
import {Button,Input} from 'antd';
const Department = () => {
    const { id,companyid } = useParams(); 
    console.log(id,companyid);
    const [jobList,setJobList] = useState([]);
    const [name,setName] = useState('');
    const [department,setDepartment] = useState({});
    const show = async () => {
        const res = await getDepartmentByCompanyId(id,companyid);
        console.log(res);
        setDepartment(res.data.data);
        console.log(companyid);
        const res1 = await getDepartment_job(id,companyid);
        console.log(res1);
        setJobList(res1.data.data);
    }
    const handleSearch = async (name) => {
        const res = await searchJob_department(name,id,companyid);
        console.log(res);
        if(res.data.code==200){
           setJobList(res.data.data);
        }
      
    }
    useEffect(() => {
        show();
    }, []);
    return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'20px'}}>
          <div style={{display:'flex',justifyContent:'center',gap:'20px'}}>
             <Input placeholder='请输入岗位名称' style={{minWidth:'300px',maxWidth:'500px'}} value ={name} onChange={(e)=>{
                setName(e.target.value);
             }}/>
             <Button type='primary' onClick={()=>{
              console.log(name);
                handleSearch(name);
             }}>搜索</Button>
          </div>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <p>部门名称： {department.name}</p>
            <p>部门介绍： {department.description}</p>
            <p>管理人：{department.manager}</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'20px'}}>
            <p>岗位列表：</p>
            {
               jobList.length==0?<p>暂无岗位</p>:
               jobList.map((item) => {
                    return <div key={item.id} style={{display:'flex',flexDirection:'column',width:'300px'}}>
                        <p>工作名称： {item.title}</p>
                        <p>工作描述： {item.description}</p>
                        <p>工作经验： {item.exp}</p>
                        <p>学历要求： {item.edu}</p>
                        <p>薪资范围： {item.salary_min}元 - {item.salary_max}元</p>
                        <Button type='primary'>申请岗位</Button>
                        </div>
                })
            }
          </div>
        </div>
    )
}
export default Department;