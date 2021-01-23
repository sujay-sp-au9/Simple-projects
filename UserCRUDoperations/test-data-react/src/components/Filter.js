import React, { useState, useEffect } from "react";
import { Card, Button, Input, InputNumber, Menu, Dropdown, Space } from "antd";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function FilterSort({ filteredUsers, setPage, setFilter }) {
  const [ageLower, setAgeLower] = useState(2000);
  const [ageUpper, setAgeUpper] = useState(2000);
  const [filterAgeLower, setFilterAgeLower] = useState(2000);
  const [filterAgeUpper, setFilterAgeUpper] = useState(2020);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [
    debouncedSearchForCountryFilter,
    setDebouncedSearchForCountryFilter,
  ] = useState("");
  const [searchTermForCountryFilter, setSearchTermForCountryFilter] = useState(
    ""
  );
  const [finalCountryFilter, setFinalCountryFilter] = useState([]);
  useEffect(() => {
    let lower = Infinity;
    let upper = -Infinity;
    let uniqueCountries = new Set();
    filteredUsers.forEach((user) => {
      uniqueCountries.add(user.Country.toLowerCase());
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
      setCountries(Array.from(uniqueCountries));
    }, 1000);
  }, [filteredUsers]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTermForCountryFilter(debouncedSearchForCountryFilter);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [debouncedSearchForCountryFilter]);
  useEffect(() => {
    setFilteredCountries(
      countries
        .filter(
          (country) =>
            country.search(searchTermForCountryFilter.toLowerCase()) !== -1
        )
        .slice(0, 5)
    );
  }, [searchTermForCountryFilter, countries]);
  const menu = (
    <Menu>
      {filteredCountries.map((country) => (
        <Menu.Item
          key={country}
          onClick={() => setFinalCountryFilter((prev) => [...prev, country])}
        >
          {country}
        </Menu.Item>
      ))}
    </Menu>
  );
  const renderedFinalCountryFilter = finalCountryFilter.map((country) => (
    <Space align="start">
      <p>{country}</p>
      <CloseOutlined
        onClick={() =>
          setFinalCountryFilter((prev) =>
            prev.filter((item) => item !== country)
          )
        }
      />
    </Space>
  ));
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Button
        onClick={() => {
          setFilter({
            filterAgeLower,
            filterAgeUpper,
            finalCountryFilter,
          });
          setPage(1);
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
          {renderedFinalCountryFilter}
          <Search
            onChange={(e) => setDebouncedSearchForCountryFilter(e.target.value)}
          />
          <Dropdown overlay={menu}>
            <h4
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Search <DownOutlined />
            </h4>
          </Dropdown>
        </div>
      </Card>
    </div>
  );
}
