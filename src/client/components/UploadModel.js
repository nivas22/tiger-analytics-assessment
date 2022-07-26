/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';

const UploadModel = ({ updateModalStatus, uploadFile }) => {
  
  const [selectedFile, setSelectedFile] = useState('');
  
  const onSelectFile = (file) => {
    setSelectedFile(file);
  };

  const onConfirm = () => {
    const data = {
      file: selectedFile
    };

    uploadFile(data);
    closeModal();
  };

  const closeModal = () => {
    updateModalStatus();
  };
  
  return (
    <SweetAlert
      title={"Upload CSV File"}
      showCancel
      onConfirm={onConfirm}
      onCancel={closeModal}
    >
      <div className='model-card'>
        <div className='model-body'>
          <Form>
            <Form.Group>
              <Form.File
                onChange={(e) => onSelectFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    </SweetAlert>
  )
};
export default UploadModel;
