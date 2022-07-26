/* eslint-disable no-console */
import React, { createContext } from 'react';
import client from '../../utils/api-client';
import axios from 'axios';

const ProductContext = createContext();

const initialState = {
  showloader: false,
  products: [],
  types: [],
  totalRecords: 0,
  response: {}
};


function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'FETCH_PRODUCTS_FILTER_SUCCESS': {
      return { ...state, types: payload.types, min: payload.min, max: payload.max  };
    }
    case 'FETCH_PRODUCTS_SUCCESS': {
      return { ...state, products: payload.data, totalRecords: payload.totalRecords};
    }
    case 'IS_LOADING': {
      return { ...state, showloader: action.payload };
    }
    case 'SET_REPSONSE_STATUS':
      return { ...state, response: action.payload };
    case 'SET_MESSAGE':
      return { ...state, message: payload };
    case 'SET_ERROR':
      return { ...state, error: payload };
    default: {
      throw new Error(`Unsupported action type: ${type}`);
    }
  }
}

function ProductProvider(props) {
  const [appState, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(() => [appState, dispatch], [appState]);
  return <ProductContext.Provider value={value} {...props} />;
}

function useApp() {
  const context = React.useContext(ProductContext);
  if (!context) {
    throw new Error(`useApp must be used within a AppProvider`);
  }
  const [appState, dispatch] = context;
  
  const setLoading = (status) => {
    dispatch({ type: 'IS_LOADING', payload: status });
  };

  const uploadFile = async (fileData) => {
    const formData = new FormData();
    formData.append("file", fileData.file);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/product/upload_file",
        formData
      );
  
      if (res.data.status === 0) {
        dispatch({ type: 'SET_MESSAGE', payload: res.data.message });
      }
    } catch (ex) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to upload CSV'});
    }
  };
  
  const getProducts = async (offset, limit, type, min, max, searchText) => {
    const url = `/api/product?limit=${limit}&offset=${offset}&type=${type}&min=${min}&max=${max}&text=${searchText}`;
    const method = 'GET';

    await client(url, method, {})
      .then((data) => {
        if (data.status === 0) {
          dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data.data });
        }
      })
      .catch(() => {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch product'});
      });
  };
  
  const getProductFilters = async () => {
    const url = `/api/product/filterTypes`;
    const method = 'GET';

    await client(url, method, {})
      .then((result) => {
        if (result.status === 0) {
          dispatch({ type: 'FETCH_PRODUCTS_FILTER_SUCCESS', payload: result.data });
        }
      })
      .catch(() => {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch product filter'});
      });
  };
  
  const updatePrice = async (id, price) => {
    const url = `/api/product/update`;
    const method = 'POST';

    await client(url, method, { body : {id, price}  })
      .then((result) => {
        if (result.status === 0) {
          dispatch({ type: 'SET_MESSAGE', payload: result.message });
        }
      })
      .catch(() => {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to update product'});
      });
  };
  
  const deleteProduct = async (id) => {
    const url = `/api/product/delete/${id}`;
    const method = 'DELETE';

    await client(url, method, {})
      .then((result) => {
        if (result.status === 0) {
          dispatch({ type: 'SET_MESSAGE', payload: result.message });
        }
      })
      .catch(() => {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to update product'});
      });
  };

  const setMessageAndError = (message, error) => {
    dispatch({ type: 'SET_MESSAGE', payload: message });
    dispatch({ type: 'SET_ERROR', payload: error });
  };
  
  const resetMessageAndError = () => {
    dispatch({ type: 'SET_MESSAGE', payload: '' });
    dispatch({ type: 'SET_ERROR', payload: '' });
  };

  const confirmUpload = (status) => {
    setMessageAndError(null, null);
    dispatch({ type: 'REGISTER_SUCCESS_CONFIRM', payload: status });
  }

  return {
    appState,
    confirmUpload,
    setMessageAndError,
    uploadFile,
    getProducts,
    getProductFilters,
    resetMessageAndError,
    updatePrice,
    deleteProduct
  }
}

export { ProductProvider, useApp };
