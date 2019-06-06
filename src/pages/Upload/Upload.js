import React, { Component } from 'react';
import './Upload.scss'
import ConceptList from '../../components/ConceptList/ConceptList';
import UploadComponent from '../../components/UploadComponent/UploadComponent';
import LinkedConceptsList from '../../components/LinkedConceptsList/LinkedConceptsList';
import Spinner from '../../components/Spinner/Spinner';
import {handleUploadFile, handleUrlFile, processText} from './utilities';
import Button from 'react-bootstrap/Button';
import MainContext from '../../context/main-context';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CopyIcon from './copy-icon.png';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.handleUploadFile = handleUploadFile.bind(this);
        this.handleUrlFile = handleUrlFile.bind(this);
        this.processText = processText.bind(this);
    }

    static contextType = MainContext;

    state = {
        plainText: '',
        concepts: [],
        linkedData: {},
        isLoading: false,
        contentLoaded: false,
        tryItLink: '',
        loadedFrom: '',
        error: ''
    };

    clear = (event) => {
        this.setState({plainText: '',
        concepts: [],
        linkedData: {},
        isLoading: false,
        contentLoaded: false,
        error: ''
        })

        this.context.waitForData = true;
    }

    render() {
        return (
            <div className="Upload">
                <div className="upload-content">
                <Row>
                    <Col lg={4}>
                        <p className="Description">
                            Upload a document (PDF, DOC, DOCX, HTML) related to Sustainable Development Goals (SDGs) or paste its URL in order to analyse it. You can use some of the example links listed below:
                        </p>
                    </Col>
                    <Col lg={8}>
                        inputs
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} className="analyze-button-container">
                        <Button variant="primary" className="analyze-button">
                                ANALYZE
                        </Button>    
                    </Col>
                    <Col lg={8} className="example-links">
                        <ul>
                            <li>
                                <span onClick={() => this.setState({tryItLink: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2016/08/2_Why-it-Matters_ZeroHunger_2p.pdf"})}><img src={CopyIcon}></img></span>
                                <a href="https://www.un.org/sustainabledevelopment/wp-content/uploads/2016/08/2_Why-it-Matters_ZeroHunger_2p.pdf">Zero Hunger: Why It Matters?</a>
                            </li> 
                            <li>
                                <span onClick={() => this.setState({tryItLink: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2017/02/ENGLISH_Why_it_Matters_Goal_17_Partnerships.pdf"})}><img src={CopyIcon}></img></span>
                                <a href="https://www.un.org/sustainabledevelopment/wp-content/uploads/2017/02/ENGLISH_Why_it_Matters_Goal_17_Partnerships.pdf">Partnerships: Why They Matter?</a>
                                </li>
                            <li>
                                <span onClick={() => this.setState({tryItLink: "http://www.transforming-tourism.org/goal-14-life-below-water.html"})}><img src={CopyIcon}></img></span>
                                <a href="http://www.transforming-tourism.org/goal-14-life-below-water.html">Conserve and sustainably use the oceans, seas and marine resources for sustainable development</a>
                                </li>
                            <li>
                                <span onClick={() => this.setState({tryItLink: "https://www.theguardian.com/business-call-to-action-partnerzone/2019/apr/29/gender-equality-closing-the-gap-in-the-private-sector-around-the-world"})}><img src={CopyIcon}></img></span>
                                <a href="https://www.theguardian.com/business-call-to-action-partnerzone/2019/apr/29/gender-equality-closing-the-gap-in-the-private-sector-around-the-world">Gender equality: closing the gap in the private sector around the world</a>
                                </li>
                        </ul>
                    </Col>
                </Row>
                    {this.context.waitForData || this.state.isLoading ? (
                        <div>
                            
            
                            
                        </div>
                    ) : (
                        <p>Informations was extracted from {this.state.loadedFrom}.</p>
                    )}
                </div>
                
                {this.state.isLoading ? (
                    <Spinner />
                ) : (
                !this.context.waitForData ? (
                    <div className="Data-Area">
                        
                        <ConceptList Concepts={this.state.concepts}></ConceptList>

                        <LinkedConceptsList Data={this.state.linkedData}></LinkedConceptsList>

                        {/* <h3 className="Title">PlainText</h3>
                        <p>{this.state.plainText}</p> */}

                        <div className="clear-button">
                            <Button variant="primary" onClick={this.clear}>
                                CLEAR
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="Content">
                        <UploadComponent handleUploadFile={this.handleUploadFile} handleUrlFile={this.handleUrlFile}  tryItLink={this.state.tryItLink} key={this.state.tryItLink}></UploadComponent>
                    </div>
                ))}
                <p>{this.state.error}</p>
            </div>
        )
    }
}

export default Upload;