import React from "react";
import { Container, Row, Col } from "react-bootstrap";
function Footer() {
  return (
    <>
      <Row className="footer">
        <Col className="footer_wrap" xs={4}>
          <span className="footer_title">
            {" "}
            <a href="#">Contact Us</a>{" "}
          </span>
          <span className="footer_line"></span>
          <span className="footer_info">
            Ask us anything! We’re here to answer any questions you have.
          </span>
        </Col>
        <Col className="footer_wrap" xs={4}>
          <span className="footer_title">Follow Us</span>
          <span className="footer_line"></span>
          <span className="footer_info">
            <img src="https://static.wixstatic.com/media/e5962905aaa34602acce3d3ae6d15faa.png/v1/fill/w_35,h_35,al_c,q_85,usm_0.66_1.00_0.01/e5962905aaa34602acce3d3ae6d15faa.webp" />
            <img src="https://static.wixstatic.com/media/d3470ec8ca26475da4b228f0199b5d3d.png/v1/fill/w_35,h_35,al_c,q_85,usm_0.66_1.00_0.01/d3470ec8ca26475da4b228f0199b5d3d.webp" />
            <img src="https://static.wixstatic.com/media/d7ffe259c9e54f59837481b3dd0130eb.png/v1/fill/w_35,h_35,al_c,q_85,usm_0.66_1.00_0.01/d7ffe259c9e54f59837481b3dd0130eb.webp" />
          </span>
        </Col>
        <Col className="footer_wrap" xs={4}>
          <span className="footer_title">Subscribe for Updates & Offers</span>
          <span className="footer_line"></span>
          <span className="footer_info">
            <input type="text" placeholder="Enter your email here" />
            <button>Subscribe Now</button>
          </span>
        </Col>
      </Row>
    </>
  );
}

export default Footer;
