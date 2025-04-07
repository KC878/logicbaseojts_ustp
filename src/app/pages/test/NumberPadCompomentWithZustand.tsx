

import { Input, Button, Popover, Space } from 'antd';
import React, { useState } from 'react';

import { useNumberPad } from '@src/hooks/useNumberPad';

const NumberPad = () => {
  const { 
    
    numberPad, setNumberPad,
    open, setOpen,
    numberPadValue, setNumberPadValue,
    handleKeyDown, setHandleKeyDown,

  
  } = useNumberPad();


  // const [value, setValue] = useState('');
  // const [open, setOpen] = useState(false);


  // function to handle Value inside the input
  const handleClick = (digit: string) => {
    setNumberPadValue(prev => prev + digit);
  }

  const handleBackSpace = () => {
    setNumberPadValue(prev => prev.slice(0, -1));
  }


  
  const componentNumberPad = (
    <Space direction='vertical'>
      {['123', '456', '789', '0.⌫'].map((row, i) => (
        <Space key={i}>
          {row.split('').map(char => (
            <Button key={char} 
              
              onClick={() =>  {
                if(char === '⌫'){
                  handleBackSpace();
                } else{
                  handleClick(char)}
                }
              }
              style={{ width: 50 }}
              danger={char === '⌫'} // if button characeter is that assign that prop
            > 
              {char}
            </Button>
          ))}
        </Space>

      ))}
      <Space>
        <Button
          onClick={() => setNumberPadValue('')} // clears the input field
          type='primary'
          style={{
            backgroundColor: '#ff4d4f', // red tone for clear
            borderColor: '#ff4d4f',
            width: 80,
          }}
        > 
          Clear
        </Button>
        <Button
          onClick={() => setOpen(false)}
          type="primary"
          style={{
            backgroundColor: '#1890ff', // blue tone for confirm
            borderColor: '#1890ff',
            fontWeight: 'bold',
            borderRadius: 4,
            width: 80,
          }}
        > 
          Confirm
        </Button>
      </Space>
    </Space>

  );


  const componentHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedChars = /[0-9.]/;
    if(allowedChars.test(e.key)) {
      setNumberPadValue(prev => prev + e.key);
    }else if (e.key === 'Backspace') {
      setNumberPadValue(prev => prev.slice(0, -1));
    }else if (e.key === 'Delete') {
      setNumberPadValue(''); // resets the value to empty
    }
  };
  

  // assign values  
  setNumberPad(componentNumberPad); 
  setHandleKeyDown(componentHandleKeyDown); 
  

  return (
    <Popover 
      content={numberPad}
      trigger={'click'}
      open={open}
      onOpenChange={setOpen}  
    > 
      <Input 
        value={numberPadValue}
        onClick={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        style={{ width: 200 }}
        placeholder='Tap to input'
      />
  

    </Popover>

  );
}

export default NumberPad;