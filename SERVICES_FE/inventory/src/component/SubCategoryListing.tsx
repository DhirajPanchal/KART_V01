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
import { SubCategory } from "../model/SubCategory";
import { ListResponse } from "../model/ListResponse";
import ApiHub from "../service/ApiHub";

export default function SubCategoryList() {
  const [listResponse, setListResponse] = useState<ListResponse<SubCategory>>(
    DEFAULT_LIST_RESPONSE
  );

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
    console.log("__Sub-Category . loadDataHandle  : " + payload);
    ApiHub.loadSubCategoryList(DEFAULT_LIST_PAYLOAD)
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
