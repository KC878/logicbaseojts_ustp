import React from 'react';
import { Button, Form, Input, Select } from 'antd';

interface AddCashierProps {
  onSubmit: (values: { name: string; shift: string }) => void;
  onCancel: () => void;
}

const AddCashier: React.FC<AddCashierProps> = ({ onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Form
        form={form}
        name="add_cashier"
        labelCol={{ flex: '110px' }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ flex: 1, maxWidth: 600 }}
        onFinish={onSubmit} // ✅ Correctly handling form submission
      >
        <Form.Item 
          label="Enter Name" 
          name="name" 
          rules={[{ required: true, message: "Please enter the cashier's name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item 
          label="Shift" 
          name="shift" 
          rules={[{ required: true, message: 'Please select a shift' }]}
        >
          <Select
            style={{ width: 120 }}
            allowClear
            placeholder="Select shift"
            options={[
              { value: 'am', label: 'AM' },
              { value: 'mid', label: 'MID' },
              { value: 'pm', label: 'PM' },
            ]}
          />
        </Form.Item>

        {/* Button Container positioned at the bottom */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 16 }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddCashier;
