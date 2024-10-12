import React from "react";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridSortModel,
  GridToolbar,
} from "@mui/x-data-grid";

type ActiveDataGridProps = {
  columns: GridColDef[];
  data: any[];
  triggerDataLoad: (payload: any) => void;
};

let payload = {
  search: "",
  sort: {
    id: "asc",
  },
  includeDeleted: true,
};

export default function ActiveDataGrid({ ...props }: ActiveDataGridProps) {
  const loadDataHandle = () => {
    props.triggerDataLoad(payload);
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

  return (
    <div className="active-data-grid-wrapper">
      <DataGrid
        columns={props.columns}
        rows={props.data}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        slots={{
            toolbar: GridToolbar,
          }}
        density="compact"
        columnHeaderHeight={80}
        showColumnVerticalBorder={true}
        showCellVerticalBorder={true}
        sortingMode="server"
        onSortModelChange={(model) => handleSort(model)}
        filterMode="server"
        onFilterModelChange={(model) => handleFilter(model)}
        pageSizeOptions={[10, 25]}
        rowCount={10}
        paginationMode="server"
        onPaginationMetaChange={(model) => handlePagination(model)}
        onRowSelectionModelChange={(r) => console.log(r)}
      />

      {/* <div style={{ border: 1, margin: 12, padding: 12 }}>
        <button onClick={loadDataHandle}>LOAD</button>
      </div> */}
    </div>
  );
}
