/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Logo from './LinkedSDG_square.jpg';
import logoUN from './logos/logo.png';
import logoEpis from './logos/logoEpistemik.png';
import logoSDG from './logos/sdglogo.jpg';
import logoUNG from './logos/ung-sq.png';

import './About.scss'


class About extends Component {
    constructor(props) {
        super(props);
    }

    state = {
    };

    render() {
        return (
            <React.Fragment>
                <div className="about-container">
                    <div className="about-content">
                        <Row>
                            <Col lg={12}>
                                <Row>
                                    <Col lg={8} >

                                        <h3 className="title">About</h3>
                                        <p className="Description">
                                            LinkedSDGs application has been developed under the leadership of the Statistics Division and the Division for Sustainable Development Goals’ (DSDG) of the Department of Economic and Social Affairs, with the support of resources from the EU grant entitled “SD2015: delivering on the promise of the SDGs”. It showcases the usefulness of adopting Semantic Web technologies and Linked Open Data principles for extracting SDG related metadata from documents and establishing the connections among various SDGs.  It is hosted under the infrastructure of the UN Global Platform for Official Statistics initiative.  For more information, see:
                                            <a href="https://sustainabledevelopment.un.org/LinkedSDGs/about" target="_blank" className="about-link">
                                                <span >https://sustainabledevelopment.un.org/LinkedSDGs/about</span>
                                            </a> .
                                        </p>
                                    </Col>
                                    <Col lg={4} className="main-image">
                                        <img src={Logo} alt="Upload"></img>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <h3 className="title">Contributors</h3>
                            </Col>
                        </Row>
                        <Row className="logos">

                            <Col lg={3} md={6} xs={12} >
                                <img src={logoUN} alt="logoUN"></img>
                            </Col>
                            <Col lg={3} md={6} xs={12} >
                                <img src={logoEpis} alt="logoEpis"></img>
                            </Col>
                            <Col lg={3} md={6} xs={12} >
                                <img src={logoSDG} alt="logoSDG"></img>
                            </Col>
                            <Col lg={3} md={6} xs={12} >
                                <img src={logoUNG} alt="logoUNG"></img>
                            </Col>

                        </Row>

                        <Row>
                            <Col lg={12}>
                                <h3 className="title">Contact</h3>
                                <p className="Description">
                                    If you have any questions, contact us!
                                </p>
                                <p className="Description">
                                    Email: .....@.....
                                </p>
                            </Col>
                        </Row>
                    </div>
                </div>

            </React.Fragment>


        )
    }
}

export default About;