import React, { Component } from 'react'; 
import Button from 'react-bootstrap/Button';
import DataSeriesTable from './DataSeriesComponent/DataSeriesComponent'
import './ZoomableSunburst.scss'
import {
    chooseState,
    setSunState,
    selectImage,
    loadConcepts,
    describeCountry,
    expandCountryDetailsOnClick,
    expandAllCountryDetailsOnClick,
    getJsonWithImportantFields,
    getSeriesJsonFromApi,
    getJsonDescribeOfUri
} from './utilities';

import { drawChart } from './drawFunction';

class ZoomableSunburst extends Component {
    constructor(props) {
        super(props);
        this.chooseState = chooseState.bind(this);
        this.setSunState = setSunState.bind(this);
        this.selectImage = selectImage.bind(this);
        this.loadConcepts = loadConcepts.bind(this);
        this.describeCountry = describeCountry.bind(this);
        this.expandCountryDetailsOnClick = expandCountryDetailsOnClick.bind(this);
        this.expandAllCountryDetailsOnClick = expandAllCountryDetailsOnClick.bind(this);
        this.getJsonWithImportantFields = getJsonWithImportantFields.bind(this);
        this.getSeriesJsonFromApi = getSeriesJsonFromApi.bind(this);
        this.getJsonDescribeOfUri = getJsonDescribeOfUri.bind(this);
        this.drawChart = drawChart.bind(this);
    }


    componentDidMount() {
        this.drawChart();
    }

    state = {
        svgElement: '',
        lastPointedData: '',
        clickedData: {},
        dataForPreview: undefined,
        selectedGoal: undefined,
        selectedGoalName: 'Sustainable Development Goals',
        countrySeriesData: [],
        sunState: "root",
        lastNode: undefined,
    }

    render() {
        return (
            <React.Fragment>
                <h3 className="Title">
                    Most relevant SDGs
                </h3>
                <div className="grid-container">
                    <div>
                        <div id={"ZoomableSunburst"} className="grid-item"></div>

                    </div>

                    <div className="grid-item">
                        <div className="grid-container-info">
                            <div className="goal-image-container">
                                {this.selectImage()}
                            </div>
                            <div>
                                <h3 className="title">{this.state.selectedGoalName}</h3>
                            </div>
                            <div id="informationFromTheSun" className="grid-item-text">

                                {this.state.dataForPreview ? (
                                    <React.Fragment>
                                        <p>
                                            <span>LABEL: </span>
                                            {this.state.dataForPreview.label}
                                        </p>

                                        <p>
                                            <span>NAME: </span>
                                            {this.state.dataForPreview.name}
                                        </p>
                                    </React.Fragment>
                                ) : (this.state.clickedData.id ? (
                                    <React.Fragment>

                                        <p>
                                            <span>LABEL: </span>
                                            {this.state.clickedData.label}
                                        </p>

                                        <p>
                                            <span>NAME: </span>
                                            {this.state.clickedData.name}
                                        </p>
                                        <p onClick={this.getJsonDescribeOfUri} className="uri-link">
                                            <span>URI: </span>
                                            {this.state.clickedData.id}
                                        </p>
                                        <p> <span>CONCEPTS: </span> </p>
                                        {this.loadConcepts()}


                                    </React.Fragment>
                                ) : (
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis justo sit amet eros viverra finibus. Vestibulum erat risus, dapibus sit amet lacus a, porttitor accumsan dui.
                                        </p>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.sunState === "series" ? (
                    <div className="country-series-info"> 

                        {/* Need to add columns */}
                        <DataSeriesTable data={this.state.countrySeriesData} description={this.state.clickedData.name}></DataSeriesTable>

                        <Button variant="primary" onClick={this.getSeriesJsonFromApi} className="series-get-data">
                            ⤓ Get data
                        </Button>
                    </div>

                ) :
                    (<React.Fragment></React.Fragment>)
                }


            </React.Fragment>
        )
    }
}

export default ZoomableSunburst;