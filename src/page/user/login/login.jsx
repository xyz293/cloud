import {Form,Button,Input,Select} from 'antd';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import useStore from '../../../store/usestore'
import {login} from '../../../API/user'
const Login = () => {
    const navigate = useNavigate();
    const {setToken} = useStore();
    const [user,setUser] = useState({
        username:'',
        password:'',
        role:''
    })
    const loginUser = async () => {
        try {
            const res = await login(user);
            console.log(res);
            if(res.data.code === 200){
                if(res.data.data.role === '学生'){
                    navigate('/user');
                }
                else if(res.data.role === '教师'){
                    navigate('/teacher');
                }
                else if(res.data.role === '企业'){
                    navigate('/company');
                }
                else {
                    alert('身份错误');
                    return;
                }
                setToken(res.data.token);
            }
            else {
              alert(res.data.msg);
              return;
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',boxShadow:'0 0 10px #0e0e0e',height :'100vh'}}>
      <Form layout='vertical'>
        <Form.Item>
          <Input placeholder='请输入用户名' style={{width:'300px'}}/>
        </Form.Item>
        <Form.Item>
          <Input placeholder='电话' style={{width:'300px'}} value={user.phone} onChange={(e)=>setUser({...user,phone:e.target.value})}/>
        </Form.Item>
        <Form.Item>
          <Input.Password placeholder='请输入密码 ' style={{width:'300px'}} value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
        </Form.Item>
        <Form.Item>
          <Select placeholder='请选择身份' style={{width:'300px'}} onChange={(value)=>setUser({...user,role:value})}>
            <Select.Option value='学生'>学生</Select.Option>
            <Select.Option value='教师'>教师</Select.Option>
            <Select.Option value='企业'>企业</Select.Option>
          </Select>
        </Form.Item>
             <Form.Item>
          <Button type='link' onClick={()=>navigate('/register')} style={{width:'300px'}}>有账号？去登录</Button>
        </Form.Item>
        <Form.Item>
          <Button type='primary' style={{width:'300px'}} onClick={()=>{
            loginUser();
          }}>登录</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;