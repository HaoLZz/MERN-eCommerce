import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import {
  fetchProducts,
  selectAllProducts,
} from '../features/products/productsSlice';

const HomeScreen = () => {
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  const fetchStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [fetchStatus, dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product, index) => (
          <Col sm={12} md={6} lg={4} xl={3} key={index} className="my-3">
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
