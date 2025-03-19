import React, { useState } from 'react';
import {
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

// importing Pages
import CashiersPage from '../app/pages/cashiers/page'
import Home from '../app/pages/dashboard/page'


const { Header, Footer, Sider, Content} = Layout;



const Dashboard: React.FC = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null); 
  
  const [menuItem, setMenuItem] = useState('1'); // menu item


  const handleMenuClick = ({key}: {key: string }) => {
    setMenuItem(key); 
    

    // passing over pages 
    if (key === '1'){
      setSelectedComponent(
      <CashiersPage />
    );
    }else{
      setSelectedComponent(null);
    }
  }



  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={'1'}
          //selectedKeys={[setMenuItem]} //
          onClick={handleMenuClick}

          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Cashiers'
            },
            {
              key: '2',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
            },
            {
              key: '3',
              icon: <LogoutOutlined />,
              label: 'Logout',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}


            onClick={() => setCollapsed(!collapsed)}


            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
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
          {selectedComponent}
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by USTP
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;