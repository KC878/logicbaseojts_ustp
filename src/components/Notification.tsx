import React from 'react';
import { Button, message } from 'antd';

import { useState } from 'react'

const Notification: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [displaySuccess, setDisplaySuccess] = useState(false);



  const success = () => {
    messageApi.open({
      type: 'loading',
      content: 'Action in progress..',
      duration: 0,
    });
    // Dismiss manually and asynchronously
    setTimeout(messageApi.destroy, 2500);

  };
  

  return (
    <>
      {contextHolder}
      <Button onClick={success}>Display a loading indicator</Button>
    </>
  );
};

export default Notification;