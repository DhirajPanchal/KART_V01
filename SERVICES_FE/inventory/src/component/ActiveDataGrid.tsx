import React from "react";
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridFilterModel,
  GridRowSelectionModel,
  GridSortModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { ListResponse } from "../model/ListResponse";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DEFAULT_LIST_PAYLOAD } from "./DataGridHelper";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
type ActiveDataGridProps = {
  columns: GridColDef[];
  provider: ListResponse<any>;
  triggerDataLoad?: (payload: any) => void;
  onRowSelection?: (entityId: number) => void | undefined;
};

export default function ActiveDataGrid({
  provider,
  ...props
}: ActiveDataGridProps) {
  const loadDataHandle = () => {
    if (props.triggerDataLoad) {
      props.triggerDataLoad(DEFAULT_LIST_PAYLOAD);
    }
  };

  function handleFilter(model: GridFilterModel) {
    console.log(
      "FILTER :: " +
        model.items[0].field +
        " ( " +
        model.items[0].operator +
        " ) : " +
        model.items[0].value
    );
  }

  function handleSort(model: GridSortModel) {
    console.table("SORT :: " + model[0].field + " ( " + model[0].sort + " )");
  }

  function handlePagination(model: any) {
    console.log(model);
  }

  const handleIncludeDeleted = (checked: boolean) => {
    console.log("__handleIncludeDeleted ( " + checked + " )");
  };
  const handleRowClick = (
    model: GridRowSelectionModel,
    details: GridCallbackDetails
  ) => {
    const id = (model[0] as number) - 1;
    const entityId = provider.list[id]["id"];
    // console.log("__handleRowClick : " + entityId);
    if (props.onRowSelection) props.onRowSelection(entityId);
  };

  return (
    <>
      <div className="active-data-grid-main">
        <DataGrid
          columns={props.columns}
          rows={provider.list}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          slots={{
              toolbar: GridToolbar,
            }}
          // density="compact"
          columnHeaderHeight={80}
          showColumnVerticalBorder={true}
          showCellVerticalBorder={false}
          sortingMode="server"
          onSortModelChange={(model) => handleSort(model)}
          filterMode="server"
          onFilterModelChange={(model) => handleFilter(model)}
          pageSizeOptions={[10, 25]}
          rowCount={10}
          paginationMode="server"
          onPaginationMetaChange={(model) => handlePagination(model)}
          rowSelection
          onRowSelectionModelChange={(model, details) =>
            handleRowClick(model, details)
          }
        />
      </div>
      <div className="active-data-grid-footer">
        <FormControlLabel
          value="end"
          control={
            <Checkbox
              sx={{
                color: "#006064",
                "&.Mui-checked": {
                  color: "#006064",
                },
              }}
            ></Checkbox>
          }
          label="Include deleted"
          onChange={(event, checked) => handleIncludeDeleted(checked)}
        />
      </div>
    </>
  );
}
