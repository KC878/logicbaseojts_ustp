
import { Select, Space } from 'antd';


interface OptionsType {
  options: { label: string, value: string }[]
}

const handleChange = (value: string[]) => {
  console.log(`Selected: ${value}`);
};

const SelectMultiple: React.FC<OptionsType> = ( { options } ) => {

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Select
          mode="multiple"
          size='middle'
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          onChange={handleChange}
          style={{ width: '100%' }}
          options={options.map(option => (
            { label: option, value: option }
          ))}
        />

      </Space>
    </>
  );
};

export default SelectMultiple;