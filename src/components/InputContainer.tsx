

import { Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';


interface ContainerProps{
  name: string,
  label: string,
  message: string,
  children: React.ReactNode
}

const InputContainer: React.FC<ContainerProps> = ({ 
  name,
  label,
  message,
  children,

}) => {
 
  return (
    <>
      <Form layout="vertical" hideRequiredMark>
        <Form.Item
          name={name}
          label={label}
          rules={[{ required: true, message: message }]}
        >
          {children}

        </Form.Item>
      </Form>
    </>
  );
};

export default InputContainer;