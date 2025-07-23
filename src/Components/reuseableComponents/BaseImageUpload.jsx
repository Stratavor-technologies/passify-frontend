import React from "react";
import { BiPlus, BiX } from "react-icons/bi";
import plus from "../../assets/images/plus.png";
const BaseImageUploader = ({
  logoImage,
  setLogoImage, // Make sure setLogoImage is passed as a prop
  handleImageUpload,
  handleImageRemove,
  recommendedSize,
  imageInfo,
  name,
}) => {
  return (
    <div className="image-uploader">
      <img src={imageInfo} alt="Preview" className="img-fluid img-logo" />

      <label
        htmlFor="logo_image"
        className="logo_img max-w-full rounded-md relative overflow-hidden"
        for={name}
      >
        <>
          {/* Assuming you have a variable named 'plus' */}
          <img
            src={logoImage ? logoImage : plus}
            alt="logo image"
            className="img-fluid img-logo"
          />
          <div className="middle-logo">CHOOSE IMAGE</div>
        </>

        <div className="overlay  flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-70 transition-opacity duration-300">
          <BiPlus className="text-white text-2xl" />
        </div>
      </label>

      <input
        type="file"
        accept="image/*"
        name={name}
        id={name}
        onChange={handleImageUpload}
        className="hidden"
      />

      <div className="flex justify-between items-center mt-2 max-w-[422px]">
        <p id="logo_image_name" className="text-[12px]">
          {logoImage?.imageName}
        </p>
        {logoImage?.isImageUploaded && (
          <div
            id="logo_cross_icon"
            className="text-[22px] cursor-pointer"
            onClick={handleImageRemove}
          >
            <BiX />
          </div>
        )}
      </div>

      <p className="text-[0.7rem] font-[300]">{recommendedSize}</p>
    </div>
  );
};

export default BaseImageUploader;
