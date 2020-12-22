import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: "" };
    this.onInputChange = (e) => {
      document.getElementById("search-bar").style.border = "revert";
      this.setState({ searchInput: e.target.value });
    };
    this.getSearchResults = (e) => {
      e.preventDefault();
      if (this.state.searchInput.length > 0) {
        props.onSubmit(this.state.searchInput);
      } else {
        document.getElementById("search-bar").style.border = "2px solid red";
      }
    };
  }

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.getSearchResults}>
          <div className="field">
            <label>Image Search</label>
            <input
              id="search-bar"
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

export default SearchBar;
