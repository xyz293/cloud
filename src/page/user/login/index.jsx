import {Outlet,useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
const LoginMain = () => {
     const navigate = useNavigate();
  useEffect(()=>{
    navigate('login');
  },[])
  return (
    <div>
      <Outlet/>
    </div>
  );
};
export default LoginMain;