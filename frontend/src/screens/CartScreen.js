import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateItemQty } from '../features/cart/cartSlice';
import Message from '../components/Message';

const CartScreen = () => {
  const { id, qty } = useParams();

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const updateQtyHandler = (newQty, product) => {
    dispatch(updateItemQty({ newQty, product }));
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>{' '}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="input"
                      type="number"
                      min="1"
                      max={item.countInStock}
                      value={item.qty}
                      onChange={(e) =>
                        updateQtyHandler(e.target.value, item.product)
                      }
                    ></Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant="ligth" onClick={(f) => f}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              <span>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </span>
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={(f) => f}
              >
                Proceed to Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
