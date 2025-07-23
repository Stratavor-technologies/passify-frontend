import React, { useState } from "react";
import { Table, Button, Input, Select } from "antd";
import InfoHeading from "../../assets/images/svg/InfoHeading.svg";
import Trash from "../../assets/images/svg/Trash.svg";
import { useSelector } from "react-redux";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation";

const DynamicTable = ({ onChange, linkType }) => {
  const FormData = useSelector((state) => state.design.formValues);
  const [data, setData] = useState(FormData.links ?? []);
  const [rowIdCounter, setRowIdCounter] = useState(1);

  const addRow = () => {
    const newRow = {
      link_text: "",
      link_href: "",
      link_type: "",
    };

    const newData = [...data, { ...newRow, id: rowIdCounter }];
    setRowIdCounter(rowIdCounter + 1);
    setData(newData);
    onChange(newData);
  };

  const deleteRow = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    onChange(newData);
  };

  const handleInputChange = (e, id, field) => {
    const index = data?.findIndex((item) => item.id === id);
    let newData = [...data];
    // Create a new object for the updated item
    const updatedItem = {
      ...newData[index],
      [field]: e.target.value,
    };

    // Replace the old item in the data array with the new one
    newData[index] = updatedItem;
    setData(newData);
    onChange(newData);
  };

  const handleSelectChange = (value, id) => {
    let newData = [...data];
    const index = newData.findIndex((item) => item.id === id);
    // Create a new object for the updated item
    const updatedItem = {
      ...newData[index],
      link_type: value,
    };

    // Replace the old item in the data array with the new one
    newData[index] = updatedItem;
    setData(newData);
    onChange(newData);
  };

  const columns = [
    {
      title: (
        <>
          <div className="flex gap-[.25rem] text-[.9375rem] font-[500]">
            {getLabelsBySelectedLang("Text")}
            <img src={InfoHeading} alt="InfoHeading" />
          </div>
        </>
      ),
      dataIndex: `{${getLabelsBySelectedLang("gettext")}}`,
      render: (text, record) => (
        <Input
          className="h-[40px]"
          value={record?.link_text}
          placeholder="Add Text"
          onChange={(e) => handleInputChange(e, record.id, "link_text")}
        />
      ),
      width: "30%",
    },
    {
      title: (
        <>
          <div className="flex gap-[.25rem] text-[.9375rem] font-[500]">
            {getLabelsBySelectedLang("Link")}
            <img src={InfoHeading} alt="InfoHeading" />
          </div>
        </>
      ),
      dataIndex: "Link",
      render: (text, record) => (
        <Input
          className="h-[40px]"
          value={record?.link_href}
          placeholder="Add Link"
          onChange={(e) => handleInputChange(e, record.id, "link_href")}
        />
      ),
      width: "30%",
    },
    {
      title: (
        <>
          <div className="flex gap-[.25rem] text-[.9375rem] font-[500]">
            {getLabelsBySelectedLang("Type")}
            <img src={InfoHeading} alt="InfoHeading" />
          </div>
        </>
      ),
      dataIndex: "link_type",
      render: (text, record) => (
        <Select
          value={record?.link_type}
          options={linkType}
          className="w-[100%] h-[40px] selectTable"
          onChange={(value) => handleSelectChange(value, record.id)}
        ></Select>
      ),
      width: "30%",
    },
    {
      title: "      ",
      dataIndex: "actions",
      render: (_, record) => (
        <Button
          type="danger"
          className="text-center w-[50px] flex justify-center h-auto "
          onClick={() => deleteRow(record.id)}
        >
          <img src={Trash} alt="" />
        </Button>
      ),
      width: "10%",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="id" />
      <div
        className=" text-[#7249CB] hover:text-[#7249CB] font-[600] bg-transparent flex justify-end w-full py-4"
        onClick={addRow}
      >
        + {getLabelsBySelectedLang("Add Row")}
      </div>
    </div>
  );
};

export default DynamicTable;
