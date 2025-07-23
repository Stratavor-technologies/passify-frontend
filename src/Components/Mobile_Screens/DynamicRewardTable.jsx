import React, { useState } from "react";
import { Table, Select, Button } from "antd";
import { useSelector } from "react-redux";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";


const { Option } = Select;

const DynamicTable = ({ stampCount, onChange }) => {
  const savedFormData = useSelector((state) => state.design.formValues);
  const initialData = savedFormData?.reward_at_stamp_no ?? [];
  const [data, setData] = useState(initialData);

  const handleSelectChange = (value, index) => {
    const newData = [...data];
    newData[index] = value;
    setData(newData);
    onChange?.(newData);
  };

  const handleDeleteRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    onChange && onChange(newData);
  };

  const handleAddRow = () => {
    if (data.length < stampCount && data.length < 4) {
      const newData = [...data, { key: data.length }];
      setData(newData);
      onChange && onChange(newData);
    } else if (data.length === 4) {
      toast.warning("You have reached the reward limit.");
    }
    else if (data.length === 0) {
      toast.info("please increase number of stamps!")
    }
  };

  const getOptions = () => {
    return Array.from({ length: stampCount }, (_, i) => (
      <Option key={i} value={`${i + 1}`}>
        {i + 1}
      </Option>
    ));
  };

  const columns = [
    {
      title: `${getLabelsBySelectedLang("Select Option")}`,
      dataIndex: "selectedValue",
      width: "70%",
      render: (_, record, index) => (
        <Select
          value={record}
          defaultValue={`${index + 1}`}
          onChange={(value) => handleSelectChange(value, index)}
          style={{ width: "100%" }}
        >
          {getOptions()}
        </Select>
      ),
    },
    {
      title: `${getLabelsBySelectedLang("Delete")}`,
      width: "30%",
      dataIndex: "delete",
      render: (_, record, index) => (
        <Button type="link" danger onClick={() => handleDeleteRow(index)}>
          <MdDelete className="text-[1.4375rem]" />
        </Button>
      ),
    },
  ];

  return (
    <>
      <div>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          bordered
        />
      </div>
      <div className="bg-[#fff] flex justify-end">
        <a
          className="text-[#7249CB] text-[15px] leading-[24px] font-[600] py-3 cursor-pointer"
          onClick={handleAddRow}
        >
          + {getLabelsBySelectedLang("Add Row")}
        </a>
      </div>
    </>
  );
};

export default DynamicTable;
