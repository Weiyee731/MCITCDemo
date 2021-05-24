import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  InfoWindow,
  Marker,
  Polygon,
} from "google-maps-react";
import { toast } from "react-toastify";
export class GoogleMaps extends Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    center: { lng: this.props.longitude, lat: this.props.latitude },
    markerLabel: this.props.markerLabel,
    width: 0,
    height: 0,
    markers: [],
    id: [],
    counter: 0,
    path: new window.google.maps.MVCArray(),
    LocationToBeSent: null,
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  onMarkerClick = (id) => {
    var marker = this.state.markers[id];
    marker.setMap(null);
  };

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
    const poly = new window.google.maps.Polygon({
      strokeWeight: 2,
      fillColor: "#5555FF",
    });
    var id;
    const onMapClicked = (props, map, e) => {
      toast.success(e.latLng.lat() + " " + e.latLng.lng());
      var marker = new window.google.maps.Marker({
        position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
        map: map,
        draggable: true,
        key: this.state.counter.toString(),
      });
      id = marker.__gm_id;
      this.setState({
        markers: [...this.state.markers, marker],
      });
      toast.success(this.state.markers.map((marker) => marker.key));
      window.google.maps.event.addListener(marker, "rightclick", function (
        point
      ) {
        onMarkerClick(marker);
      });
      window.google.maps.event.addListener(marker, "drag", function (evt) {
        toast.success(marker.position.lat() + "  " + marker.position.lng());
        handleDrag(marker, map);
      });
      if (this.state.counter === 0) {
        toast.success("ran once");
        poly.setPaths(new window.google.maps.MVCArray([this.state.path]));
        poly.setMap(map);

        this.state.path.insertAt(this.state.path.length, {
          lat: e.latLng.lat,
          lng: e.latLng.lng,
        });
      } else {

        toast.success("ran again");
        this.state.path.setAt(this.state.path.length, {
          lat: e.latLng.lat,
          lng: e.latLng.lng,
        });

        toast.success("lat: " + e.latLng.lat(),
        "lng: " + e.latLng.lng() + " path: " + this.state.path.length);
      }

      this.setState({ counter: this.state.counter + 1 });
      if (this.state.markers.length > 0) {
        this.setState({
          LocationToBeSent:
            "POLYGON((" +
            this.state.markers.map(
              (marker) => marker.position.lng() + " " + marker.position.lat()
            ) +
            "," +
            this.state.markers[0].position.lng() +
            " " +
            this.state.markers[0].position.lat() +
            "))",
        });
      } else {
        this.setState({
          LocationToBeSent: "",
        });
      }
      this.props.setValue(this.state.LocationToBeSent);
    };

    const onMarkerClick = (markerss) => {
      var newList = this.state.markers;
      this.state.markers.map((marker, i) => {
        if (marker.key === markerss.key) {
          this.state.path.removeAt(i);
        }
      });
      newList = newList.filter(
        (markersKept) => markersKept.key !== markerss.key
      );
      this.setState({
        markers: newList,
      });

      toast.success( "key used: " + markerss.key + "path length: " + this.state.path.length);
      markerss.setMap(null);
      if (this.state.markers.length > 0) {
        this.setState({
          LocationToBeSent:
            "POLYGON((" +
            this.state.markers.map(
              (marker) => marker.position.lng() + " " + marker.position.lat()
            ) +
            "," +
            this.state.markers[0].position.lng() +
            " " +
            this.state.markers[0].position.lat() +
            "))",
        });
      } else {
        this.setState({
          LocationToBeSent: "",
        });
      }
      this.props.setValue(this.state.LocationToBeSent);
      toast.success( this.state.LocationToBeSent);
    };

    const handleDrag = (markerToBeUsed, mapToBeUsed) => {
      this.state.markers.map((marker, i) => {
        if (marker.key === markerToBeUsed.key) {
          this.state.path.removeAt(i);
          this.state.path.insertAt(i, {
            lat: markerToBeUsed.position.lat,
            lng: markerToBeUsed.position.lng,
          });
        }
      });
      //   this.state.path.removeAt(markerToBeUsed.key);

      poly.setMap(mapToBeUsed);
      if (this.state.markers.length > 0) {
        this.setState({
          LocationToBeSent:
            "POLYGON((" +
            this.state.markers.map(
              (marker) => marker.position.lng() + " " + marker.position.lat()
            ) +
            "," +
            this.state.markers[0].position.lng() +
            " " +
            this.state.markers[0].position.lat() +
            "))",
        });
      } else {
        this.setState({
          LocationToBeSent: "",
        });
      }

      this.props.setValue(this.state.LocationToBeSent);
      toast.success( this.state.LocationToBeSent);
    };
    return (
      <div>
        <p style={{ textAlign: "right", fontSize: "14px" }}>
          Click on the map to add a marker. Right-click to delete it and hold
          left-click to move it.
        </p>
        <Map
          onClick={onMapClicked}
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
        >
          {/* {this.props.polypath.map((POLY) => {
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
        })} */}

          <InfoWindow
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBtEc6iXwj2A_A-ft-GagAqEmJA4pYgidE",
})(GoogleMaps);
