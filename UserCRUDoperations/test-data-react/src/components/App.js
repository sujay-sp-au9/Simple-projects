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
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [operated, setOperated] = useState(0);
  useEffect(() => {
    let idx = (page - 1) * pageSize;
    let temp = [];
    const interval = setInterval(() => {
      temp = allUsers.slice(idx, idx + 10);
      if (searchTerm.length > 0) {
        temp.push(
          temp.filter((user) => user["Full Name"].search(searchTerm) !== -1)
        );
      }
      if (filter && filter.filterAgeLower) {
        temp.push(
          temp.filter((user) => {
            const year = new Date(user["Date of birth"]);
            if (
              year <= filter.filterAgeUpper &&
              year >= filter.filterAgeLower
            ) {
              return true;
            } else return false;
          })
        );
      }
      idx += pageSize;
    }, 1000);
    if (temp.length >= pageSize) {
      setFilteredUsers(temp);
      clearInterval(interval);
    } else if (searchTerm.length === 0 && !filter) {
      setFilteredUsers(allUsers);
    }
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
      <Filter
        filteredUsers={filteredUsers}
        setPage={setPage}
        setFilter={setFilter}
      />
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
