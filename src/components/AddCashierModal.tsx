import { useState } from 'react';
import { Modal, Button, message, Form } from 'antd';
import AddCashier from './AddCashierForm';

const MyModal = ({ refreshCashiers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      const res = await fetch('/api/addCashier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add cashier');
      }

      form.resetFields();
      refreshCashiers();
      openMessage(); // Display success message after successful submission
      setIsModalOpen(false); // close the modal after submission
    } catch (error) {
      messageApi.error(error.message || 'Error adding cashier');
    }
  };

  const handleCancel = () => setIsModalOpen(false);

  const openMessage = () => {
    messageApi.success({
      content: 'Cashier added successfully!',
      duration: 2,
    });
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        Add Cashier
      </Button>
      <Modal
        title="Add Cashier"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <AddCashier
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          form={form} // Pass form instance to AddCashier component
        />
      </Modal>
    </>
  );
};

export default MyModal;
