import React from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import PageIndicator from "./components/PageIndicator";
import ImageList from "./components/ImageList";
import Spinner from "./components/spinner";

class App extends React.Component {
  state = { searchInput: "", images: [], page: 1, loading: false };
  setPage = async (e) => {
    if (e.target.innerText === "Prev page" && this.state.page > 1) {
      await this.setState({ page: this.state.page - 1 });
    } else if (e.target.innerText === "Next page") {
      await this.setState({ page: this.state.page + 1 });
    }
    this.populateResults();
  };

  onSearchSubmit = async (searchInput) => {
    await this.setState({ searchInput, page: 1 });
    this.populateResults();
  };

  populateResults = async () => {
    this.setState({ loading: true });
    const res = await axios({
      method: "GET",
      params: {
        per_page: 20,
        query: this.state.searchInput,
        page: this.state.page,
      },
      url: "https://api.unsplash.com/search/photos",
      headers: {
        Authorization: "Client-ID ttBtzJWFb4w2c22di-Nf3siBtx54NcNf0oNFON5SJs0",
      },
    });
    await this.setState({ images: res.data.results.map((elem) => elem) });
    this.setState({ loading: false });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <PageIndicator setPage={this.setPage} page={this.state.page} />
        <React.Fragment>
          {this.state.loading ? <Spinner message="Loading..." /> : ""}
        </React.Fragment>
        <h4>{`Found ${this.state.images.length} images`}</h4>
        <ImageList images={this.state.images} />
      </div>
    );
  }
}

export default App;
