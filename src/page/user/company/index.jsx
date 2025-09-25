import {Outlet} from 'react-router-dom';
import {useNavigate,useLocation} from 'react-router-dom';
import {useEffect} from 'react'
import {Button} from 'antd';
const Company = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        if(location.pathname==='/user/company'){
             navigate('companylist');
        }
    },[])
    return (
        <div style={{display:'flex',flexDirection:'column', gap:'30px'}}>
            <div style={{display:'flex',justifyContent:'center',gap:'40px'}}>
           <Button type ='link' onClick={()=>{
            navigate('job');
           }} >工作列表</Button>
           <Button type ='link' onClick={()=>{
            navigate('companylist');
           }} >企业列表</Button>
           <Button type ='link' onClick={()=>{
            navigate('my_application');
           }} >我的申请</Button>
            </div>
            <Outlet/>
        </div>
    )
}
export default Company;