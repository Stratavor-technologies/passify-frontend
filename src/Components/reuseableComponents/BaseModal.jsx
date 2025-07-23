import React from "react";
import { Modal } from "antd";

const BaseModal = ({ toggleModel, handleClose, children }) => {
  return (
    <Modal
      centered
      visible={toggleModel}
      onCancel={handleClose}
      footer={null}
      width={800}
    >
      <div>{children}</div>
    </Modal>
  );
};

export default BaseModal;
