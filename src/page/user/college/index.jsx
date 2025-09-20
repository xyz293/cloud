import { Button ,Collapse} from 'antd';
import { Outlet, useNavigate ,useLocation} from 'react-router-dom';
import {useEffect,useState} from 'react';
// eslint-disable-next-line no-unused-vars
import { contentContext } from '../../../ulits/content';
import {getlist} from '../../../API/university'
import {Modal} from 'antd';
import Verification from './verification';
const College = () => {

    const [list,setlist] = useState([]);
    const [visible, setVisible] = useState(false);
    const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
     if(location.pathname === '/user/college'){
      navigate('firstpage')
     }
    getlist().then(res=>{
      console.log(res)
      setlist(res.data.data);
    })
  },[])
  return (
    <div>
      <div style={{display:'flex',justifyContent:'center',gap:'40px'}}>
        <Button type="primary" onClick={() => navigate('firstpage')}>
          首页
        </Button>
        <Button type="primary" onClick={() => navigate('class')}>
          分类
        </Button>
        <Button type="primary" onClick={() => navigate('my_course')}>
          我的课程
        </Button>
        <Button type="primary" onClick={() => setVisible(true)}>
         高校认证
        </Button>
      </div>
      <div style={{display:'flex',justifyContent:'center',gap:'40px'}}>
        <contentContext.Provider value={{ list }}>
          <Outlet />
        </contentContext.Provider>
        <Modal
          title="高校认证"
          open={visible}
        footer={null}
          onCancel={() => setVisible(false)}
        >
          <Verification  setVisible={setVisible}/>
        </Modal>
      </div>
    </div>
  );
};

export default College;