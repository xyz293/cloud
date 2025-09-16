import { Button ,Collapse} from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import {useEffect,useState} from 'react';
// eslint-disable-next-line no-unused-vars
import { contentContext } from '../../../ulits/content';
import {getlist} from '../../../API/university'
const College = () => {

    const [list,setlist] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('firstpage')
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
        <Button type="primary">我的课程</Button>
      </div>
      <div style={{display:'flex',justifyContent:'center',gap:'40px'}}>
        <contentContext.Provider value={{ list }}>
          <Outlet />
        </contentContext.Provider>
      </div>
    </div>
  );
};

export default College;