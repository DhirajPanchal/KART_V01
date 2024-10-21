import React, { ChangeEvent, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Fab from "@mui/material/Fab";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRowSelectionModel,
  GridSortModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { ListResponse } from "../model/ListResponse";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  DEFAULT_LIST_PAYLOAD,
  ListPayload,
  SortObject,
} from "./DataGridHelper";

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
  console.log("<ActiveDataGrid>");

  const [payload, setPayload] = useState<ListPayload>(DEFAULT_LIST_PAYLOAD);

  const triggerDataRefresh = (localPayload: ListPayload) => {
    console.log("=====================================");
    console.log(payload);
    console.log(localPayload);

    if (props.triggerDataLoad) {
      props.triggerDataLoad(localPayload);
    }
    setPayload(localPayload);
  };

  function handleFilter(model: GridFilterModel) {
    if (model && model.items[0] && model.items[0].value) {
      console.log(
        "FILTER :: " +
          model.items[0].field +
          " ( " +
          model.items[0].operator +
          " ) : " +
          model.items[0].value
      );

      const localPayload: ListPayload = {
        ...payload,
        search: model.items[0].value,
      };
      triggerDataRefresh(localPayload);
    }
  }

  function handleSort(model: GridSortModel) {
    console.log("handleSort");
    console.log(model);
    console.log(model[0]);
    if (model && model[0]) {
      console.table("SORT :: " + model[0].field + " ( " + model[0].sort + " )");
      const sortfield = "" + model[0].field;
      const sortOrder = "" + model[0].sort;

      const sortObj: SortObject = { [sortfield]: sortOrder };

      const localPayload: ListPayload = {
        ...payload,
        sort: sortObj,
      };
      triggerDataRefresh(localPayload);
    }
  }

  function handleModelPagination(model: any) {
    console.log("__handleModelPagination ");
    console.log(model);

    const localPayload: ListPayload = {
      ...payload,
      index: model.page,
      size: model.pageSize,
    };
    triggerDataRefresh(localPayload);
  }

  const handleIncludeDeleted = (checked: boolean) => {
    console.log("__handleIncludeDeleted ( " + checked + " )");
    const localPayload: ListPayload = {
      ...payload,
      includeDeleted: checked,
    };
    triggerDataRefresh(localPayload);
  };

  const handleClear = () => {
    console.log("__handleClear");
    const localPayload: ListPayload = { ...payload, ...DEFAULT_LIST_PAYLOAD };
    triggerDataRefresh(localPayload);
  };

  const handleRowClick = (model: GridRowSelectionModel) => {
    console.log("-------------------------------------");
    if (model && model[0]) {
      if (props.onRowSelection) props.onRowSelection(+model[0]);
    }
  };

  return (
    <>
      <div className="active-data-grid-main">
        <DataGrid
          columns={props.columns}
          rows={provider.list}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          // slots={{
          //   toolbar: GridToolbar,
          // }}
          density="compact"
          columnHeaderHeight={80}
          showColumnVerticalBorder={true}
          showCellVerticalBorder={false}
          sortingMode="server"
          onSortModelChange={(model) => handleSort(model)}
          filterMode="server"
          onFilterModelChange={(model) => handleFilter(model)}
          rowCount={provider.totalElements}
          pagination={true}
          paginationModel={{ page: payload.index, pageSize: payload.size }}
          pageSizeOptions={[10, 20, 50]}
          paginationMode="server"
          onPaginationModelChange={(model) => handleModelPagination(model)}
          rowSelection
          onRowSelectionModelChange={(model) => handleRowClick(model)}
        />
      </div>
      <div className="active-data-grid-footer">
        <FormControlLabel
          value="end"
          control={
            <Checkbox
              checked={payload.includeDeleted}
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

        <Fab
          color="default"
          variant="extended"
          aria-label="clear"
          onClick={handleClear}
          size="small"
        >
          <ClearIcon />
          Clear
        </Fab>
      </div>
    </>
  );
}
