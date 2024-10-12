import React, { useState } from "react";
import ActiveDataGrid from "./ActiveDataGrid";
import { loadCategoryList } from "../Api";
import { GridColDef } from "@mui/x-data-grid";
import { DEFAULT_LIST_PAYLOAD } from "./DataGridHelper";



export default function CategoryList() {
  const [subCategoryList, setSubCategoryList] = useState([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "name", headerName: "CATEGORY", width: 480 },
    {
      field: "isDeleted",
      headerName: "IS DELETED",
      width: 120,
      type: "boolean",
    },
  ];

  const loadDataHandle = (payload: any = DEFAULT_LIST_PAYLOAD) => {
    console.log("__Category . loadDataHandle  : " + payload);
    loadCategoryList(payload)
      .then((data: any) => {
        console.table(data.list);
        setSubCategoryList(data.list);
      })
      .catch((error: any) => console.log(error));
  };



  return (
    <>
      <div className="active-data-grid-container">
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
