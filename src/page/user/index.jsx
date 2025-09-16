
import { Button, Layout, Menu, theme } from 'antd';
import {Outlet} from 'react-router-dom';
const { Header, Sider, Content } = Layout;
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
const User = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
    useEffect(()=>{
      navigate('/user/company');
    },[])
  return (
    <Layout style={{ minHeight: '100vh' }}> 
      <Sider trigger={null} collapsible >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            { key: '1', label: '企业' ,onClick:()=>{
                navigate('/user/company');
            }},
            { key: '2', label: '教师' ,onClick: ()=>{
                navigate('/user/college');
            } },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
         
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
           <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default User;
