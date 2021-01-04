import React from "react";

export default class SearchBar extends React.Component {
  state = { searchInput: "" };
  onInputChange = (e) => {
    this.setState({ searchInput: e.target.value });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchInput);
  };
  render() {
    return (
      <div className="search-bar ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Search</label>
            <input
              type="text"
              value={this.state.searchInput}
              onChange={this.onInputChange}
            />
          </div>
        </form>
      </div>
    );
  }
}
