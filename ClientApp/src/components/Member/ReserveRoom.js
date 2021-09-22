import React from "react";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

function ReserveRoom(props) {
  const dispatch = useDispatch();
  const {
    logStatus,
    memberEnable,
    memberId,
    startDate,
    endDate,
    standardRoom,
    juniorSuite,
    superiorRoom,
    verifyEmailTimer,
  } = useSelector((state) => state);

  const ReserveOrder = () => {
    if (!logStatus) {
      dispatch({
        type: "LOGIN_MODAL",
        loginModalStatus: true,
      });

      return;
    }

    if (memberEnable === "N") {
      Swal.fire({
        title: "Please complete verify Or send new verify email",
        showCancelButton: true,
        width: "50vw",
        confirmButtonText: "Send",
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (
            verifyEmailTimer !== null &&
            new Date() - verifyEmailTimer < 60000
          ) {
            Swal.fire(
              "Vedify email not send",
              "<span>Wait 60 seconds</span>",
              "error"
            );
            return;
          }

          Swal.fire(
            "Vedify email sent",
            "<span>Could be resent every 60 seconds</span>",
            "success"
          );
          await fetch("/api/Member/VerifyAgain", {
            method: "POST",
            body: JSON.stringify(memberId),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          })
            .then((res) => res)
            .catch((err) => err);

          dispatch({
            type: "VERIFY_EMAIL_TIMER",
            time: new Date(),
          });
        }
      });
      return;
    }

    let apiData = {
      MemberId: memberId,
      CheckInDate: new Intl.DateTimeFormat("zh-tw", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
        .format(startDate)
        .replaceAll("/", "-"),
      CheckOutDate: new Intl.DateTimeFormat("zh-tw", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
        .format(endDate)
        .replaceAll("/", "-"),
      Order: [
        {
          RoomType: 1,
          RoomOrderNumber: standardRoom,
        },
        {
          RoomType: 2,
          RoomOrderNumber: juniorSuite,
        },
        {
          RoomType: 3,
          RoomOrderNumber: superiorRoom,
        },
      ],
    };

    fetch("/api/Room/AddMemberOrder", {
      method: "POST",
      body: JSON.stringify(apiData),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          return res.json();
        } else {
          Swal.fire({
            icon: "success",
            title: "Your order has been completed",
            width: "50vw",
            showConfirmButton: false,
            timer: 2500,
          });
          
          dispatch({
            type: "RESERVE_ORDER_MODAL",
            reserveOrderModalStatus: false,
          });
        }
      })
      .then((res) => {
        if (res.state === "room_limit_error") {
          Swal.fire({
            icon: "error",
            title: "The room exceeds the upper limit",
            text: "please order again",
          });
        }
      })
      .catch((err) => err);
  };

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
                              type: "RESERVE_ORDER_MODAL",
                              reserveOrderModalStatus: false,
                            });
                          }
                        }}
                        className="shadow-none room_delete"
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
            className="shadow-none"
            variant="primary"
            onClick={ReserveOrder}
          >
            Reserve
          </Button>
          <Button
            className="shadow-none"
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

export default ReserveRoom;
