import React from "react"
import "./Contact.css"
import twitterIcon from "../../../Asset/nav-icon1.svg"
import facebookIcon from "../../../Asset/nav-icon2.svg"
import instaIcon from "../../../Asset/nav-icon3.svg"
import NavbarApp from "../Navbar/NavbarApp"
import { Col, Row } from "react-bootstrap"
import * as BiIcons from "react-icons/bi"

const Contact = () => {
  return (
    <>
      <NavbarApp />
      <div className="py-5  contact">
        <div className="logo">Shoe Site</div>

        <Row>
          <Col lg={7} className="d-flex justify-content-center">
            <div className="address-section">
                <h4>Registered Address</h4>
                <span className="m-0">Building Sample Name</span>
                <span className="m-0">Laxmi Chowk, Anant Nagar</span>
                <span className="m-0">Hinjewadi Phase - 1, Pimpri Chinchwad</span>
                <span className="m-0">Pune 41553, Maharashrta, India</span>
                <h4 className="mt-4">Contact Us</h4>
                <span className="m-0"> Phone : 75135671245</span>
                <span className="m-0"> Fax : 1256323555</span>
                <span className="m-0">E-mail: samplename@shoesite.com</span>
            </div>

          </Col>

          <Col lg={4} className="social-icon">
            <Row className="d-flex align-items-center">
            <a href="#" className="twitter-icon">
                <img src={twitterIcon} alt="" />
              </a>
                @sampleTwitter
            </Row>
            <Row className="d-flex align-items-center">
              <a href="#" className="facebook-icon">
                <img src={facebookIcon} alt="" />
              </a>
              @sampleFacebook
            </Row>
            <Row className="d-flex align-items-center">
              <a href="#" className="insta-icon">
                <img src={instaIcon} alt="" />
              </a>
              @sampleInstagram
            </Row>
            <Row>
              <span className="copyright"><BiIcons.BiCopyright/><span>2021-Present - Shoe Site Pvt. Ltd.</span> </span>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Contact
