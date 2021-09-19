import React from "react";
import Footer from "../Footer/Footer";
import { Container, Row, Col } from "react-bootstrap";

function Travel() {
  return (
    <>
      <section className="wrap">
        <div className="travel_img">
          <img
            src={require("../../image/landscape-5272817_1920.jpg")}
            alt="Background"
          />
        </div>
        <div className="travel_title">
          <span>Travel And Life</span>
        </div>
        <Container className="travel_body">
          <Row className="travel_row">
            <Col className="travel_txt" xs={4}>
              <span className="travel_aside">Volcanoes</span>
              <span className="travel_line"></span>
            </Col>
            <Col xs={7} className="travel_input">
              <span>
                Let’s get the infamous out of the way first shall we?
                Eyjafjallajökull famously erupted in 2010, disrupting air travel
                all over the world. In fact the volcano is one of the most
                active in Iceland, erupting frequently ever since the last
                glacial period. The Eyjafjallajökull volcano is completely
                covered by an ice cap that covers an area of over 100 square
                kilometres. The volcano‘s activity level is listed as moderate
                but no activity has been detected since the 2010 eruption..
              </span>
              <a className="submit" href="#">
                View Map
              </a>
            </Col>
          </Row>
          <Row className="travel_row">
            <Col className="travel_txt" xs={4}>
              <span className="travel_aside">Relaxing </span>
              <span className="travel_aside">Soak</span>
              <span className="travel_line"></span>
            </Col>
            <Col xs={7} className="travel_input">
              <span>
                The Sóley Spa at the Icelandair Hotel Natura is a favourite
                among the locals for a quick, relaxing soak and perhaps a glass
                of bubbly with some friends if the occasion warrants. The spa
                itself consists of a hot tub, a floating pool, a steam room and
                a sauna.
              </span>
              <a className="submit" href="#">
                https://www.icelandtravel.is/
              </a>
            </Col>
          </Row>
          <Row className="travel_row">
            <Col className="bot_img" xs={12}>
              <img src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/ut3ap6qimmaddgyzv8ir/%E5%86%B0%E5%B3%B6%E9%BB%83%E9%87%91%E5%9C%88%E8%BF%BD%E5%B0%8B%E6%A5%B5%E5%85%89%E4%B8%80%E6%97%A5%E9%81%8A.jpg" />
            </Col>
          </Row>
          <Footer />
        </Container>
      </section>
    </>
  );
}

export default Travel;
