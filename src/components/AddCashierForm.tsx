import React from 'react';
import { Button, Form, Input, Select } from 'antd';

const AddCashier: React.FC<{ onSubmit: (values: any) => void; onCancel: () => void }> = ({ onSubmit, onCancel }) => {
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
        onFinish={onSubmit} // ✅ Form submission handled here
      >
        <Form.Item label="Enter Name" name="name" rules={[{ required: true, message: 'Please enter the cashier\'s name' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Shift" name="shift" rules={[{ required: true, message: 'Please select a shift' }]}>

          <Select
            defaultValue=''
            style={{ width: 120 }}
            allowClear
            options={[
              { value: 'am', label: 'AM' },
              { value: 'mid', label: 'MID' },
              { value: 'pm', label: 'PM' },
            ]}
            placeholder="select it"
          />
        </Form.Item>

        {/* Button Container positioned at the bottom */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 16 }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit"> {/* ✅ Removed unnecessary onClick */}
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddCashier;
