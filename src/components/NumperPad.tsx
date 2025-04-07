import { Input, Button, Popover, Space } from 'antd';
import React, { useState } from 'react';

interface NumberPadProps {
  onChange: (value: number) => void; // NumberPad Props
  currencySymbol?: string;
}

const NumberPad: React.FC<NumberPadProps> = ({ onChange, currencySymbol = '$' }) => {
  const [value, setValue] = useState<string>(''); // Track the value entered
  const [open, setOpen] = useState<boolean>(false); // Track popover state
  const [activeKey, setActiveKey] = useState<string>(''); // Track which key is active -> meaning when key is pressed it will highlight

  // Function to handle value inside the input
  const handleClick = (digit: string) => {
    setValue(prev => prev + digit);
    setActiveKey(digit); // Highlight the key that was pressed
  };

  const handleBackSpace = () => {
    setValue(prev => prev.slice(0, -1));
    setActiveKey('⌫'); // Highlight the backspace key when pressed
  };

  const numberPad = (
    <Space direction="vertical">
      {['123', '456', '789', '0.⌫'].map((row, i) => (
        <Space key={i}>
          {row.split('').map(char => (
            <Button
              key={char}
              onClick={() => {
                if (char === '⌫') {
                  handleBackSpace();
                } else {
                  handleClick(char);
                }
              }}
              style={{
                width: 50,
                backgroundColor: activeKey === char ? '#1890ff' : '', // Highlight pressed key
                color: activeKey === char ? 'white' : '', // Change text color when key is pressed
              }}
              danger={char === '⌫'} // If button character is '⌫', make it red
            >
              {char}
            </Button>
          ))}
        </Space>
      ))}
      <Space>
        <Button
          onClick={() => setValue('')} // Clears the input field
          type="primary"
          style={{
            backgroundColor: '#ff4d4f', // Red tone for clear
            borderColor: '#ff4d4f',
            width: 80,
          }}
        >
          Clear
        </Button>
        <Button
          onClick={() => {
            const num = parseFloat(value.replace(/[^0-9.-]+/g, ''));
            onChange(num); // Send the selected value to the parent
            setOpen(false); // Close the popover after confirming
          }}
          type="primary"
          style={{
            backgroundColor: '#1890ff', // Blue tone for confirm
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedChars = /[0-9.]/;
    if (allowedChars.test(e.key)) {
      setValue(prev => prev + e.key);
      setActiveKey(e.key); // Highlight the key that was pressed
    } else if (e.key === 'Backspace') {
      setValue(prev => prev.slice(0, -1));
      setActiveKey('⌫'); // Highlight the backspace key when pressed
    } else if (e.key === 'Delete') {
      setValue(''); // Resets the value to empty
    } else if (e.key === 'Enter') { // confirm
      const num = parseFloat(value.replace(/[^0-9.-]+/g, ''));
      onChange(num); // Send the selected value to the parent
      setOpen(false);
    }
  };

  return (
    <Popover
      content={numberPad}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      placement="bottom"
    >
      <Input
        value={currencySymbol + "  " + value} // Show currency symbol followed by the entered value
        onClick={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        style={{ width: 250 }}
        placeholder="Tap to input"
      />
    </Popover>
  );
};

export default NumberPad;
