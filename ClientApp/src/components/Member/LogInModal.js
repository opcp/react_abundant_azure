import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

function LogInModal(props) {
  const dispatch = useDispatch();
  const {memberCheck,eventAlert} = useSelector((state) => state);
  // const memberName = (newMemberName) => {
  //   dispatch({
  //     type: "MEMBER_NAME",
  //     memberName: newMemberName,
  //   });
  // };

  const client_id = "1656389623";
  // const client_secret = "99f89b0abdb898b5c3b710a67c6ddbe4";
  const redirect_uri = "https://localhost:5001/";
  const state = "q1w2e3r4t5";
  const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=profile%20openid%20email&nonce=09876xyz`;

  const FacebookLogIn = () => {
    window.FB.login(
      function (response) {
        console.log(response);
        if (response.status === "connected") {
          window.FB.api(
            "/me?fields=id,name,email",
            async function (memberData) {
              console.log(JSON.stringify(memberData));
              let res = await memberCheck("facebook", memberData.id);
              console.log(res);

              if (res === "first_login") {
                dispatch({
                  type: "LOGIN_MODAL_HIDE",
                });

                dispatch({
                  type: "INIT_SIGN_UP_DATA",
                  memberName: memberData.name,
                  memberEmail: memberData.email,
                  memberSecondId: { FacebookId: memberData.id },
                  logMethod: "facebook",
                });

                dispatch({
                  type: "SIGN_UP_MODAL_SHOW",
                });
              } else {
                dispatch({
                  type: "LOG_IN",
                  memberName: res.name,
                  memberId: res.id,
                  logMethod: "facebook",
                });

                dispatch({
                  type: "LOGIN_MODAL_HIDE",
                });

                eventAlert("Welecome back " + res.name);
              }
            }
          );
          // Logged into your webpage and Facebook.
        } else {
          console.log("please log in");
          // The person is not logged into your webpage or we are unable to tell.
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
      console.log(res);
    });
  };

  // const MemberCheck = async (useWeb, id) => {
  //   const req = {};
  //   if (useWeb == "facebook") {
  //     req.FacebookId = id;
  //   } else if (useWeb == "line") {
  //     req.LineId = id;
  //   } else {
  //     req.ID = id;
  //   }

  //   return await fetch("/api/member/memberlogin", {
  //     method: "POST",
  //     body: JSON.stringify(req),
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //     }),
  //   })
  //     .then((res) => {
  //       if (res.status == 204) {
  //         return "first_login";
  //       } else {
  //         return res.json();
  //       }
  //     })
  //     .catch((error) => error);
  //   //  .then((res) => console.log(res));
  // };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Button onClick={FacebookLogIn}>Facebook</Button>
        <br />
        <Button onClick={LineLogIn}>Line</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LogInModal;
