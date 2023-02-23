import React, { useEffect, useState } from "react";
import "./Table.css";
import { MDBDataTable } from "mdbreact";
import { DataCaller, isAuthenticated, signout } from "../../apis/helper";
import { useNavigate } from "react-router-dom";

const DatatablePage = () => {
  const navigate = useNavigate();

  const { token } = isAuthenticated();

  const [record, setRecord] = useState([]);

  useEffect(() => {
    DataCaller(token)
      .then((data) => {
        setRecord(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(record);

  const data = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Date of Birth",
        field: "birthDate",
        sort: "asc",
        width: 270,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 200,
      },
      {
        label: "password",
        field: "encrypted_password",
        sort: "asc",
        width: 100,
      },
    ],
    rows: record,
  };

  return (
    <div className="main_Layout">
      <div className="head_text">
        <h2>Records</h2>
        <p
          onClick={() => {
            navigate("/");
            signout();
          }}
        >
          Logout
        </p>
      </div>
      <MDBDataTable striped bordered small data={data} />
    </div>
  );
};

export default DatatablePage;
