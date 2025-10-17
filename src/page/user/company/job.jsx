import {getJoblist,searchJob} from '../../../API/job'
import {useEffect,useState} from 'react';
import {Button,Input,Modal} from 'antd';
import Application from './application';
const Job = () => {
    const [jobList,setJobList] = useState([]);
    const [isshow,setisshow] = useState(false);
    const [info,setInfo] = useState({
        job_id:'',
        company_id:'',
        department_id:'',
    });
    const [key,setkey] =useState('')
       const show = async (key) => {
        const res = await searchJob(key);
        console.log(res);
        if(res.data.code == 200){
            setJobList(res.data.data);
        }
       }
    useEffect(() => {
        getJoblist().then((res) => {
          console.log(res)
          setJobList(res.data.data);
        })
    }, [])
    return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'20px'}}>
            <Modal title='申请岗位' open={isshow} footer={null} onCancel={() =>{
                setisshow(false)
                setInfo({
                    job_id:'',
                    company_id:'',
                    department_id:'',
                })
            }}> <Application info={info} setisshow={setisshow}/></Modal>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'20px'}}>
            <Input placeholder='请输入岗位名称' style={{width:'400px'}} value={key} onChange={(e) => {setkey(e.target.value)}}/>
            <Button type='primary' onClick={() => {show(key)}}>搜索</Button>
          </div>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'20px'}}>
              {
               jobList.length==0?<p>暂无岗位</p>:
               jobList.map((item) => {
                    return <div key={item.id} style={{display:'flex',flexDirection:'column',width:'300px'}}>
                        <p>工作名称： {item.title}</p>
                        <p>工作描述： {item.description}</p>
                        <p>工作经验： {item.exp}</p>
                        <p>学历要求： {item.edu}</p>
                        <p>薪资范围： {item.salary_min}元 - {item.salary_max}元</p>
                        <Button type='primary' onClick={() => {setisshow(true)
                            setInfo({
                                job_id:item.id,
                                company_id:item.company_id,
                                department_id:item.department_id,
                            })
                        }}>申请岗位</Button>    {/*{applyJob(1,item.id,'已投递',item.company_id,item.department_id).then((res) => {   if(res.data.code == 200){alert('申请成功');}console.log(res) })}*/}
                        </div>
                })
            }
          </div>
        </div>
    )
}
export default Job;