import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";

function RoomPicker(props) {
  const { customer, customerHandleChange, roomMax } = props.controlData;

  return (
    <>
      <div className="NumPicker" style={{ width: "25%" }}>
        <span style={{ padding: 0 }}> {customer} </span>
        <div className="sort">
          <button>
            <FontAwesomeIcon
              onClick={() => {
                if (customer < roomMax) {
                  customerHandleChange("PLUS");
                }
              }}
              icon={faSortUp}
            />
          </button>
          <button>
            <FontAwesomeIcon
              onClick={() => {
                if (customer > 0) {
                  return customerHandleChange("MINUS");
                }
              }}
              icon={faSortDown}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default RoomPicker;
