'use client'
import { Input, Button, Popover, Space } from 'antd';
import { useState } from 'react';

const NumberPadInput = () => {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleClick = (digit: string) => {
    setValue(prev => prev + digit);
  };

  const numberPad = (
    <Space direction="vertical">
      {['123', '456', '789', '0.'].map((row, i) => (
        <Space key={i}>
          {row.split('').map(char => (
            <Button key={char} onClick={() => handleClick(char)} style={{ width: 50 }}>
              {char}
            </Button>
          ))}
        </Space>
      ))}
      <Space>
        <Button onClick={() => setValue(prev => prev.slice(0, -1))} danger>⌫</Button>
        <Button onClick={() => setValue('')} type="primary">Clear</Button>
      </Space>
    </Space>
  );

  return (
    <Popover content={numberPad} trigger="click" open={open} onOpenChange={setOpen}>
      <Input
        value={value}
        onClick={() => setOpen(true)}
        readOnly
        style={{ width: 200 }}
        placeholder="Tap to input"
      />
    </Popover>
  );
};

export default NumberPadInput;
