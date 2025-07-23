import React, { useEffect, useState } from "react";
import UploadImage from "../../assets/images/svg/uploadingImage.svg";
import { MdDelete } from "react-icons/md";
import { defaultImageConfig } from "../../utils/config";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation";

const BaseImageUploader = ({
  name,
  onImageChange,
  label,
  infoText,
  imageValue,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append(name, file);
      onImageChange(name, file);
    } else {
      setImagePreview(null);
      onImageChange(name, null);
    }
  };



  // remove preview Image
  const removeImage = () => {
    setImagePreview("");
    const file = "";
    onImageChange(name, file);
  };

  useEffect(() => {
    if (imageValue?.name) {
      setImagePreview(URL.createObjectURL(imageValue));
    } else {
      setImagePreview(imageValue);
    }
  }, [imageValue]);

  return (
    <>
      <label>{label}</label>
      <div className="bg-[#F9F8FC] cursor-pointer border border-dashed border-[#ABB4B9] rounded-[.25rem] h-[5.125rem] w-full">
        <label htmlFor={name} className="w-full bg-[r]">
          <div className="h-[5.125rem] w-[100%] flex justify-center items-center cursor-pointer">
            {imagePreview ? (
              <img
                src={
                  imagePreview?.startsWith("blob:")
                    ? imagePreview
                    : defaultImageConfig.Base_URL + imagePreview
                }
                alt="image preview"
                className="max-h-full max-w-full"
              />
            ) : (
              <div className="flex flex-col items-center ">
                <img src={UploadImage} alt="upload icon" />
                <p className="text-[#364349]">{label}</p>
              </div>
            )}
            <input
              type="file"
              name={name}
              id={name}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </label>

        {imagePreview && (
          <div className="flex justify-between items-center text-[#7d7781] text-[12px]">
            <p>Remove image</p> <MdDelete onClick={removeImage} />
          </div>
        )}
        <p className="text-[#677781] text-[.8125rem] font-normal">{infoText}</p>
      </div>
    </>
  );
};

export default BaseImageUploader;
