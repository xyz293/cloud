import {Outlet,useLocation,useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {Button} from 'antd';
const Information = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
      if(location.pathname === '/user/information'){
        navigate('policy');
      }
    },[])
     return (
        <div style={{display:'flex',flexDirection:'column',gap:'30px'}}>
            <div style={{display:'flex',justifyContent:'center',gap:'50px'}}>
                <Button type="primary" onClick={()=>navigate('product')}>商场中心</Button>
                <Button type='primary' onClick={()=>navigate('news')}>新闻中心</Button>
                <Button type='primary' onClick={()=>navigate('policy')}>政策中心</Button>
                <Button type="primary" onClick={()=>navigate('product_person-center')}>个人中心</Button>
            </div>
        <div>
            <Outlet/>
        </div>
        </div>
     )
}
export default Information;