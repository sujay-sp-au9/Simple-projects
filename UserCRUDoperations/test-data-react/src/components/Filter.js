import React, { useState, useEffect } from "react";
import { Card, Button, Input, Pagination, InputNumber } from "antd";

const { Search } = Input;

export default function FilterSort({
  filteredUsers,
  setFilterOptionsOpen,
  setPage,
  setFilter,
}) {
  const [ageLower, setAgeLower] = useState(2000);
  const [ageUpper, setAgeUpper] = useState(2000);
  const [filterAgeLower, setFilterAgeLower] = useState(2000);
  const [filterAgeUpper, setFilterAgeUpper] = useState(2020);
  useEffect(() => {
    let lower = Infinity;
    let upper = -Infinity;
    filteredUsers.forEach((user) => {
      const year = new Date(user["Date of birth"]).getUTCFullYear();
      if (lower > year) {
        lower = year;
      }
      if (upper < year) {
        upper = year;
      }
    });
    setTimeout(() => {
      setAgeLower(lower);
      setAgeUpper(upper);
      setFilterAgeLower(lower);
      setFilterAgeUpper(upper);
    }, 1000);
  }, [filteredUsers]);
  console.log(filterAgeUpper);
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Button
        onClick={() => {
          setFilter({
            ageLower,
            ageUpper,
          });
          setPage(1);
          setFilterOptionsOpen(false);
        }}
        danger
        type="primary"
        style={{ marginRight: "1vw" }}
      >
        Submit Filter
      </Button>
      <Card size="small" title="Filter by DOB" style={{ marginRight: "1vw" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "0.5vw",
          }}
        >
          <InputNumber
            value={filterAgeLower}
            min={ageLower}
            max={ageUpper}
            onChange={(value) => {
              if (value >= ageLower && value <= ageUpper) {
                setFilterAgeLower(value);
              }
            }}
          />
          <span>
            {ageLower} to {ageUpper}
          </span>
          <h3>TO</h3>
          <InputNumber
            value={filterAgeUpper}
            min={filterAgeLower}
            max={ageUpper}
            onChange={(value) => {
              if (value >= filterAgeLower && value <= ageUpper) {
                setFilterAgeUpper(value);
              }
            }}
            onStep={(value, info) => {
              if (info.type === "up") {
                if (value >= filterAgeLower && value <= filterAgeUpper) {
                  setFilterAgeUpper(value);
                }
              } else {
                if (value >= filterAgeLower && value <= filterAgeUpper) {
                  setFilterAgeLower(value);
                }
              }
            }}
          />
          <span>
            {ageLower} to {ageUpper}
          </span>
        </div>
      </Card>
      <Card size="small" title="Filter by Country">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "0.5vw",
          }}
        >
          <Search />
          <Button size="small">Lebanon</Button>
          <Button size="small">Lebanon</Button>
          <Button size="small">Lebanon</Button>
          <Button size="small">Lebanon</Button>
          <Button size="small">Lebanon</Button>
          <Pagination
            simple
            defaultCurrent={1}
            total={50}
            pageSize={5}
            onChange={function (page, pageSize) {}}
          />
        </div>
      </Card>
    </div>
  );
}
