import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";

function CustomerPicker() {
  const { man, child } = useSelector((state) => state);
  const dispatch = useDispatch();
  const man_dispatch = (event) => {
    dispatch({
      type: "MAN",
      man: event,
    });
  };

  const child_dispatch = (event) => {
    dispatch({
      type: "CHILD",
      child:event
    });
  };

  return (
    <>
      <div className="NumPicker">
        <span> {man} </span>
        <span>Adults</span>
        <div className="sort">
          <button>
            <FontAwesomeIcon
              onClick={() => man_dispatch("UP")}
              icon={faSortUp}
            />
          </button>
          <button>
            <FontAwesomeIcon
              onClick={() => {
                if (man > 1) {
                  man_dispatch("DOWN");
                }
              }}
              icon={faSortDown}
            />
          </button>
        </div>
      </div>
      <div className="NumPicker">
        <span> {child}</span>
        <span>Kids</span>
        <div className="sort">
          <button>
            <FontAwesomeIcon
              onClick={() => child_dispatch("UP")}
              icon={faSortUp}
            />
          </button>
          <button>
            <FontAwesomeIcon
              onClick={() => {
                if (child > 0) {
                  child_dispatch("DOWN");
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

export default CustomerPicker;
