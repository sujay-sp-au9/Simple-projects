import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, Pagination } from "antd";
import Axios from "axios";

import Filter from "./Filter";
import Search from "./Search";
import Users from "./Users";

const pageSize = 10;

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(null);
  const [filterOptionsOpen, setFilterOptionsOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [operated, setOperated] = useState(0);
  useEffect(() => {
    let temp = allUsers;
    if (searchTerm.length > 0) {
      temp = temp.filter((user) => user["Full Name"].search(searchTerm) !== -1);
    }
    if (filter) {
      temp = temp.filter();
    }
    setFilteredUsers(temp);
  }, [searchTerm, filter, allUsers, page]);
  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:5000/users",
    })
      .then((res) => setAllUsers(res.data))
      .catch((err) => console.log(err));
  }, [operated]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {filterOptionsOpen ? (
        <div
          style={{ display: "flex", justifyContent: "center", margin: "1vw" }}
        >
          <Button onClick={() => setFilterOptionsOpen(false)} type="primary">
            Nevermind
          </Button>
        </div>
      ) : (
        <div
          style={{ display: "flex", justifyContent: "center", margin: "1vw" }}
        >
          <Button
            onClick={() => setFilterOptionsOpen(true)}
            type="primary"
            style={{ marginRight: "1vw" }}
          >
            Filter
          </Button>
          <Button type="primary">Clear filter</Button>
        </div>
      )}
      {filterOptionsOpen ? (
        <Filter
          filteredUsers={filteredUsers}
          setPage={setPage}
          setFilter={setFilter}
          setFilterOptionsOpen={setFilterOptionsOpen}
        />
      ) : null}
      <Search setPage={setPage} setSearchTerm={setSearchTerm} />
      <Button
        onClick={() => setOperated((prev) => prev + 1)}
        type="primary"
        style={{ marginBottom: "1vh" }}
      >
        Add User
      </Button>
      <Users
        users={filteredUsers}
        page={page}
        pageSize={pageSize}
        setOperated={setOperated}
      />
      <Pagination
        simple
        defaultCurrent={1}
        total={filteredUsers.length}
        pageSize={pageSize}
        onChange={function (page) {
          setPage(page);
        }}
      />
    </div>
  );
}
