import React, { useState } from "react";
import ActiveDataGrid from "./ActiveDataGrid";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { GridColDef } from "@mui/x-data-grid";
import {
  DEFAULT_LIST_PAYLOAD,
  DEFAULT_LIST_RESPONSE,
  top100Films,
} from "./DataGridHelper";
import { Product } from "../model/Product";
import { ListResponse } from "../model/ListResponse";
import ApiHub from "../service/ApiHub";

export default function ProductList() {
  const [listResponse, setListResponse] = useState<ListResponse<Product>>(
    DEFAULT_LIST_RESPONSE
  );

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
    console.log("__Sub-Category . loadDataHandle  : " + payload);
    ApiHub.loadProductList(DEFAULT_LIST_PAYLOAD)
      .then((data) => {
        setListResponse(data);
      })
      .catch(() => {});
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
            provider={listResponse}
            triggerDataLoad={(payload) => loadDataHandle(payload)}
          />
        </div>
      </div>

      <button onClick={() => loadDataHandle()}>LOAD</button>
    </>
  );
}
