import React from "react";
import { Card, Button } from "antd";

export default function User() {
  return (
    <div>
      <Card title="Full Name : Adolfo Walker">
        <p>Country : Lebanon</p>
        <p>Date of birth : 2005-10-13</p>
        <p>Email: Austyn.Mueller@bryana.biz</p>
        <p>Created at: 1992-11-29T05</p>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button danger type="primary">
            Modify
          </Button>
          <Button danger type="primary">
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
}
