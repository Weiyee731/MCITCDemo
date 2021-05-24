import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  InfoWindow,
  // Marker,
  Polygon,
} from "google-maps-react";

export class GoogleMaps extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  // }

  state = {
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
    center: { lng: this.props.longitude, lat: this.props.latitude },
    markerLabel: this.props.markerLabel,
    width: "100%",
    height: "100px",
  };

  // componentDidMount() {
  //   this.updateWindowDimensions();
  //   window.addEventListener('resize', this.updateWindowDimensions);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateWindowDimensions);
  // }

  // updateWindowDimensions() {
  //   this.setState({ width: window.innerWidth, height: window.innerHeight });
  // }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      draggable: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        draggable: true,
      });
    }
  };

  render() {
    console.log(this.props);
    return (
      <Map
        google={this.props.google}
        zoom={this.props.zoom ? this.props.zoom : 16}
        style={{
          width: this.state.width * 0.8,
          height: this.state.height * 0.5,
        }}
        initialCenter={
          this.state.center.lng && this.state.center.lat
            ? this.state.center
            : { lng: 110.433496, lat: 1.592174 }
        }
        containerStyle={{
          width: "100%",
          height: "90%",
          minHeight: "300px",
          position: "relative",
        }}
      >
        {/* <Marker
          onClick={this.onMarkerClick}
          name={this.state.markerLabel ? this.state.markerLabel : "MCITC"}
        /> */}

        {this.props.polypath.map((POLY) => {
          return (
            <Polygon
              path={POLY.ShoplotCoordinate}
              key={1}
              editable={false}
              options={{
                strokeColor: POLY.Color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: POLY.Color,
                fillOpacity: 0.35,
              }}
            />
          );
        })}

        <InfoWindow
          // marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBtEc6iXwj2A_A-ft-GagAqEmJA4pYgidE",
})(GoogleMaps);
