import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 64.129155,
      lng: -21.876455
    },
    zoom:15
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '200px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyCZvSVuamBzdSCzEQC4EvDyhmZZzusjFzw' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={64.129155}
            lng={-21.876455}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;