import { Space, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Heading from "../../Components/reuseableComponents/headingWIthInfo.jsx";
import arrowBack from "../../assets/images/svg/arrowBack.svg";
import { get, post } from "../../axios";
import { saveFormValues, saveId } from "../../store/reducers/designSlice.js";
import { rewardOptions } from "../../utils/RewardOption.js";
import { bootstrapIconData } from "../../utils/boostrapIconData.js";
import { imageIconData } from "../../utils/imageIconData.js";
import { qrCodeData } from "../../utils/qrCodeData.js";
import DesignTable from "../Mobile_Screens/DynamicRewardTable.jsx";
import BaseAccordian from "../reuseableComponents/Accordian/BaseAccordian.jsx";
import CommonButton from "../reuseableComponents/BaseButton.jsx";
import BaseColorPicker from "../reuseableComponents/BaseColorPicker.jsx";
import BaseImageUpload from "../reuseableComponents/BaseImageUploader.jsx";
import RadioGroup from "../reuseableComponents/BaseRadio.jsx";
import BaseRadioButtonGroup from "../reuseableComponents/BaseRadioButtonImage.jsx";
import Counter from "../reuseableComponents/Counter.jsx";
import Divider from "../reuseableComponents/Divider.jsx";
import IconComponent from "../reuseableComponents/IconComponent.jsx";
import SelectWithImage from "../reuseableComponents/SelectWithImage.jsx";
import VideoTutorials from "./videoTutorials.jsx";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation.js";
import html2canvas from "html2canvas";
import CanvasStamps from "./CanvasStamps.jsx";
import Categoryicon from "../Icons/Categoryicon";
import { useNavigate } from "react-router-dom";
// import icecream from "../../assets/images/default_logo.png"
// import icecream_bg from "../../assets/images/icecream.jpg"

const DesignTabs = ({ type, handleDesignChange, mobileViewData, setTab, tab }) => {
  const { id } = useParams();
  const savedFormData = mobileViewData;

  const formData = new FormData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [btnLoading, setBtnLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    savedFormData.reward_type ?? 1
  );

  const [passId, setPassId] = useState(null);
  const [capturedImages, setCapturedImages] = useState();
  const [capturedCompleted, setCapturedCompleted] = useState(false);

  const [formValues, setFormValues] = useState({
    reward_type: savedFormData.reward_type ?? 1,
    no_of_stamps: savedFormData.no_of_stamps || 8,
    card_bg_color: savedFormData.card_bg_color || "#EF74A6",
    stamps_color: savedFormData.stamps_color || "rgb(255, 255, 255)",
    stamps_border_color: savedFormData.stamps_border_color || "rgb(255, 255, 255)",
    stamp_image_color: savedFormData.stamp_image_color || "rgb(255, 112, 166)",
    unstamp_image_color: savedFormData.unstamp_image_color || "rgb(255, 255, 255)",
    reward_bg_color: savedFormData.reward_bg_color || "rgb(0, 0, 0)",
    reward_border_color: savedFormData.reward_border_color || "rgb(0, 0, 0)",
    picked_stamps_icon: savedFormData.picked_stamps_icon || "Tea",
    un_stamps_icon: savedFormData.un_stamps_icon || "Tea",
    un_stamp_bg_color: savedFormData.un_stamp_bg_color || "#EF74A6",
    card_txt_color: savedFormData.card_txt_color || "rgb(0, 0, 0)",
    strip_bg_color: savedFormData.strip_bg_color || "rgb(0, 0, 0)",
    un_stamps_image: savedFormData.un_stamps_image || "",
    icon_image: savedFormData.icon_image || "",
    logo_image: savedFormData.logo_image || "",
    qr_type: savedFormData.qr_type || "",
    picked_stamps_image: savedFormData.picked_stamps_image ?? "",
    strip_bg_image: savedFormData.picked_stamps_image ?? "",
    reward_at_stamp_no: savedFormData.reward_at_stamp_no ?? [],
  });

  const [stampCount, setStampCount] = useState(
    formValues.no_of_stamps
  );

  const handleColorChange = (color, name) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: color,
    }));
  };
  const handleRadioButtonChange = (e) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  };
  const handleRadioChange = (event) => {
    setSelectedValue(parseInt(event.target.value, 10));
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [event.target.name]: parseInt(event.target.value, 10),
    }));
  };
  const onImageChange = (name, file) => {
    const updatedFormValues = {
      ...formValues,
      [name]: file,
    };

    setFormValues(updatedFormValues);
    dispatch(saveFormValues(updatedFormValues));
  };
  const handleNumberChange = (name, newValue) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: newValue,
    }));
  };
  const handleSelectChange = (name, value) => {
    const updatedFormValues = {
      ...formValues,
      [name]: value,
    };
    setSelectedValue(value);
    setFormValues(updatedFormValues);
  };
  const handleTableSelectChange = (data) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      reward_at_stamp_no: data,
    }));
  };

  // Submit Form Data //

  const generateStampImages = async () => {
    const stampImages = [];

    for (let i = 0; i <= formValues.no_of_stamps; i++) {
      const captureElement = document.getElementById(`stamp-container-${i}`);
      if (captureElement) {
        try {
          const canvas = await html2canvas(captureElement, {
            backgroundColor: null,
            scale: 10,
          });
          const base64Image = canvas.toDataURL();
          stampImages.push(base64Image);
        } catch (error) {
          console.error("Error capturing stamp image:", error);
        }
      }
    }
    setCapturedCompleted(true);
    setCapturedImages(stampImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true)

    await generateStampImages();
    formData.append("_id", savedFormData.id ? savedFormData.id : id ?? null);
    formData.append("reward_type", formValues.reward_type || 5);
    formData.append("no_of_stamps", formValues?.no_of_stamps);
    formData.append("card_bg_color", formValues.card_bg_color);
    formData.append("stamps_color", formValues.stamps_color);
    formData.append("stamps_border_color", formValues.stamps_border_color);
    formData.append("stamp_image_color", formValues.stamp_image_color);
    formData.append("unstamp_image_color", formValues.unstamp_image_color);
    formData.append("reward_bg_color", formValues.reward_bg_color || "");
    formData.append(
      "reward_border_color",
      formValues.reward_border_color || ""
    );
    formData.append("picked_stamps_icon", formValues.picked_stamps_icon);
    formData.append("un_stamps_icon", formValues.un_stamps_icon);
    formData.append("un_stamp_bg_color", formValues.un_stamp_bg_color);
    formData.append("card_txt_color", formValues.card_txt_color);
    formData.append("strip_bg_color", formValues.strip_bg_color);
    formData.append("qr_type", formValues.qr_type);
    let appurl = id ? 'updateDesignById' : 'storeDesign';
    if (type == "design") {
      if (formValues.un_stamps_image) {
        formData.append("un_stamps_image", formValues.un_stamps_image);
      }

      formData.append("icon_image", formValues.icon_image);
      formData.append("logo_image", formValues.logo_image);

      if (formValues.picked_stamps_image) {
        formData.append("picked_stamps_image", formValues.picked_stamps_image);
      }
      if (formValues.strip_bg_image) {
        formData.append("strip_bg_image", formValues.strip_bg_image);
      }
    } else {
      appurl = 'storeTemplate';
      formData.append("un_stamps_image1", formValues.un_stamps_image);
      formData.append("icon_image1", formValues.icon_image);
      formData.append("logo_image1", formValues.logo_image);
      formData.append("picked_stamps_image1", formValues.picked_stamps_image);
      formData.append("strip_bg_image1", formValues.strip_bg_image);
    }


    formData.append(
      "reward_at_stamp_no",
      JSON.stringify(formValues.reward_at_stamp_no)
    );

    id ? formData.append("id", id) : null;
    formData.append("type", type);

    try {
      const postDataResponse = await post(
        "/pass/" + appurl,
        formData,
        "multipart/form-data"
      );
      if (postDataResponse?.data?.id) {
        setPassId(postDataResponse?.data?.id);
        dispatch(saveId(passId));

      }
      if (postDataResponse.status === "success") {
        toast.success(postDataResponse.message);
        dispatch(saveId(postDataResponse?.data?.id));
        localStorage.setItem("userId", postDataResponse?.data?.id);
        navigate("/design/" + postDataResponse.data.id);

      } else {
        toast.error(postDataResponse.message);
      }

    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false)
    }
  };

  useEffect(() => {
    const sendImagesToAPI = async (id) => {
      try {
        const postData = capturedImages.map((image, index) => ({
          stamp_earned: index.toString(),
          image: image,
        }));
        await post(`/manage/images/${id}`, postData, "application/json");
        if (passId) {
          setTab(1);
        }
      } catch (error) {
        toast.error("Error sending data to API");
      }
    };
    if (passId) sendImagesToAPI(passId);
  }, [capturedCompleted, passId]);

  useEffect(() => {
    handleDesignChange(formValues);
    dispatch(saveFormValues(formValues));
  }, [formValues]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-[#ffffff] p-[1rem] md:p-[2rem] rounded-[1rem]">
          <div className="flex flex-col md:flex-row justify-between">
            <h1 className="text-[#364349] text-[1.5625rem] font-[500] leading-[2.1875rem]">
              {getLabelsBySelectedLang("Designing your Card")}
            </h1>
            <VideoTutorials title="Designing your Card" />
          </div>
          <hr className="text-[#CED4DA] my-[1.5rem]" />
          <div className="flex flex-col md:flex-row items-center gap-[1.875rem]">
            <div className="flex items-center gap-[5px] py-3">
              <Heading
                title="Reward Type"
                number="1"
                icon={true}
                numberIcon={true}
                description={
                  "Your logo will appear on the top right of your digital stamp card."
                }
              />
            </div>
            <div>
              <RadioGroup
                options={rewardOptions}
                selectedValue={selectedValue}
                onRadioChange={handleRadioChange}
                name="reward_type"
              />
            </div>
          </div>
          <hr className="text-[#CED4DA] my-[1.5rem]" />
          <Heading
            title="Logos"
            number="2"
            icon={true}
            numberIcon={true}
            description={
              "Your logo will appear on the top right of your digital stamp card."
            }
          />

          <div className="flex flex-col md:flex-row gap-[3rem] md:gap-[2rem]">
            <div className="w-[100%] md:w-[50%]">
              <p className="text-[#364349] mt-[1rem] mb-[.5rem] text-[.9375rem] font-[600]">
                {getLabelsBySelectedLang("Card Logo")}
              </p>
            </div>
            <div className="w-[100%] md:w-[50%]">
              <p className="text-[#364349] mt-[1rem] mb-[.5rem] text-[.9375rem] font-[600]">
                {getLabelsBySelectedLang("Notification Icon")}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-[3rem] md:gap-[2rem]">
            <div className="w-[100%] md:w-[50%]">
              <BaseImageUpload
                imageValue={formValues?.logo_image}
                name="logo_image"
                onImageChange={onImageChange}
                logoText="Upload logo"
                infoText="Recommended size: 87x87 pixels. Must be square."
              />
            </div>
            <div className="w-[100%] md:w-[50%]">
              <BaseImageUpload
                imageValue={formValues?.icon_image}
                name="icon_image"
                onImageChange={onImageChange}
                logoText="Upload Icon"
                infoText="Recommended size: 87x87 pixels. Must be square."
              />
            </div>
          </div>
          <hr className="mt-[2.5rem] text-[#f74780]  py-4" />
          <Heading
            title="Stamps"
            number="3"
            icon={true}
            numberIcon={true}
            description={
              "Your logo will appear on the top right of your digital stamp card."
            }
          />
          <div className="mt-[1rem] mb-[.5rem]">
            <Heading
              title="Stamps Count"
              number="3"
              icon={false}
              numberIcon={false}
            />
          </div>

          <Counter
            name="no_of_stamps"
            initialValue={parseInt(stampCount)}
            step={1}
            maxLength={50}
            onCounterChange={handleNumberChange}
          />
          <div className="mt-[1.5rem] mb-[.5rem]">
            <Heading
              title="Unstamped icon"
              number="3"
              icon={false}
              numberIcon={false}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-[2rem]">
            <div className="flex flex-col w-[100%] md:w-[50%]">
              <div className=" flex flex-col md:flex-row items-center gap-[2rem]">
                <SelectWithImage
                  selectedValue={formValues?.picked_stamps_icon}
                  options={imageIconData}
                  onChange={handleSelectChange}
                  name="picked_stamps_icon"
                />
                <div className="bg-[#F3EEFF] w-[3.3rem] h-[2.8rem]  rounded-full flex justify-center items-center">
                  {formValues?.picked_stamps_icon &&
                    <Categoryicon icon={formValues?.picked_stamps_icon} color="#677881" width={25} height={25} />
                  }
                </div>
              </div>
              <div className="py-4">
                <Divider title="OR" />
              </div>
            </div>
            <div className="flex flex-col w-[100%] md:w-[50%]">
              <div className="flex flex-col md:flex-row items-center gap-[2rem]">
                <SelectWithImage
                  selectedValue={formValues?.un_stamps_icon}
                  options={imageIconData}
                  onChange={handleSelectChange}
                  name="un_stamps_icon"
                />
                <div className="bg-[#F3EEFF] w-[3.3rem] h-[2.8rem]  rounded-full flex justify-center items-center">
                  {formValues?.un_stamps_icon &&
                    <Categoryicon icon={formValues?.un_stamps_icon} color="#677881" width={25} height={25} />
                  }
                </div>
              </div>
              <div className="py-4">
                <Divider title="OR" />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-[2rem]">
            <div className="flex w-[100%] md:w-[50%]">
              <BaseImageUpload
                imageValue={formValues?.picked_stamps_image}
                name="picked_stamps_image"
                onImageChange={onImageChange}
                logoText="Upload unstamped image"
                infoText="Minimum square resolution of 200 x 200 pixels"
                disabled={formValues?.picked_stamps_icon !== ""}
              />
            </div>
            <div className="flex w-[100%] md:w-[50%]">
              <BaseImageUpload
                imageValue={formValues?.un_stamps_image}
                name="un_stamps_image"
                onImageChange={onImageChange}
                logoText="Upload stamped image"
                infoText="Minimum square resolution of 200 x 200 pixels"
                disabled={formValues?.picked_stamps_icon !== ""}
              />
            </div>
          </div>

          <hr className="text-[#CED4DA] my-[2rem]" />
          <Heading
            title="Colors"
            number="4"
            icon={true}
            numberIcon={true}
            description={
              "Your logo will appear on the top right of your digital stamp card."
            }
          />
          <div className="bg-[#EFEFEF] rounded-[.5rem] my-4">
            <BaseAccordian
              header="Card"
              description="Your logo will appear on the top right of your digital stamp card."
            >
              <div className="flex flex-col md:flex-row gap-[2rem] ">
                <div className="w-[100%] md:w-[50%]">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div className="flex bg-[#ffffff] p-[1rem] rounded-[.25rem] border border-[#CED4DA]">
                      <div>
                        <BaseColorPicker
                          name="card_bg_color"
                          handleChange={(color) =>
                            handleColorChange(color, "card_bg_color")
                          }
                          defaultValue={formValues.card_bg_color}
                          colorPicker
                          inputKey="card_bg_color"
                          value={formValues.card_bg_color}
                          title="Background Color"
                        />
                      </div>
                    </div>
                  </Space>
                </div>
                <div className="w-[100%] md:w-[50%]">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div className="flex bg-[#ffffff] p-[1rem] rounded-[.25rem] border border-[#CED4DA]">
                      <div>
                        <BaseColorPicker
                          name="card_txt_color"
                          handleChange={(color) =>
                            handleColorChange(color, "card_txt_color")
                          }
                          defaultValue={formValues.card_txt_color}
                          colorPicker
                          inputKey="card_txt_color"
                          value={formValues.card_txt_color}
                          title="Text"
                        />
                      </div>
                    </div>
                  </Space>
                </div>
              </div>
            </BaseAccordian>
            <hr className="text-[#CED4DA] my-[.5rem] mx-[1rem]" />
            <BaseAccordian header="Strip Background">
              <div className="flex flex-col md:flex-row gap-[2rem] ">
                <div className="w-[100%] md:w-[50%]">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div className="flex bg-[#ffffff] p-[1rem] rounded-[.25rem] border border-[#CED4DA]">
                      <div>
                        <BaseColorPicker
                          name="strip_bg_color"
                          handleChange={(color) =>
                            handleColorChange(color, "strip_bg_color")
                          }
                          defaultValue={formValues.strip_bg_color}
                          colorPicker
                          inputKey="strip_bg_color"
                          value={formValues.strip_bg_color}
                          title="Background Color"
                        />
                      </div>
                    </div>
                  </Space>
                </div>
                <div className="w-[100%] md:w-[50%]">
                  <BaseImageUpload
                    imageValue={formValues?.strip_bg_image}
                    name="strip_bg_image"
                    onImageChange={onImageChange}
                    logoText="Upload background image"
                    infoText="Must be a minimum of 1125x432px"
                  />
                </div>
              </div>
            </BaseAccordian>
            <hr className="text-[#CED4DA] my-[.5rem] mx-[1rem]" />

            <BaseAccordian header="Stamp Circle">
              <div className="flex flex-col md:flex-row gap-[2rem]">
                <div className="w-[100%] md:w-[50%]">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div className="flex bg-[#ffffff] p-[1rem] rounded-[.25rem] border border-[#CED4DA]">
                      <div>
                        <BaseColorPicker
                          name="stamps_color"
                          handleChange={(color) =>
                            handleColorChange(color, "stamps_color")
                          }
                          defaultValue={formValues.stamps_color}
                          colorPicker
                          inputKey="stamps_color"
                          value={formValues.stamps_color}
                          title="Circle"
                        />
                      </div>
                    </div>
                  </Space>
                </div>
                <div className="w-[100%] md:w-[50%]">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div className="flex bg-[#ffffff] p-[1rem] rounded-[.25rem] border border-[#CED4DA]">
                      <div>
                        <BaseColorPicker
                          name="stamps_border_color"
                          handleChange={(color) =>
                            handleColorChange(color, "stamps_border_color")
                          }
                          defaultValue={formValues.stamps_border_color}
                          colorPicker
                          inputKey="stamps_border_color"
                          value={formValues.stamps_border_color}
                          title="Circle Border"
                        />
                      </div>
                    </div>
                  </Space>
                </div>
              </div>
            </BaseAccordian>
            <hr className="text-[#CED4DA] my-[.5rem] mx-[1rem]" />

            <BaseAccordian header="Stamp">
              <div className="flex flex-col md:flex-row gap-[2rem]">
                <div className="w-[100%] md:w-[50%]">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div className="flex bg-[#ffffff] p-[1rem] rounded-[.25rem] border border-[#CED4DA]">
                      <div>
                        <BaseColorPicker
                          name="stamp_image_color"
                          handleChange={(color) =>
                            handleColorChange(color, "stamp_image_color")
                          }
                          defaultValue={formValues.stamp_image_color}
                          colorPicker
                          inputKey="stamp_image_color"
                          value={formValues.stamp_image_color}
                          title="Stamped Image"
                        />
                      </div>
                    </div>
                  </Space>
                </div>
                <div className="w-[100%] md:w-[50%]">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div className="flex bg-[#ffffff] p-[1rem] rounded-[.25rem] border border-[#CED4DA]">
                      <div>
                        <BaseColorPicker
                          name="unstamp_image_color"
                          handleChange={(color) =>
                            handleColorChange(color, "unstamp_image_color")
                          }
                          defaultValue={formValues.unstamp_image_color}
                          colorPicker
                          inputKey="unstamp_image_color"
                          value={formValues.unstamp_image_color}
                          title="Unstamped Image"
                        />
                      </div>
                    </div>
                  </Space>
                </div>
              </div>
            </BaseAccordian>
            <hr className="text-[#CED4DA] my-[.5rem] mx-[1rem]" />

            <BaseAccordian header="Qr Code">
              <BaseRadioButtonGroup
                defaultValue={formValues.qr_type}
                options={qrCodeData}
                onChange={handleRadioButtonChange}
                name="qr_type"
              />
            </BaseAccordian>
            {formValues?.reward_type === 2 && (
              <>
                <BaseAccordian header="Reward">
                  <div className="flex gap-[2rem]">
                    <Space direction="vertical" style={{ width: "50%" }}>
                      <div className="flex bg-[#ffffff] p-[1rem] rounded-[.25rem] border border-[#CED4DA]">
                        <div>
                          <BaseColorPicker
                            name="reward_bg_color"
                            handleChange={(color) =>
                              handleColorChange(color, "reward_bg_color")
                            }
                            defaultValue={formValues.reward_bg_color}
                            colorPicker
                            inputKey="reward_bg_color"
                            value={formValues.reward_bg_color || "rgb(0,0,0)"}
                            title="Reward Background"
                          />
                        </div>
                      </div>
                    </Space>
                    <Space direction="vertical" style={{ width: "50%" }}>
                      <div className="flex bg-[#ffffff] p-[1rem] rounded-[.25rem] border border-[#CED4DA]">
                        <div>
                          <BaseColorPicker
                            name="reward_border_color"
                            handleChange={(color) =>
                              handleColorChange(color, "reward_border_color")
                            }
                            defaultValue={formValues.reward_border_color}
                            colorPicker
                            inputKey="reward_border_color"
                            value={
                              formValues.reward_border_color || "rgb(0,0,0)"
                            }
                            title="Reward Border"
                          />
                        </div>
                      </div>
                    </Space>
                  </div>
                </BaseAccordian>
                <DesignTable
                  stampCount={formValues?.no_of_stamps}
                  maxRows={4}
                  onChange={handleTableSelectChange}
                />
              </>
            )}
          </div>
          <div className="capture-div bg-cover absolute left-[-10000px]">
            {Array.from({ length: formValues.no_of_stamps + 1 }).map(
              (_, index) => (
                <div key={index}>
                  {formValues &&
                    typeof formValues?.no_of_stamps === "number" && (
                      <div
                        id={`stamp-container-${index}`}
                        className="mt-5 flex flex-wrap w-[300px] gap-2 h-[130px] items-center justify-center"
                      >
                        <CanvasStamps
                          stampData={formValues}
                          checkedIndex={index - 1}
                        />
                      </div>
                    )}
                </div>
              )
            )}
          </div>

          <div className="h-[1px] border border-dashed my-4"></div>
          <div className="w-full flex justify-end">
            <CommonButton
              btnLoading={btnLoading}
              label={type == "design" ? "Next: Details" : "Create Pass"}
              className="flex items-center gap-2 bg-[#7249CB] text-[#FFFFFF] py-[.5rem] px-[1.5rem] rounded-[.1875rem]"
              icon={arrowBack}
              disabled={btnLoading}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default DesignTabs;
