/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Aux from '../../hoc/_Aux';
import classNames from 'classnames';
import _ from 'lodash';
import { useApp } from '../../contexts/Product';
import { TablePagination } from '../../components/Pagination';
import { Slider } from '../../components/range/Slider';
import UploadModal from '../../components/UploadModel';
import Loader from '../../components/Loader';
import '../../components/component.scss';

const ProductList = () => {
  const [showModal, setShowModalStatus] = useState(false);
  const {
    uploadFile,
    getProducts,
    getProductFilters,
    updatePrice,
    resetMessageAndError,
    deleteProduct,
    appState: { products = [], showloader, totalRecords,  types, min, max, message, error },
  } = useApp();
  
  let [dataList, setDataList] = useState([]);
  let [typeFilter, setTypeFilter] = useState('All');
  const [recordLimit, setRecordLimit] = useState(10);
  const [currentActivePage, setCurrentActivePage] = useState(1);
  const [sortField, setSortField] = useState('name');
  const [sortType, setSortType] = useState('asc');
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);
  const [editId, setEditId] = useState(0);

  const data =  {
    columns: [
      {
        label: '#',
        field: 'id',
        width: 200,
      },
      {
        label: 'Name',
        field: 'name',
        width: 200,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Type',
        field: 'type',
        width: 200,
      },
      {
        label: 'SKU',
        field: 'sku',
        width: 200,
      },
      {
        label: 'Price',
        field: 'price',
        width: 400,
      },
      {
        label: 'Created',
        field: 'created',
        width: 200,
      }, 
      {
        label: 'Updated',
        field: 'updated',
        width: 200,
      }
    ]
  };
  
  useEffect(() => {
    getProductFilters();
  }, []);
  
  useEffect(() => {
    if(types.length > 0) {
      getProducts((currentActivePage - 1) * recordLimit, recordLimit, typeFilter, min, max, searchText);
    }
  }, [types, recordLimit, currentActivePage, typeFilter]);
  
  useEffect(() => {
    if(products.length > 0) {
      const count = totalRecords / recordLimit;
      const sorted = _.orderBy(products, sortField, sortType);
      setTotalPages(count === Math.floor(count) ? count : Math.floor(count) + 1);
      setDataList(sorted);
    } else {
      setTotalPages(1);
      updateCurrentPage(1);
    }
  }, [products, recordLimit, totalRecords, currentActivePage, typeFilter, sortField, sortType]);
  
  const updateCurrentPage = (currentPageNo) => {
    setCurrentActivePage(currentPageNo)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  
  const onSourceChange = (event) => {
    setSearchText(event.target.value);
  };
  
  const onEntryChange = (event) => {
    if(event.target.value) {
      setRecordLimit(Number(event.target.value));
    }
    updateCurrentPage(1);
  }
  
  const onTypeChange = (event) => {
    if(event.target.value) {
      setTypeFilter(event.target.value);
    }
    updateCurrentPage(1);
  }
  
  const onClickTableField = (field) => {
    if(field === sortField) {
      setSortType(sortType === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortType('asc');
    }
  }
  
  const updateModalStatus = () => {
    setShowModalStatus(!showModal);
  };
  
  const handleOnClick = () => {
    setShowModalStatus(true);
  };
  
  const clickApplyButton = () => {
    updateCurrentPage(1);
    if(types.length > 0) {
      getProducts((currentActivePage - 1) * recordLimit, recordLimit, typeFilter, minPrice, maxPrice, searchText);
    }
  }
  
  const onPriceChange = (e, id) => {
    const pList = dataList;
    const objIndex = pList.findIndex((obj => obj.id == id));
    pList[objIndex].price = e.target.value;
    setDataList([...pList]);
  }
  
  const onApplyPriceUpdate = (e, id) => {
    const pList = dataList;
    const obj = pList.find((obj => obj.id == id));
    updatePrice(obj.id, obj.price);
  }
  
  const confirmAnswerSubmission = () => {
    setEditId(0);
    resetMessageAndError();
    updateCurrentPage(1);
    if(types.length > 0) {
      getProducts((currentActivePage - 1) * recordLimit, recordLimit, typeFilter, minPrice, maxPrice, searchText);
    }
  };
  
  const onClickErrorOk = () => {
    resetMessageAndError();
  };
 
  return (
    <Aux>
      {showloader && <Loader />}
      {showModal && (
        <UploadModal
          uploadFile={uploadFile}
          updateModalStatus={updateModalStatus}
        />
      )}
        
      <Card>
        <Card.Header>
          <Row>
            <Col md={9} >
              <Card.Title as="h5">Products</Card.Title>
              <span className="d-block m-t-5"><em>Create and View the products</em></span>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Button className="mb-2 float-right" onClick={handleOnClick}>Upload CSV</Button>
              </Form.Group>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <div className="dataTables_wrapper">
            <Row>
              <Col sm={12} md={4}>
                <Row>
                  <div className="dataTables_length" id="zero-configuration_length">
                    <label>Show 
                      <select name="zero-configuration_length" onChange={onEntryChange} aria-controls="zero-configuration" 
                        className="custom-select custom-select-sm form-control form-control-sm ml-2">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select></label>
                  </div>
                  
                  <div className="dataTables_length ml-2" id="zero-configuration_length">
                    <label>Type:
                      <select name="zero-configuration_length" onChange={onTypeChange} aria-controls="zero-configuration" 
                        className="custom-select custom-select-sm form-control form-control-sm ml-2">
                        <option value="All">All</option>
                        {types && types.length > 0 && types.map((t) => {
                          return (<option value={t}>{t}</option>);
                        })
                        }
                      </select></label>
                  </div>
                </Row>
              </Col>
              <Col sm={12} md={8}>
                <Row>
                  <Col sm={12} md={3}>
                    <div className="dataTables_length ml1-5" id="zero-configuration_length">
                      <Row>
                        <Col sm={12} md={3}>
                          <label>Price:</label>
                        </Col>
                        
                        <Col sm={12} md={9}>
                          {min && max && (<Slider min={min} max={max} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}/>)}
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col sm={12} md={3}>
                    <div id="zero-configuration_filter" className="dataTables_filter">
                      <label>Search:<input type="search" className="form-control form-control-sm" onChange={onSourceChange} placeholder="Enter name" aria-controls="zero-configuration"/></label>
                    </div>
                  </Col>
                  
                  <Col sm={12} md={3}>
                    <a className="label theme-bg text-white f-12" onClick={clickApplyButton}>Apply</a>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='table-responsive'>
              <Col sm={12}>
                <table className="display table nowrap table-striped table-hover dataTable">
                  <thead>
                    <tr>
                      { data.columns.length > 0 &&  data.columns.map((col,index) => {
                        const rootClass = classNames({
                          sorting_asc: col.field === sortField && sortType === 'asc',
                          sorting_desc: col.field === sortField && sortType === 'desc',
                          sorting: col.field !== sortField
                        });
                  
                        return (
                          <th className={rootClass} key={index} onClick={() => onClickTableField(col.field)}>{col.label}</th>
                        )})
                      }
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    { dataList.length > 0 &&
                    dataList.map((p) => {
                      return(
                        <tr>
                          <th scope="row">{p.id}</th>
                          <td>{p.name}</td>
                          <td>{p.type}</td>
                          <td>{p.sku}</td>
                          { editId !== p.id && (<td>{p.price}</td>) }
                          { editId === p.id && (<td><input type="text" className="editBox" value={p.price} onChange={(e) => onPriceChange(e, Number(p.id))} aria-controls="zero-configuration"/></td>) }
                          
                          <td>{p.created}</td>
                          <td>{p.updated}</td>
                          { editId !== p.id && (<td>
                            <a className="label theme-bg text-white f-12" onClick={() => setEditId(Number(p.id))}>Edit</a>
                            <a className="label theme-danger text-white f-12" onClick={() => deleteProduct(Number(p.id))}>Delete</a>
                          </td>) }
                          { editId === p.id &&<td><a className="label theme-bg text-white f-12" onClick={(e) => onApplyPriceUpdate(e, Number(p.id))}>Apply</a></td>}
                        </tr>
                      )})
                    }
                  
                    {dataList.length === 0 && <p className="pText">
                      <b>
                        {`** No products found`}.
                      </b>
                    </p>}
                  </tbody>
                </table>
              </Col>
            </Row>
            <TablePagination totalPages={totalPages} activePageNo={currentActivePage} updateCurrentPage={updateCurrentPage} />
          </div>
        </Card.Body>
        
       
        
        {message && <SweetAlert success title="Success" btnSize="sm" onConfirm={() => confirmAnswerSubmission()} >{message}</SweetAlert> }
        {error && <SweetAlert error title="Failed" btnSize="sm" onConfirm={() => onClickErrorOk()} >{error}</SweetAlert> } 
      </Card>
    </Aux>
  );
};

export default ProductList;
