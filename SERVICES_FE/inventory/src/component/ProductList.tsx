import React, { useState } from "react";
import ActiveDataGrid from "./ActiveDataGrid";
import { loadProductList } from "../Api";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { GridColDef } from "@mui/x-data-grid";
import { DEFAULT_LIST_PAYLOAD } from "./DataGridHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

export default function ProductList() {
  const [subCategoryList, setSubCategoryList] = useState([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "PRODUCT", width: 180 },
    {
      field: "subCategory",
      headerName: "SUB-CATEGORY",
      width: 180,
      valueGetter: (value: any) => {
        return `${value.name || ""} (${value.id || ""})`;
      },
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "",
      headerName: "CATEGORY",
      width: 180,
      valueGetter: (value: any, row: any) => {
        return `${row.subCategory.category.name || ""} (${
          row.subCategory.category.id || ""
        })`;
      },
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "isDeleted",
      headerName: "IS DELETED",
      width: 60,
      type: "boolean",
    },
  ];

  const loadDataHandle = (payload: any = DEFAULT_LIST_PAYLOAD) => {
    console.log("__Product . loadDataHandle  : " + payload);
    loadProductList(payload)
      .then((data: any) => {
        console.table(data.list);
        setSubCategoryList(data.list);
      })
      .catch((error: any) => {
        console.log("__ERROR: Product List");
        console.log(error);
        if (axios.isAxiosError(error)) {
          console.log("STATUS CODE : " + error.status);
          console.log(error.response);
          if (error.status === 401) {
            toast.error("Please login.");
          }
        } else {
          toast.error("Product List Error");
        }
      });
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
          <div className="active-margin">
            <Autocomplete
              disablePortal
              options={top100Films}
              sx={{ width: 300 }}
              onChange={(event, value) => handleCategoryChange(value)}
              renderInput={(params) => (
                <TextField {...params} label="Sub-Category" />
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
      <ToastContainer />
    </>
  );
}
