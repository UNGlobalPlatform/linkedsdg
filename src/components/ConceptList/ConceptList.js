/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import './ConceptList.scss';
import ConceptItem from './ConceptItem/ConceptItem';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BubbleChart from '../BubbleChart/BubbleChart'


class ConceptList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.Concepts,
            displayData: props.Concepts
        };
    }

    handleDownload = async () => {
        let dataForJson = [...this.state.data];
        dataForJson = dataForJson.map(x => {
            return {
                id: x.id,
                label: x.label,
                source: x.source
            };
        })

        let filename = "export.json";
        let contentType = "application/json;charset=utf-8;";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(dataForJson)))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            var a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(dataForJson));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    handlerForOpen = async (uri) => {
        let data = await this.state.data.map(x => { if (x.id === uri) { x.open = !x.open } return x })
        await this.setState({
            data: data
        })
    }

    render() {
        return (
            <div className="linked-concepts-container">
                <h3 className="Title">
                    Extracted concepts
                </h3>
                <div className="grid-container">
                    <div className="grid-item">
                        <ul className="keywords-list" id="keywords-list-id">
                            {this.state.displayData.map((concept, index) => <ConceptItem handlerForOpen={this.handlerForOpen} concept={concept} key={index}></ConceptItem>)}
                        </ul>
                        <Row>
                            <Col className="download-button">
                                <Button variant="primary" onClick={this.handleDownload}>
                                    ⤓ Download
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <div className="grid-item">
                        <BubbleChart handlerForOpen={this.handlerForOpen} data={this.props.Concepts}></BubbleChart>
                        <Row className="BubbleChart-info">
                            <Col>
                                <i>Source: </i>
                                <i><a href="http://metadata.un.org/thesaurus/" target="_blank"><span className="UNBIS"></span> UNBIS</a></i>
                                <i><a href="https://publications.europa.eu/en/web/eu-vocabularies/th-dataset/-/resource/dataset/eurovoc" target="_blank"><span className="EuroVoc"></span> EuroVoc</a></i>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}


export default ConceptList;