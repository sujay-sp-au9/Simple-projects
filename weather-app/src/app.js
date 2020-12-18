import "./app.css";
import React from "react";
import SeasonDisplay from "./components/seasonDisplay";
import Spinner from "./components/spinner";

class App extends React.Component {
  state = {
    latitude: null,
    error: null,
    time: new Date(),
  };

  componentDidMount() {
    setTimeout(
      () =>
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
              latitude: position.coords.latitude,
            });
          },
          (err) => {
            this.setState({ error: err.message });
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        ),
      1000
    );
  }

  componentDidUpdate() {
    console.log(new Date() - this.state.time);
  }

  renderContent() {
    if (this.state.latitude && !this.state.error) {
      return <SeasonDisplay latitude={this.state.latitude} />;
    } else if (this.state.error && !this.state.latitude) {
      return <div>Error: {this.state.error}</div>;
    } else return <Spinner message="Waiting for location" />;
  }

  render() {
    return (
      <div style={{ border: "1px solid black", boxSizing: "border-box" }}>
        {this.renderContent()}
      </div>
    );
  }
}
export { App };
