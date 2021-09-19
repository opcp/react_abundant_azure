import React from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Container,
  FormGroup,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

function MemberOrder(props) {
  const dispatch = useDispatch();

  const { standardRoom, juniorSuite, superiorRoom } = useSelector(
    (state) => state
  );

  let roomList = {
    StandardRoom: standardRoom,
    JuniorSuite: juniorSuite,
    SuperiorRoom: superiorRoom,
  };

  let roomPrice = {
    StandardRoom: 150,
    JuniorSuite: 250,
    SuperiorRoom: 350,
  };

  let totalPrice =
    standardRoom * roomPrice["StandardRoom"] +
    juniorSuite * roomPrice["JuniorSuite"] +
    superiorRoom * roomPrice["SuperiorRoom"];

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size={"lg"}
      >
        <Modal.Body className="order_check">
          <Container className="order_list">
            {Object.keys(roomList).map((i) => {
              if (roomList[i] > 0) {
                return (
                  <Row key={i} className="order_row">
                    <Col className="room_type" xs={6}>
                      {roomList[i] + " x " + i}
                    </Col>
                    <Col className="room_price" xs={3}>{`$${
                      roomList[i] * roomPrice[i]
                    }`}</Col>
                    <Col xs={3}>
                      <Button
                        onClick={() => {
                          let obj = { type: "CHECK_ORDER_DELETE" };
                          obj[i] = 0;
                          dispatch(obj);
                          
                          if (standardRoom + juniorSuite + superiorRoom === 1) {
                            dispatch({
                              type: "MEMBER_ORDER_MODAL_HIDE",
                            });
                          }
                        }}
                        className="shadow-down room_delete"
                        variant="danger"
                      >
                        x
                      </Button>
                    </Col>
                  </Row>
                );
              }
            })}
          </Container>
          <Container className="order_total_price">
            <Row>Total</Row>
            <Row className="total_price">${totalPrice}</Row>
          </Container>
        </Modal.Body>
        <Modal.Footer style={{ paddingRight: "10%" }}>
          <Button
            className="shadow-down"
            variant="primary"
            onClick={props.onHide}
          >
            Reverse
          </Button>
          <Button
            className="shadow-down"
            variant="secondary"
            onClick={props.onHide}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MemberOrder;
