import React, { useEffect, useState } from "react";
import ActiveDataGrid from "../component/ActiveDataGrid";
import {
  DEFAULT_LIST_PAYLOAD,
  DEFAULT_LIST_RESPONSE,
} from "../component/DataGridHelper";
import { Category } from "../model/Category";
import { ListResponse } from "../model/ListResponse";
import ApiHub from "../service/ApiHub";
import {
  getGridNumericOperators,
  getGridStringOperators,
  GridColDef,
} from "@mui/x-data-grid";

const stringOperators = getGridStringOperators().filter((op) =>
  ["contains"].includes(op.value)
);

const CATEGORY_COLUMNS: GridColDef[] = [
  { field: "id", headerName: "ID", width: 60, filterable: false },
  {
    field: "name",
    headerName: "CATEGORY",
    width: 360,
    filterOperators: stringOperators,
  },
  {
    field: "isDeleted",
    headerName: "IS DELETED",
    width: 120,
    type: "boolean",
    filterable: false,
  },
];

type EntityDataGridProp = {
  onRowSelection: (entityId: number) => void;
};

export default function CategoryDataGrid({
  onRowSelection,
}: EntityDataGridProp) {
  console.log("[EntityDataGrid]");
  const [listResponse, setListResponse] = useState<ListResponse<Category>>(
    DEFAULT_LIST_RESPONSE
  );

  useEffect(() => {
    console.log("[EntityDataGrid] EFFECT");
    handleDataLoadTrigger();
  }, []);

  const handleDataLoadTrigger = (payload: any = DEFAULT_LIST_PAYLOAD) => {
    console.log("[EntityDataGrid] LOAD  *  *  *  *  *  *  *  *  *  *  ");
    console.log(payload);
    ApiHub.loadCategoryList(payload)
      .then((data) => {
        setListResponse(data);
      })
      .catch(() => {});
  };

  const handleRowSelection = (entityId: number) => {
    console.log("[EntityDataGrid] RowSelection : " + entityId);
    onRowSelection(entityId);
  };

  return (
    <ActiveDataGrid
      columns={CATEGORY_COLUMNS}
      provider={listResponse}
      onRowSelection={(entityId) => handleRowSelection(entityId)}
      triggerDataLoad={(payload) => handleDataLoadTrigger(payload)}
    />
  );
}
