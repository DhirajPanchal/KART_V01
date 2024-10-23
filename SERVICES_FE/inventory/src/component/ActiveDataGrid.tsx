import { alpha, styled } from "@mui/material/styles";
import React, { ChangeEvent, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Fab from "@mui/material/Fab";
import {
  DataGrid,
  gridClasses,
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
  onClear?: ()=>void;
  categoryId?: number;
  subCategoryId?: number;
};

export default function ActiveDataGrid({
  provider,
  categoryId,
  subCategoryId,
  ...props
}: ActiveDataGridProps) {
  // console.log("  < ActiveDataGrid >");

  const ODD_OPACITY = 0.2;

  const [payload, setPayload] = useState<ListPayload>(DEFAULT_LIST_PAYLOAD);

  useEffect(() => {
    // console.log(">>>>>>>>>>>>>>>>>>> " + categoryId + " - " + subCategoryId);
    if (categoryId !== undefined || subCategoryId !== undefined) {
      const _categoryId = categoryId !== undefined ? categoryId : 0;
      const _subCategoryId = subCategoryId !== undefined ? subCategoryId : 0;
      console.log(">>>>> __Category OR SubCategory Change ");
      const localPayload: ListPayload = {
        ...payload,
        ui_only: {
          ...payload.ui_only,
          categoryId: _categoryId,
          subCategoryId: _subCategoryId,
        },
      };
      triggerDataRefresh(localPayload);
    }
  }, [categoryId, subCategoryId]);

  const triggerDataRefresh = (localPayload: ListPayload) => {
    // console.log(" < ActiveDataGrid > PAYLOAD ****************************");
    // console.log("      existing ::", payload);
    // console.log("      new      ::", localPayload);

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
      ui_only: { ...payload.ui_only, index: model.page, size: model.pageSize },
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
    if(props.onClear){
      props.onClear();
    }
  };

  const handleRowClick = (model: GridRowSelectionModel) => {
    // console.log("-------------------------------------");
    if (model && model[0]) {
      if (props.onRowSelection) props.onRowSelection(+model[0]);
    }
  };

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[200],
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
      "&.Mui-selected": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity
        ),
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity
          ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
          },
        },
      },
    },
  }));

  return (
    <>
      <div className="entity-active-data-grid">
        <StripedDataGrid
          columns={props.columns}
          rows={provider.list ? provider.list : []}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          // slots={{
          //   toolbar: GridToolbar,
          // }}
          density="compact"
          columnHeaderHeight={64}
          showColumnVerticalBorder={true}
          showCellVerticalBorder={false}
          sortingMode="server"
          onSortModelChange={(model) => handleSort(model)}
          filterMode="server"
          onFilterModelChange={(model) => handleFilter(model)}
          rowCount={provider.totalElements ? provider.totalElements : 0}
          pagination={true}
          paginationModel={{
            page: payload.ui_only.index,
            pageSize: payload.ui_only.size,
          }}
          pageSizeOptions={[10, 20, 50]}
          paginationMode="server"
          onPaginationModelChange={(model) => handleModelPagination(model)}
          rowSelection
          onRowSelectionModelChange={(model) => handleRowClick(model)}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
        />
      </div>
      <div className="entity-data-grid-footer">
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
