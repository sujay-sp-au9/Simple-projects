import React, { Component } from "react";
import { connect } from "react-redux";

class SongDetail extends Component {
  render() {
    return (
      <div>
        <h3>Selected Song below</h3>
        {this.props.song?.title}
        <br />
        {this.props.song?.duration}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { song: state.selectedSong };
};

export default connect(mapStateToProps)(SongDetail);
