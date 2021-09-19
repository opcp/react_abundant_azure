import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";

function CustomerPicker(props) {
  const {man,child} = useSelector(state => state);
  const dispatch = useDispatch();
  const man_up = () => {
    dispatch({
      type: "MAN_UP"
    });
  };

  const man_down = () => {
    if (man >= 2) {
      dispatch({
        type: "MAN_DOWN"
      });
    }
  };

  const child_up = () => {
    dispatch({
      type: "CHILD_UP"
    });
  };

  const child_down = () => {
    if (child >= 1) {
      dispatch({
        type: "CHILD_DOWN"
      });
    }
  };

  return (
    <>
      <div className="NumPicker">
        <span> {man} </span>
        <span>Adults</span>
        <div className="sort">
          <button>
            <FontAwesomeIcon onClick={man_up} icon={faSortUp} />
          </button>
          <button>
            <FontAwesomeIcon onClick={man_down} icon={faSortDown} />
          </button>
        </div>
      </div>
      <div className="NumPicker">
        <span> {child}</span>
        <span>Kids</span>
        <div className="sort">
          <button>
            <FontAwesomeIcon onClick={child_up} icon={faSortUp} />
          </button>
          <button>
            <FontAwesomeIcon onClick={child_down} icon={faSortDown} />
          </button>
        </div>
      </div>
    </>
  );
}

export default CustomerPicker;
