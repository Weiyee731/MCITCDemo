import React, { Component } from "react";
import { CircularProgress } from '@mui/material';


class LoadingPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const stylesheet = {
            displayLoadingPanel: {
                width: "100%",
                height: "100%",
                zIndex: "0",
                // backgroundColor: "white",
                display: "flex",
                position: "absolute",
                top: "0",
                left: "0",
            },
            loadingObject: {
                width: "100%",
                height: "100%",
                display: "flex",
                backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : "white",
            },
            centerObject: {
                margin: "auto"
            },
        }

        return (
            <div style={stylesheet.displayLoadingPanel}>
                <div style={stylesheet.loadingObject}>
                    <CircularProgress color="primary" style={stylesheet.centerObject} />
                </div>
            </div>
        );
    }
}

export default LoadingPanel;