import React, { useEffect } from "react";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "../Home/Home";
import OurApartment from "../OurApartment/OurApartment";
import Contact from "../Contact/Contact";
import Travel from "../Travel/Travel";
import LogInModal from "../Member/LogInModal";
import ReserveRoom from "../Member/ReserveRoom";
import SignUp from "../Member/SignUp";
import MemberOrder from "../Member/MemberOrder";

function Header() {
  const {
    loginModalStatus,
    signUpModalStatus,
    reserveOrderModalStatus,
    memberOrderModalStatus,
    logStatus,
    logMethod,
    memberId,
    memberName,
    memberCheck,
    eventAlert,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    Line_LogIn_check();
  }, []);

  // Line 登入要用到的常數
  const client_id = "1656389623";
  const client_secret = "99f89b0abdb898b5c3b710a67c6ddbe4";
  const redirect_uri = "https://abundant.azurewebsites.net/";

  // Line登入用函數

  const Line_LogIn_check = () => {
    if (window.location.href.indexOf("?") === -1) {
      return;
    }

    let url = new URL(window.location.href);

    if (url.searchParams.get("code")) {
      fetch("https://api.line.me/oauth2/v2.1/token", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: new URLSearchParams({
          client_id,
          client_secret,
          grant_type: "authorization_code",
          redirect_uri,
          code: url.searchParams.get("code"),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.error) {
            Line_ID_Token_Decode(res);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const Line_ID_Token_Decode = (line_token) => {
    fetch("https://api.line.me/oauth2/v2.1/verify", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: new URLSearchParams({
        client_id,
        id_token: line_token.id_token,
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        let member_res = await memberCheck("line", res.sub);

        if (member_res === "first_login") {
          dispatch({
            type: "INIT_SIGN_UP_DATA",
            memberName: res.name,
            memberEmail: res.email,
            memberSecondId: { LineId: res.sub },
            logMethod: "line",
          });

          dispatch({
            type: "SIGN_UP_MODAL",
            signUpModalStatus: true,
          });
        } else {
          dispatch({
            type: "LOG_IN",
            memberName: member_res.name,
            memberId: member_res.id,
            memberEnable: member_res.enable,
          });
          eventAlert("Welecome back " + member_res.name);
        }
      })
      .catch((err) => console.log(err));
  };

  // FB 登入用函數

  window.fbAsyncInit = function () {
    window.FB.init({
      appId: "481119426971489",
      cookie: true,
      xfbml: true,
      status: true,
      version: "v11.0",
    });

    window.FB.getLoginStatus(async (response) => {
      if (response.status === "connected") {
        let res = await memberCheck("facebook", response.authResponse.userID);
        dispatch({
          type: "LOG_IN",
          memberName: res.name,
          memberId: res.id,
          memberEnable: res.enable,
          logMethod: "facebook",
        });
      }
    });
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");

  // 會員訂單查詢
  const fetchOrder = async (memberID) => {
    return await fetch("/api/member/memberorder", {
      method: "POST",
      body: JSON.stringify(memberID),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        if (res.status == 404) {
          return null;
        } else {
          return res.json();
        }
      })
      .then((res) => res)
      .catch((error) => error);
  };

  return (
    <>
      <Router>
        <Container className="Home_header">
          <Row className="nav_row d-flex ">
            <Col className="d-flex nav_col" xs={12}>
              <ul className="navbar_ul">
                <Link className="link" to="/">
                  <li>Home</li>
                </Link>
                <Link className="link" to="/OurApartment">
                  <li>OurApartment</li>
                </Link>
                <Link className="link" to="/Travel">
                  <li>Travel</li>
                </Link>
                <Link className="link" to="/Contact">
                  <li>Contact</li>
                </Link>
                {!logStatus ? (
                  <a className="link book_btn">
                    <li>
                      <button
                        onClick={() => {
                          dispatch({
                            type: "LOGIN_MODAL",
                            loginModalStatus: true,
                          });
                        }}
                      >
                        Log In
                      </button>
                    </li>
                  </a>
                ) : (
                  <DropdownButton
                    className="link"
                    variant="secondary"
                    flip="true"
                    title={memberName ?? "Account"}
                  >
                    <Dropdown.Item
                      className="shadow-none"
                      as="button"
                      onClick={async () => {
                        let res = await fetchOrder(memberId);
                        dispatch({
                          type: "FETCH_MEMBER_ORDER",
                          memberOrder: res,
                        });

                        dispatch({
                          type: "MEMBER_ORDER_MODAL",
                          memberOrderModalStatus: true,
                        });
                      }}
                    >
                      Orders
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="button"
                      onClick={() => {
                        if (logMethod === "facebook") {
                          window.FB.logout((res) => res);
                        }

                        dispatch({
                          type: "LOG_OUT",
                        });
                      }}
                    >
                      Log Out
                    </Dropdown.Item>
                  </DropdownButton>
                )}
              </ul>
            </Col>
          </Row>
        </Container>

        <LogInModal
          show={loginModalStatus}
          onHide={() => {
            dispatch({
              type: "LOGIN_MODAL",
              loginModalStatus: false,
            });
          }}
        />
        <SignUp
          show={signUpModalStatus}
          onHide={() => {
            dispatch({
              type: "SIGN_UP_MODAL",
              signUpModalStatus: false,
            });
          }}
        />

        <ReserveRoom
          show={reserveOrderModalStatus}
          onHide={() => {
            dispatch({
              type: "RESERVE_ORDER_MODAL",
              reserveOrderModalStatus: false,
            });
          }}
        />

        <MemberOrder
          show={memberOrderModalStatus}
          // show={true}
          onHide={() => {
            dispatch({
              type: "MEMBER_ORDER_MODAL",
              memberOrderModalStatus: false,
            });
          }}
        />

        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/OurApartment" component={OurApartment}></Route>
          <Route path="/travel" component={Travel}></Route>
          <Route path="/Contact" component={Contact}></Route>
          <Route path="/MemberOrder" component={ReserveRoom}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default Header;
