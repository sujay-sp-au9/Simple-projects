import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [searchInput, setSearchInput] = useState("news");
  const [debouncedSearchInput, setDedouncedSearchInput] = useState(searchInput);
  const [results, setResults] = useState([]);

  const onInputChange = (e) => {
    if (e.target.value.length === 0) {
      document.querySelector(".input").style.border = "2px solid red";
    } else {
      document.querySelector(".input").style.border = "revert";
    }
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(
      () => setDedouncedSearchInput(searchInput),
      750
    );
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInput]);

  useEffect(() => {
    if (debouncedSearchInput) {
      axios({
        method: "GET",
        url: "https://en.wikipedia.org/w/api.php",
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedSearchInput,
        },
      })
        .then((res) => {
          setResults(res.data.query.search);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [debouncedSearchInput]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            target="__blank"
            rel="noopener noreferrer"
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }} />
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            className="input"
            type="text"
            value={searchInput}
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
