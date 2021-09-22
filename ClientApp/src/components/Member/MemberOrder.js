import React from "react";
import { Modal, Button, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
function MemberOrder(props) {
  const { memberOrder } = useSelector((state) => state);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Orders
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {memberOrder != null
            ? memberOrder.map((i) => {
                return (
                  <Row key={i.orderString} className="mb-2 member_order">
                    <div className="list">
                      <h3>
                        {new Date(i.checkInDate).toLocaleDateString()} -{" "}
                        {new Date(i.checkOutDate).toLocaleDateString()}
                      </h3>
                      {/* <span>ORDER NUMBER:rwerwe34245-32441</span> */}
                      <div className="room">
                        {i.orderRoom.map((j) => {
                          return (
                            <p key={j.roomType}>
                              {j.roomNumber} X {j.roomName}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                    <div className="price">${i.orderPrice}</div>
                  </Row>
                );
              })
            : "No orders now"}
        </Modal.Body>
        <Modal.Footer>
          <Button   className="shadow-none" variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MemberOrder;
