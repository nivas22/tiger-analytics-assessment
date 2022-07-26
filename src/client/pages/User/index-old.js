/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { useApp } from '../../contexts/Product';
import Aux from '../../hoc/_Aux';
import {Row, Col, Card, Table, Form, Button} from 'react-bootstrap';
import { TablePagination } from '../../components/Pagination';
import UploadModal from '../../components/UploadModel';
import Loader from '../../components/Loader';
import '../../components/component.scss';

const recordLimit = 10;

const User = () => {
  const [showModal, setShowModalStatus] = useState(false);

  const {
    getProducts,
    selectUserForActivePage,
    uploadFile,
    appState: { products = [], message, error, showloader },
  } = useApp();
  let selectedUser = [];

  useEffect(() => {
    getProducts();
  }, []);
  const [currentActivePage, setCurrentActivePage] = useState(1);
  const pageCount = products.length / recordLimit;
  const totalPages = pageCount === Math.floor(pageCount) ? pageCount : Math.floor(pageCount) + 1;

  if (products.length) {
    // selectedUser = selectUserForActivePage(products, currentActivePage, recordLimit);
  }

  const updateCurrentPage = (currentPageNo) => {
    setCurrentActivePage(currentPageNo)
  }

  const handleOnClick = () => {
    setShowModalStatus(true);
  };
  
  const updateModalStatus = () => {
    setShowModalStatus(!showModal);
  };

  return (
    <Aux>
      {showloader && <Loader />}
      <Row>
        
      </Row>
      <Row>
        <Col xl={12}>
          <Card>
            <Card.Header>
              <Row>
                <Col md={9} >
                  <Card.Title as="h5">Products</Card.Title>
                  <span className="d-block m-t-5"><em>Create and View the products</em></span>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Button className="mb-2 float-right" onClick={handleOnClick}>Add User</Button>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead className="table result-table">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  { products.length > 0 &&
                    products.map((p,index) => (
                      <tr>
                        <th scope="row">{index+1}</th>
                        <td>{p.name}</td>
                        <td>{p.type}</td>
                        <td>{p.sku}</td>
                        <td>{p.price}</td>
                        <td>{p.created}</td>
                        <td>{p.updated}</td>
                        <td> <a className="label theme-bg text-white f-12">Approve</a></td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              <TablePagination totalPages={totalPages} activePageNo={currentActivePage} updateCurrentPage={updateCurrentPage} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {showModal && (
        <UploadModal
          uploadFile={uploadFile}
          updateModalStatus={updateModalStatus}
        />
      )}
    </Aux>
  )
}

export default User;