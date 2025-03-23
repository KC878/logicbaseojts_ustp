import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  DashboardOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';


const { Header, Footer, Sider, Content } = Layout;

// Props Interface
interface DashboardProps {
  menuItems: string[];
  content: React.ReactNode;
  footerContent: string;

  headerContent: string; // mayBe Changed depending on what is beingpassed 
  setHeaderContent: React.Dispatch<React.SetStateAction<string>>; 

  mainContent: string;
  setMainContent: React.Dispatch<React.SetStateAction<string>>;
}

const menuIcons = [
  <DashboardOutlined />, 
  <UserOutlined />, 
  <SettingOutlined />,
  <LogoutOutlined />
];


const Dashboard: React.FC<DashboardProps> = ({ 
  menuItems, 
  content, 
  footerContent, 
  
  headerContent, 
  setHeaderContent,

  mainContent, 
  setMainContent
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: '100vh',
          background: '#3fa3da',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
        }}
        width={250} // Expanded Width
        collapsedWidth={80} // Collapsed Width
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 64,
            borderBottom: '1px solid #f0f0f0',
            padding: '0 16px',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '18px',
              color: '#333',
              background: '#e8e9eb'
            }}
          />
        </div>

        {/* Menu */}
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems.map((item, index) => ({
            key: item.toLowerCase(),
            icon: menuIcons[index],
            label: item,
            onClick: () => {
              setHeaderContent(item)
              setMainContent(item)
            }

          }))}
          style={{
            borderRight: 'none',
            background: '#3fa3da'
          }}
         
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        <div className='container-fluid'>

        <Header style={{ textAlign: 'center', padding: 0, background: colorBgContainer, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2>
            {headerContent}
          </h2>
        </Header>
        </div>
        
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {mainContent}
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          {footerContent}
        </Footer>
      </Layout>
    </Layout>
  );
};


export default Dashboard;
