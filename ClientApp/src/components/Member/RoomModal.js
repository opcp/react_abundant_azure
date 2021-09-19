import React from "react";
import { Modal, Button } from "react-bootstrap";
import SearchRoom from "../OurApartment/SearchRoom";

function roomModel(props) {
  // const [id, setId] = useState(null);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <SearchRoom />
    </Modal>
  );
}

export default roomModel;
