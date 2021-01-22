import React, { useState, useEffect } from "react";
import { Input } from "antd";

export default function Search({ setPage, setSearchTerm }) {
  const [debouncedTerm, setDebouncedTerm] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1);
      setSearchTerm(debouncedTerm);
    }, 2000);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTerm]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Input
        placeholder="search Users by name"
        style={{ margin: "1vw", maxWidth: "500px", fontSize: "30px" }}
        bordered={false}
        onChange={(e) => setDebouncedTerm(e.target.value)}
      />
    </div>
  );
}
