
import { Layout, Menu, theme } from 'antd';
import {Outlet} from 'react-router-dom';
const { Header, Sider, Content } = Layout;
import {useNavigate,useLocation} from 'react-router-dom';
import {useEffect} from 'react';
const User = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
    useEffect(()=>{
    if(location.pathname === '/user'){
      navigate('/user/company');
    }
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
            { key: '1', label: '企业信息' ,onClick:()=>{
                navigate('/user/company');
            }},
            { key: '2', label: '高校信息' ,onClick: ()=>{
                navigate('/user/college');
            } },
            { key: '3', label: '信息中心' ,onClick: ()=>{
                navigate('/user/information');
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
