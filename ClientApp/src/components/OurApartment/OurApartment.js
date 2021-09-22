import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import {
  faWifi,
  faShower,
  faBath,
  faPhoneAlt,
  faTv,
  faUtensils,
  faGlassMartiniAlt,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import SearchRoom from "./SearchRoom";
import RoomPicker from "./RoomPicker";

function OurApartment() {
  const {
    standardRoom,
    juniorSuite,
    superiorRoom,
    standardRoomMax,
    juniorSuiteMax,
    superiorRoomMax,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  let orderRoomNumber = standardRoom + juniorSuite + superiorRoom;
  return (
    <>
      <section className="wrap">
        <div className="travel_img">
          <img
            src={require("../../image/floor-2615218_1920.jpg")}
            alt="Background"
          />
        </div>
        <div className="travel_title">Our Apartment</div>
        <Container className="travel_body">
          <Row className="room_row">
            <Col className="room_col" xs={12}>
              <span className="room_aside">Our Rooms</span>
            </Col>
          </Row>
          <span className="line"></span>
          <Row className="room_booking">
            <Col className="body_booking2" xs={12}>
              <SearchRoom />
            </Col>
          </Row>
          {standardRoomMax > 0 ? (
            <>
              <span className="line"></span>
              <Row className="room_row">
                <Col className="room_col" xs={4}>
                  <img src="https://static.wixstatic.com/media/fde015_597c7d9710e44a9d91514e0ac84fb653.jpg/v1/fill/w_240,h_170,q_85,usm_0.66_1.00_0.01/fde015_597c7d9710e44a9d91514e0ac84fb653.jpg" />
                </Col>
                <Col xs={4} className="room_info">
                  <span className="room_title">Standard Room</span>
                  <span className="room_txt">
                    Our Standard Rooms are the perfect combination of function
                    and comfort.
                  </span>
                  <ul className="room_list">
                    <li> Size: 230 sq ft</li>
                    <li> Beds: 1 Double(s)</li>
                  </ul>
                  <ul className="room_icon">
                    <li className="first">
                      <FontAwesomeIcon title="wifi" icon={faWifi} />
                    </li>
                    <li>
                      <FontAwesomeIcon title="TV" icon={faTv} />
                    </li>
                    <li>
                      <FontAwesomeIcon
                        title="mini bar"
                        icon={faGlassMartiniAlt}
                      />
                    </li>
                    <li>
                      <FontAwesomeIcon title="phone" icon={faPhoneAlt} />
                    </li>
                    <li>
                      <FontAwesomeIcon title="kitchen" icon={faUtensils} />
                    </li>
                    <li>
                      <FontAwesomeIcon title="shower" icon={faShower} />
                    </li>
                  </ul>
                </Col>
                <Col xs={4} className="room_price">
                  <span className="from">From</span>
                  <span className="price">$150</span>
                  <span>
                    {standardRoomMax ?? ""}
                    {standardRoomMax > 0
                      ? standardRoomMax === 1
                        ? " room left"
                        : " rooms left"
                      : ""}
                  </span>
                  <RoomPicker
                    controlData={{
                      customer: standardRoom,
                      customerHandleChange: (event) => {
                        if (standardRoom <= standardRoomMax) {
                          dispatch({
                            type: "STANDARD_ROOM_ORDER_NUMBER",
                            event,
                          });
                        }
                      },
                      roomMax: standardRoomMax,
                    }}
                  />
                </Col>
              </Row>
              <span className="line"></span>
            </>
          ) : (
            ""
          )}

          {juniorSuiteMax > 0 ? (
            <>
              <Row className="room_row">
                <Col className="room_col" xs={4}>
                  <img src="https://static.wixstatic.com/media/fde015_6c05c2f649564c37a7b5acfd3a848e5b.jpg/v1/fill/w_240,h_170,q_85,usm_0.66_1.00_0.01/fde015_6c05c2f649564c37a7b5acfd3a848e5b.jpg" />
                </Col>
                <Col xs={4} className="room_info">
                  <span className="room_title">Junior Suite</span>
                  <span className="room_txt">
                    Our Junior Suites offer breathtaking views of the city
                    skyline.
                  </span>
                  <ul className="room_list">
                    <li> Size: 260 sq ft</li>
                    <li> Beds: 2 Double(s)</li>
                  </ul>
                  <ul className="room_icon">
                    <li className="first">
                      <FontAwesomeIcon title="wifi" icon={faWifi} />
                    </li>
                    <li>
                      <FontAwesomeIcon title="TV" icon={faTv} />
                    </li>
                    <li>
                      <FontAwesomeIcon
                        title="mini bar"
                        icon={faGlassMartiniAlt}
                      />
                    </li>
                    <li>
                      <FontAwesomeIcon title="phone" icon={faPhoneAlt} />
                    </li>
                    <li>
                      <FontAwesomeIcon title="kitchen" icon={faUtensils} />
                    </li>
                    <li>
                      <FontAwesomeIcon title="shower" icon={faShower} />
                    </li>
                    <li>
                      <FontAwesomeIcon title="bath" icon={faBath} />
                    </li>
                  </ul>
                </Col>
                <Col xs={4} className="room_price">
                  <span className="from">From</span>
                  <span className="price">$250</span>
                  <span>
                    {juniorSuiteMax ?? ""}
                    {juniorSuiteMax > 0
                      ? juniorSuiteMax === 1
                        ? " room left"
                        : " rooms left"
                      : ""}
                  </span>
                  <RoomPicker
                    controlData={{
                      customer: juniorSuite,
                      customerHandleChange: (event) => {
                        if (juniorSuite <= juniorSuiteMax) {
                          dispatch({
                            type: "JUNIOR_SUITE_ORDER_NUMBER",
                            event,
                          });
                        }
                      },
                      roomMax: juniorSuiteMax,
                    }}
                  />
                </Col>
              </Row>
              <span className="line"></span>
            </>
          ) : (
            ""
          )}

          {superiorRoomMax > 0 ? (
            <>
              <Row className="room_row">
                <Col className="room_col" xs={4}>
                  <img src="https://static.wixstatic.com/media/fde015_6159dcce72024a789a3df21e95e8d495.jpg/v1/fill/w_240,h_170,q_85,usm_0.66_1.00_0.01/fde015_6159dcce72024a789a3df21e95e8d495.jpg" />
                </Col>
                <Col xs={4} className="room_info">
                  <span className="room_title">Superior Room</span>
                  <span className="room_txt">
                    Our Superior Rooms are comfortable, roomy and elegant.
                  </span>
                  <ul className="room_list">
                    <li> Size: 280 sq ft</li>
                    <li> Beds: 1 King(s)</li>
                  </ul>
                  <ul className="room_icon">
                    <li className="first">
                      <FontAwesomeIcon title="wifi" icon={faWifi} />
                    </li>
                    <li>
                      <FontAwesomeIcon title="TV" icon={faTv} />
                    </li>
                    <li>
                      <FontAwesomeIcon
                        title="mini bar"
                        icon={faGlassMartiniAlt}
                      />
                    </li>
                    <li>
                      <FontAwesomeIcon title="phone" icon={faPhoneAlt} />
                    </li>
                    <li>
                      <FontAwesomeIcon title="kitchen" icon={faUtensils} />
                    </li>
                    <li>
                      <FontAwesomeIcon title="shower" icon={faShower} />
                    </li>
                    <li>
                      <FontAwesomeIcon title="bath" icon={faBath} />
                    </li>
                    <li>
                      <FontAwesomeIcon title="work space" icon={faBriefcase} />
                    </li>
                  </ul>
                </Col>
                <Col xs={4} className="room_price">
                  <span className="from">From</span>
                  <span className="price">$350</span>
                  <span>
                    {superiorRoomMax ?? ""}
                    {superiorRoomMax > 0
                      ? superiorRoomMax === 1
                        ? " room left"
                        : " rooms left"
                      : ""}
                  </span>
                  <RoomPicker
                    controlData={{
                      customer: superiorRoom,
                      customerHandleChange: (event) => {
                        if (superiorRoom <= superiorRoomMax) {
                          dispatch({
                            type: "SUPERIOR_ROOM_ORDER_NUMBER",
                            event,
                          });
                        }
                      },
                      roomMax: superiorRoomMax,
                    }}
                  />
                </Col>
              </Row>
            </>
          ) : (
            ""
          )}
          <span className="line_bot"></span>
          {orderRoomNumber > 0 ? (
            <Row className="room_row">
              <Col className="room_col">
                <Button
                  onClick={() => {
                    dispatch({
                      type: "RESERVE_ORDER_MODAL",
                      reserveOrderModalStatus: true,
                    });
                  }}
                  className="shadow-none"
                  variant="secondary"
                  size="lg"
                  style={{ alignSelf: "flex-end", marginRight: "10%" }}
                >
                  Check order
                </Button>
              </Col>
            </Row>
          ) : (
            ""
          )}
          <Footer />
        </Container>
      </section>
    </>
  );
}

export default OurApartment;
