import {Form,Button,Input,Select,message} from 'antd';
import {sendcode,register} from '../../../API/user';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        password:'',
        nickname:'',
        phone:'',
        code:'',

    })
    const reg = async () => {
       try {
        const res = await register(user);
        console.log(res);
        if(res.data.code === 200){
            message.success('注册成功');
            navigate('/login');
        }
        else {
          alert(res.data.msg);
          return;
        }
       } catch (error) {
        console.log(error);
       }
    }
    const send = async () => {
        const res = await sendcode(user);
        console.log(res);
    }
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',boxShadow:'0 0 10px #0e0e0e', height: '100vh', background: '#f5f5f5'}}>
      <Form layout='vertical'>
        <Form.Item>
          <Input placeholder='请输入昵称' style={{width:'300px'}} value={user.nickname} onChange={(e)=>setUser({...user,nickname:e.target.value})}/>
        </Form.Item>
        <Form.Item>
          <Input.Password placeholder='请输入密码' style={{width:'300px'}} value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
        </Form.Item>
        <Form.Item>
          <Input placeholder='请输入手机号' style={{width:'300px'}}  value={user.phone} onChange={(e)=>setUser({...user,phone:e.target.value})}/>
        </Form.Item>
        <Form.Item>
          <Input placeholder='请输入验证码' style={{width:'300px'}} value={user.code} onChange={(e)=>setUser({...user,code:e.target.value})}/>
          <Button style={{width:'100px'}} onClick={()=>{
            message.success('获取验证码成功');
            send();
            console.log(user);
          }}>获取验证码</Button>
        </Form.Item>
        <Form.Item>
          <Button type='link' style={{width:'300px'}} onClick={()=>{
            navigate('/login');
          }}>已注册？去登录</Button>
        </Form.Item>
        <Form.Item>
          <Button type='primary' style={{width:'300px'}} onClick={()=>{
            console.log(user);
            reg();
          }}>注册</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;