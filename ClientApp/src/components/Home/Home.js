import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../Footer/Footer";
import SearchRoom from "../OurApartment/SearchRoom";


function Header() {
  return (
    <>
      <section className="wrap">
        <div className="travel_img">
          <img src={require("../../image/866.jpg")} alt="Background" />
        </div>
  
        <div className="travel_title">
          <span>&nbsp; Welcome &nbsp; to &nbsp; Iceland</span>
        </div>

        <Container className="travel_body">
          <Row className="body_booking">
            <Col className="body_booking2" xs={12}>
              <SearchRoom />
            </Col>
          </Row>
          <Row>
            <Col className="body_txt">
              <span className="body_title">
                A Home in the Heart of the City
              </span>
              <span className="txt_line"></span>
              <span className="txt_info">
                Stay in a beautiful highrise in Ipanema just off the beach close
                to many world-class cafes and restaurants. Enjoy Bossa Nova with
                a cold beer!
              </span>
            </Col>
          </Row>
          <Row className="body_Introduction">
            <Col className="Introduction_txt" xs={4}>
              <span>Our</span>
              <span>Apartment</span>
              <span className="txt_line"></span>
            </Col>
            <Col className="Introduction_img" xs={8}>
              <img src="https://static.wixstatic.com/media/05e3dc_daaec437e6874a2d943dd58eb83fa475.jpg/v1/fill/w_649,h_270,al_c,q_80,usm_0.66_1.00_0.01/05e3dc_daaec437e6874a2d943dd58eb83fa475.webp" />
            </Col>
          </Row>
          <Row className="body_Introduction">
            <Col className="Introduction_txt" xs={4}>
              <img src="https://static.wixstatic.com/media/05e3dc_914192924e1144bf9db5339e363d545d.jpg/v1/fill/w_330,h_280,al_c,q_80,usm_0.66_1.00_0.01/05e3dc_914192924e1144bf9db5339e363d545d.webp" />
            </Col>
            <Col className="Introduction_img" xs={8}>
              <span>
                The apartment is spacious with high ceilings, large windows, an
                open balcony and a beautiful view of the beach. Stay cool with
                central A/C and wind-down comfortably in the queen sized
                bedroom.
              </span>
              <a href="#">BOOK NOW</a>
            </Col>
          </Row>
          <div className="space"></div>
          <Row className="body_Location">
            <Col className="location_img" xs={8}>
              <img src="https://fpscdn.yam.com/world/201702/26/6d/58b3ca129266d.jpg" />
            </Col>
            <Col className="location_info" xs={4}>
              <span>Location</span>
              <span className="txt_line"></span>
            </Col>
          </Row>
          <Row className="view_map">
            <Col className="view_map_txt" xs={12}>
              <span>
                Conveniently located just opposite Leblon Beach in Ipanema, our
                apartment will sweep you into the charm and excitements of Rio!
                Dine at one of our neighborhood’s many world-renowned
                restaurants, enjoy fresh-squeezed juices from one of the
                colourful stalls along the beach, and don’t miss live bossy-nova
                show in one of the local bars.
              </span>
              <a href="#">VIEW MAP</a>
            </Col>
          </Row>
          <Row className="stay">
            <Col className="stay_img" xs={4}>
              <img src="https://static.wixstatic.com/media/05e3dc_87b4e21658544ee6ade40077b0873c6d.jpg/v1/fill/w_330,h_359,al_c,q_80,usm_0.66_1.00_0.01/05e3dc_87b4e21658544ee6ade40077b0873c6d.webp" />
            </Col>
            <Col className="stay_txt" xs={8}>
              <span className="title">About Camila & Tiago </span>
              <span className="txt_line"></span>
              <span className="txt_info">
                Hi, my name is Camila and I’m a nutritionist from the south of
                Brazil. I moved to the beautiful Ipanema neighborhood two years
                ago with my husband, Tiago. We live in a homie highrise just off
                the Leblon Beach, but in the summer we travel!
              </span>
              <a href="#">STAY WITH US</a>
            </Col>
          </Row>
          <Footer />
        </Container>
      </section>
    </>
  );
}

export default Header;
