

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
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={name}
              label={label}
              rules={[{ required: true, message: message }]}
            >
              {children}

            </Form.Item>
          </Col>
          </Row>
      </Form>
    </>
  );
};

export default InputContainer;