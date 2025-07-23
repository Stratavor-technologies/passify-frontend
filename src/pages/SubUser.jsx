import React, { useEffect, useState } from "react";
import { Table, Space, Modal, Input } from "antd";
import Model from "../Components/Model";
import { get } from "../axios";
import { post, post2 } from "../axios";
import { FaPen } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { getLabelsBySelectedLang } from "../utils/LabelsTranslation";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


const SubUser = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [toggleModel, setToggleModel] = useState(false);
  const [editUserById, setEditUserById] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });


  const [ userCanCreateCount, setUserCanCreateCount ] = useState();
  const [ usersCreated, setUsersCreated ] = useState();
  const [buttonShow, setButtonShow] = useState(false);

  const navigate = useNavigate()

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: getLabelsBySelectedLang("Name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: getLabelsBySelectedLang("Email"),
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: getLabelsBySelectedLang("Phone"),
      dataIndex: "phone",
      key: "phone",
      sorter: true,
    },
    {
      title: getLabelsBySelectedLang("Created At"),
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
      style: { background: "#364349" },
      render: (created_at) => (
        <span>{formatDate(created_at)}</span>
      ),
    },
    {
      title: getLabelsBySelectedLang("Actions"),
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <FaPen
            onClick={() => handleEditClick(record.id)}
            className="cursor-pointer text-[#677781]"
          />
          <AiFillDelete
            onClick={() => deleteUser(record.id)}
            className="cursor-pointer text-[#677781]"
          />
        </Space>
      ),
      style: { background: "black" },
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  // delete user
  const deleteUser = async (user_id) => {
    try {
      Modal.confirm({
        title: "Confirm Delete",
        content: "Are you sure you want to delete this user?",
        onOk: async () => {
          const deleteUserData = await post(`subuser/delete/${user_id}`);
          fetchData();

          if (deleteUserData.status === "success") {
            toast.success(deleteUserData.message);
          }
        },
        onCancel: () => { },
        okButtonProps: { style: { backgroundColor: "#7249cb" } },
      });
    } catch (error) { }
  };

  // edit icon click
  const handleEditClick = (id) => {
    setToggleModel(true);
    setEditUserById(id);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams((prevParams) => ({
      ...prevParams,
      pagination,
      filters,
      ...sorter,
    }));

    if (pagination.pageSize !== prevParams.pagination?.pageSize) {
      setData([]);
    }
  };


  const fetchUserInfo = async () => {
    const responseUser = await post2("user/getUserInfo");
    if (responseUser.status === "success") {
      if (responseUser.data.status == 3 || responseUser.data.status == 4) {
        if (window.location.pathname != "/subscription") {
          return navigate("/subscription");
        }
      }

      setUserCanCreateCount(responseUser?.data?.subscription?.plan?.user_count);
      setButtonShow(true);
    } else if (responseUser.status === "error") {
      toast.error(responseUser.message);
    }


  };

  const handleModel = () => {
      if(parseInt(usersCreated) >= parseInt(userCanCreateCount)){
        toast.error(`You Have To Create Only ${userCanCreateCount} User`);
        return false;
        // return navigate("/subscription");
      }
      
      setToggleModel(!toggleModel);
      setEditUserById();
  };

  // Filter data whenever searchInput changes
  useEffect(() => {
    if (searchInput === "") {
      setFilteredData([]);
      fetchData();
    } else {
      const filteredData = data.filter((user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredData(filteredData);
    }
  }, [searchInput]);

  // get table data
  const fetchData = async () => {
    try {
      const result = await get("subusers/index");
      setData(result.data);
      setUsersCreated(result.data.length);
    } catch (error) {
      toast.error(error)
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchInput]);

  useEffect(() => {
    fetchData();
    fetchUserInfo();
  }, []);

  return (
    <>
      <Model
        toggleModel={toggleModel}
        fetchData={fetchData}
        id={editUserById}
        handleClose={handleModel}
      />

      <div className="dashboard_screen w-[100%] px-5 md:px-[6.125rem] md:pr-[6rem] overflow-auto scroll-hidden">
        <div className="w-full flex justify-between items-center px-2 py-5">
          <h2 className="text-[#364349] text-[1.875rem] font-[500] leading-[2.5rem]">
            {getLabelsBySelectedLang("Users")}
          </h2>
         
            
              <button
                className="py-[.5rem] px-[1.5rem] bg-[#7249CB] rounded-[.1875rem] text-[.9375rem] font-[600] leading-[1.375rem] text-[#ffffff]"
                onClick={buttonShow && handleModel} // Conditionally attaching onClick handler
                >
                + {getLabelsBySelectedLang("Add User")} {/* Button text */}
              </button>
            
         
          
        </div>

        <div className="w-[100%] tableHeight px-2 overflow-y-auto scroll-hidden">
          <div className="bg-[#ffffff] rounded-[1rem] p-[2rem] mb-8">
            <div className="flex justify-end py-4">
              <Input
                className="rounded-[5rem] py-2"
                placeholder="search..."
                onChange={(e) => setSearchInput(e.target.value)}
                style={{ width: 300, color: '#ced4da' }}
                value={searchInput}
                enterButton={false}
                prefix={<CiSearch style={{ transform: 'rotate(90deg)', color: '#ced4da', fontSize: "1.25rem" }} />}
              />
            </div>

            <Table
              columns={columns}
              rowKey={(record) => record.id}
              dataSource={filteredData.length > 0 ? filteredData : data}
              pagination={{
                ...tableParams.pagination,
                showTotal: (total, range) =>
                  `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                position: ['bottomRight']
              }}
              onChange={handleTableChange}
              rowClassName="custom-row"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubUser;
