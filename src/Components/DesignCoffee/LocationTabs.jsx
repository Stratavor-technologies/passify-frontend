import React, { useEffect, useState } from "react";
import VideoTutorials from "./videoTutorials";
import Heading from "../reuseableComponents/headingWIthInfo";
import BaseModal from "../reuseableComponents/BaseModal";
import GoogleMapReact from "google-map-react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import BaseInput from "../reuseableComponents/BaseInput";
import { Table } from "antd";
import { MdDelete } from "react-icons/md";
import { get, post } from "../../axios.js";
import { toast } from "react-toastify";
import BaseSwitchBox from "../reuseableComponents/BaseSwitchBox.jsx";
// import { useSelector, useDispatch } from "react-redux";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation.js";
import { useParams } from "react-router-dom";

const LocationTabs = (data) => {
  const params = useParams();
  const { id } = params;

  const [toggleModel, setToggleModel] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [mapCenter, setMapCenter] = useState({
    lat: 24.7136,
    lng: 46.6753,
  });
  const [locationForm, setLocationForm] = useState({
    location_name: "",
    location_by_address: "",
    Longitude: "",
    Latitude: "",
    location_description: "",
  });

  // toggle model
  const handleModel = () => {

    var locationAccess = data?.locationAccess;
    var tableDataLength = tableData.length;

    if(tableDataLength >=  locationAccess){
      toast.error(`You Have To Add Only ${locationAccess} Location`);
      return false;
    }
    setToggleModel(!toggleModel);
  };

  // handle map click

  const handleMapClick = ({ lat, lng }) => {
    setClickedLocation({ lat, lng });
    setLocationForm({
      ...locationForm,
      Latitude: lat,
      Longitude: lng,
    });
  };

  // handle search address
  const handleAddressSearch = async () => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setClickedLocation(latLng);
      setLocationForm({
        ...locationForm,
        Latitude: latLng.lat,
        Longitude: latLng.lng,
      });

      setMapCenter(latLng);
    } catch (error) {
      console.error("Error fetching and parsing data", error);
    }
  };

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  // handle input change

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLocationForm((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
    setAddress(value);
  };

  const passID = localStorage.getItem("userId");

  const handleToggleSwitch = async (checked, record) => {
    try {
      if (!id && !passID) return toast.info("Kindly create pass first.");
      setDisabled(true);
      const displayLocation = await post(
        "pass/updatePassLocation",
        {
          id: id ? id : passID,
          location_id: record?.key,
          display: checked,
        },
        "application/json"
      );

      if (displayLocation.status === "success") {
        setDisabled(false);
        fetchData();

        toast.info(displayLocation.message);
      } else if (displayLocation.status === "error") {
        setDisabled(false);
        toast.error(displayLocation.message);
      }

    } catch (error) {
      setDisabled(false);
      toast.error("Error toggling location:", error);
    }
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      Latitude,
      Longitude,
      location_name,
      location_by_address,
      location_description,
    } = locationForm;

    const body = {
      longitude: Longitude,
      latitude: Latitude,
      location_name,
      location_description,
      location_search: location_by_address,
    };

    try {
      const tableReq = await post(
        "pass/storeNewLocation",
        body,
        "application/json"
      );

      if (tableReq.status === "success") {
        fetchData();
        toast.success(tableReq.message);
        setToggleModel(false);

        // Clear the form fields by updating locationForm state
        setLocationForm({
          location_name: "",
          location_by_address: "",
          Longitude: "",
          Latitude: "",
          location_description: "",
        });
      } else if (tableReq.status === "error") {
        toast.error(tableReq.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // toast.error(error.code);
    }
  };

  // handle Delete TableRow
  const handleDeleteTableRow = (key) => {
    const newTableData = tableData.filter((item) => item.key !== key);
    setTableData(newTableData);
  };

  // table coloumn
  const columns = [
    {
      title: getLabelsBySelectedLang("Address"),
      dataIndex: "Address",
    },
    {
      title: getLabelsBySelectedLang("Location Name"),
      dataIndex: "LocationName",
    },
    {
      title: getLabelsBySelectedLang("Display"),
      dataIndex: "Display",
      render: (text, record) => (
        <>
          <BaseSwitchBox
            defaultChecked={record.Display}
            handleChange={(e) => handleToggleSwitch(e, record)}
            disabled={disabled}
          />
        </>
      ),
    },
    {
      title: getLabelsBySelectedLang("Message"),
      dataIndex: "Message",
    },
    {
      title: getLabelsBySelectedLang("Action"),
      render: (text, record) => (
        <MdDelete
          className="text-[#667680] text-[1.375rem] cursor-pointer"
          onClick={() => handleDeleteTableRow(record.key)}
        />
      ),
    },
  ];

  // get Locations against user

  const fetchData = async () => {
    try {
      const response = await get(`pass/readLocationsOfUser/${id || passID}`);
      if (response.status === "success") {
        const newData = response.data.map((item) => ({
          key: item.id,
          Address: item.location_search,
          LocationName: item.location_name,
          Display: item.pass_locations.length > 0 ? true : false,
          Message: item.location_description,
          ["pass_locations"]: item?.pass_locations,
        }));

        // Update tableData state with the new data
        setTableData(newData);
      } else if (response.status === "error") {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error fetching locations");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-[#ffffff] p-[2rem] rounded-[1rem]">
        <div className="flex justify-between">
          <h1 className="text-[#364349] text-[1.5625rem] font-[500] leading-[2.1875rem]">
            {getLabelsBySelectedLang("Location Details")}
          </h1>
          <VideoTutorials title="Adding Location" />
        </div>

        <div className="flex items-center justify-between mt-5">
          <Heading
            title="Search Location"
            icon={true}
            numberIcon={true}
            number="1"
          />

                <button
                className="bg-[#7249CB] rounded-[.1875rem] py-[.5rem] px-[1.5rem] font-[600] text-[.9375rem] leading-[1.375rem] text-[#FFFFFF]"
                onClick={handleModel}
              >
                {getLabelsBySelectedLang("Add Location")}
              </button>
       
        </div>

        {/* table  */}

        <div className="my-8">
          <Table columns={columns} dataSource={tableData} size="small" />
        </div>

        {/* model  */}

        <BaseModal toggleModel={toggleModel} handleClose={handleModel}>
          <div className="flex justify-between w-full gap-3">
            <div className="w-[50%]">
              <form id="submitForm" onSubmit={handleSubmit}>
                <BaseInput
                  labelValue={getLabelsBySelectedLang("Location Name")}
                  placeholder="Location Name"
                  name="location_name"
                  className="h-[3.125rem] border text-[#ABB4B9] text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
                  handleChange={handleInputChange}
                />
                <BaseInput
                  labelValue={getLabelsBySelectedLang(
                    "Search for location by address"
                  )}
                  placeholder="Search for location by address"
                  name="location_by_address"
                  className="h-[3.125rem] border text-[#ABB4B9] text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
                  handleChange={handleInputChange}
                  handleSearch={handleAddressSearch}
                />
                <BaseInput
                  labelValue={getLabelsBySelectedLang("Longitude")}
                  placeholder="Longitude"
                  inputValue={locationForm.Longitude || ""}
                  name="Longitude"
                  className="h-[3.125rem] border text-[#ABB4B9] text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
                  handleChange={handleInputChange}
                />
                <BaseInput
                  labelValue={getLabelsBySelectedLang("Latitude")}
                  placeholder="Latitude"
                  inputValue={locationForm.Latitude || ""}
                  name="Latitude"
                  className="h-[3.125rem] border text-[#ABB4B9] text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
                  handleChange={handleInputChange}
                />
                <BaseInput
                  labelValue={getLabelsBySelectedLang("Location Description")}
                  placeholder="Location Description"
                  name="location_description"
                  type="textarea"
                  handleChange={handleInputChange}
                  inputValue={locationForm.location_description}
                  className="py-5 border text-[#ABB4B9] w-full text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
                />
              </form>
            </div>
            <div className="w-[50%]">
              {/* Google Map */}
              <div className="w-[100%] h-[100%]">
                <GoogleMapReact
                  key={`${mapCenter.lat}-${mapCenter.lng}`}
                  bootstrapURLKeys={{
                    key: "AIzaSyDYxbvsaLJWHoD41beX5o19038MQUHLaYM",
                  }}
                  defaultCenter={mapCenter}
                  defaultZoom={defaultProps.zoom}
                  onClick={handleMapClick}
                >
                  {clickedLocation && (
                    <div
                      lat={clickedLocation.lat}
                      lng={clickedLocation.lng}
                      style={{
                        width: ".625rem",
                        height: ".625rem",
                        backgroundColor: "red",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </GoogleMapReact>
              </div>
            </div>
          </div>

          <div className=" flex justify-between mt-5">
            <button
              className="py-[.5rem] px-[1.5rem] rounded-[.1875rem] bg-red-500 text-white"
              onClick={handleModel}
            >
              {getLabelsBySelectedLang("Close")}
            </button>
            <button
              className="py-[.5rem] px-[1.5rem] rounded-[.1875rem] bg-[#3f286f] text-white"
              type="submit"
              form="submitForm"
            >
              {getLabelsBySelectedLang("Save")}
            </button>
          </div>
        </BaseModal>
      </div>
    </>
  );
};

export default LocationTabs;
