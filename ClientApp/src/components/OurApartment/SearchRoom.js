import React, { useRef, useState } from "react";
import DatePicker from "../Home/Datepicker";
import CustomerPicker from "./CustomerPicker";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Overlay } from "react-bootstrap";

function SearchRoom() {
  const his = useHistory();
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector((state) => state);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const DateUpdate = (dateSelect, date) => {
    if (dateSelect === "startDate") {
      dispatch({
        type: "ROOM_ORDER_DATE",
        startDate: date,
      });
    } else {
      dispatch({
        type: "ROOM_ORDER_DATE",
        endDate: date,
      });
    }
  };

  const roomSearch = async () => {
    return await fetch("/api/Room/Check", {
      method: "POST",
      body: JSON.stringify({ startDate, endDate }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          let standard = Infinity,
            junior = Infinity,
            superior = Infinity;
          res.forEach((e) => {
            const { standradRoom, juniorSuites, superiorRoom } = e;

            if (standradRoom < standard) {
              standard = standradRoom;
            }

            if (juniorSuites < junior) {
              junior = juniorSuites;
            }

            if (superiorRoom < superior) {
              superior = superiorRoom;
            }
          });

          return { standard, junior, superior };
        }
      })
      .catch((err) => console.log(err));
  };

  // redux 有值就給

  // 找日期內空房
  const searchRoom = async () => {
    if (startDate && endDate) {
      setShow(false);
      dispatch({
        type: "ROOM_ORDER_DATE",
        startDate,
        endDate,
      });

      let res = await roomSearch();

      dispatch({
        type: "PER_ROOM_MAX",
        standardRoomMax: res.standard,
        juniorSuiteMax: res.junior,
        superiorRoomMax: res.superior,
      });

      his.push("/OurApartment");
    } else {
      setShow(true);
    }
  };

  return (
    <>
      <DatePicker data={{ startDate, endDate, DateUpdate }} />
      <CustomerPicker />
      <button onClick={searchRoom} ref={target} className="search_booking">
        search
      </button>

      <Overlay target={target.current} show={show} placement="bottom">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              backgroundColor: "rgba(255, 100, 100, 0.85)",
              padding: "2px 10px",
              color: "white",
              borderRadius: 3,
              ...props.style,
            }}
          >
            Please select check in and check out date
          </div>
        )}
      </Overlay>
    </>
  );
}

export default SearchRoom;
