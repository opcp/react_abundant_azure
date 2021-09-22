import React from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

function LogInModal(props) {
  const dispatch = useDispatch();
  const { memberCheck, eventAlert, account, password, memberEnable } =
    useSelector((state) => state);
  const client_id = "1656389623";
  const redirect_uri = "https://abundant.azurewebsites.net/";
  const state = "q1w2e3r4t5";
  const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=profile%20openid%20email&nonce=09876xyz`;

  const FacebookLogIn = () => {
    window.FB.login(
      function (response) {
        if (response.status === "connected") {
          window.FB.api(
            "/me?fields=id,name,email",
            async function (memberData) {
              let res = await memberCheck("facebook", memberData.id);
              if (res === "first_login") {
                dispatch({
                  type: "LOGIN_MODAL",
                  loginModalStatus: false,
                });

                dispatch({
                  type: "INIT_SIGN_UP_DATA",
                  memberName: memberData.name,
                  memberEmail: memberData.email,
                  memberSecondId: { FacebookId: memberData.id },
                  logMethod: "facebook",
                });

                dispatch({
                  type: "SIGN_UP_MODAL",
                  signUpModalStatus: true,
                });
              } else {
                dispatch({
                  type: "LOG_IN",
                  memberName: res.name,
                  memberId: res.id,
                  memberEnable: res.enable,
                  logMethod: "facebook",
                });

                dispatch({
                  type: "LOGIN_MODAL",
                  loginModalStatus: false,
                });

                eventAlert("Welecome back " + res.name);
              }
            }
          );
        }
      },
      {
        scope: "email",
        auth_type: "rerequest",
      }
    );
  };

  const LineLogIn = () => {
    new Promise((res) => {
      window.open(url, "_self");
    });
  };

  const handleChangeLogin = (account, password) => {
    dispatch({
      type: "LOGIN_INPUT_CHANGE",
      account,
      password,
    });
  };

  const LogIn = async () => {
    if (!account || !password) {
      Swal.fire({
        icon: "error",
        title: "Email or Password empty",
      });
      return;
    }

    let res = await memberCheck("web", { account, password: btoa(password) });
    if (res === "not_member") {
      Swal.fire({
        icon: "error",
        title: "Email not registered",
      });
    } else if (res === "password_error") {
      Swal.fire({
        icon: "error",
        title: "Wrong password",
      });
    } else {
      dispatch({
        type: "LOG_IN",
        memberName: res.name,
        memberId: res.id,
        memberEnable: res.enable,
      });

      dispatch({
        type: "LOGIN_MODAL",
        loginModalStatus: false,
      });

      eventAlert("Welecome back " + res.name);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="d-flex">
        <Col className="mb-3">
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => handleChangeLogin(e.target.value)}
              type="text"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => handleChangeLogin(null, e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              className="shadow-none"
              variant="outline-secondary"
              onClick={() => {
                dispatch({
                  type: "SIGN_UP_MODAL",
                  signUpModalStatus: true,
                });
              }}
              style={{ marginRight: "5%" }}
            >
              SignUp
            </Button>
            <Button   className="shadow-none" onClick={LogIn}>LogIn</Button>
          </div>
        </Col>

        <Col className="other_login">
          <div onClick={FacebookLogIn} className="mt-3">
            <img src={require("../../image/facebook3.png")} alt="Background" />
            <span>Log in with Facebook</span>
          </div>
          <div onClick={LineLogIn} className="mt-3">
            <img src={require("../../image/btn_base.png")} alt="Background" />
            <span>Log in with Line</span>
          </div>
        </Col>
      </Modal.Body>
    </Modal>
  );
}

export default LogInModal;
