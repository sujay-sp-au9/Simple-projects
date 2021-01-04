import React, { useState } from "react";

export default function SearchBar({ onSubmit }) {
  const [searchInput, setSearchInput] = useState("");
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchInput);
  };
  return (
    <div className="search-bar ui segment">
      <form onSubmit={onFormSubmit} className="ui form">
        <div className="field">
          <label>Search</label>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}
