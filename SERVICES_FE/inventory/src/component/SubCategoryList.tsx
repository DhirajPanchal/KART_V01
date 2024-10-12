import React, { useState } from "react";
import ActiveDataGrid from "./ActiveDataGrid";
import { loadSubCategoryList } from "../Api";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { GridColDef } from "@mui/x-data-grid";
import { DEFAULT_LIST_PAYLOAD } from "./DataGridHelper";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

export default function SubCategoryList() {
  const [subCategoryList, setSubCategoryList] = useState([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "name", headerName: "SUB-CATEGORY", width: 480 },
    {
      field: "category",
      headerName: "CATEGORY",
      width: 480,
      valueGetter: (value: any) => {
        return `${value.name || ""} (${value.id || ""})`;
      },
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "isDeleted",
      headerName: "IS DELETED",
      width: 120,
      type: "boolean",
    },
  ];

  const loadDataHandle = (payload: any = DEFAULT_LIST_PAYLOAD) => {
    console.log("__SubCategory . loadDataHandle  : " + payload);
    loadSubCategoryList(payload)
      .then((data: any) => {
        console.table(data.list);
        setSubCategoryList(data.list);
      })
      .catch((error: any) => console.log(error));
  };

  const handleCategoryChange = (value: any) => {
    console.log("__handleCategoryChange");
    console.log(value);
  };

  return (
    <>
      <div className="active-data-grid-container">
        <div className="arrange-horizontally">
          <div className="active-margin">
            <Autocomplete
              disablePortal
              options={top100Films}
              sx={{ width: 300 }}
              onChange={(event, value) => handleCategoryChange(value)}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />
          </div>
        </div>
        <div className="active-margin">
          <ActiveDataGrid
            columns={columns}
            data={subCategoryList}
            triggerDataLoad={(payload) => loadDataHandle(payload)}
          />
        </div>
      </div>

      <button onClick={() => loadDataHandle()}>LOAD</button>
    </>
  );
}
