import React, { useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface DashboardLayoutProps {
  menuItems: MenuItem[];
  defaultTitle?: string; // Default title for the dashboard
}

const Dashboard: React.FC<DashboardLayoutProps> = ({ menuItems, defaultTitle = 'Dashboard' }) => {
  // State to manage sidebar collapse and selected component
  const [collapsed, setCollapsed] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(menuItems[0]?.component);
  const [title, setTitle] = useState(defaultTitle); // State for the title

  // Handle Menu Clicks
  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = menuItems.find((item) => item.key === key);
    if (selectedItem) {
      setSelectedComponent(selectedItem.component);
      setTitle(selectedItem.label); // Update the title dynamically
    }
  };

  // Extracting theme tokens
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      {/* Sidebar */}
      <Sider 
        trigger={null} collapsible collapsed={collapsed}
        style={{
          height: '117vh',
          padding: '20px',
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[menuItems[0]?.key]}
          onClick={handleMenuClick}
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
          }))}
        />
      </Sider>

      {/* Header (Title Updates Dynamically) */}
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <span style={{ marginLeft: '16px', fontSize: '18px', fontWeight: 'bold' }}>
            {title}
          </span>
        </Header>

        {/* Content */}
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
          Ant Design ©{new Date().getFullYear()} Created by Cagadas USTP 
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
