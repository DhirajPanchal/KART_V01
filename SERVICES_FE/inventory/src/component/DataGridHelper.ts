import { getGridStringOperators, GridColDef } from "@mui/x-data-grid";
import { ListResponse } from "../model/ListResponse";

export type SortObject = { [key: string]: string };

export interface ListPayload {
  search: string;
  sort?: SortObject;
  includeDeleted: boolean;
  ui_only: {
    index: number;
    size: number;
    categoryId?: number;
    subCategoryId?: number;
  };
}

export const DEFAULT_LIST_PAYLOAD: ListPayload = {
  search: "",
  sort: { id: "asc" },
  includeDeleted: false,
  ui_only: {
    index: 0,
    size: 10,
    categoryId: 0,
    subCategoryId: 0,
  },
};

export const DEFAULT_LIST_RESPONSE: ListResponse<any> = {
  list: [],
  index: 0,
  size: 10,
  totalElements: 0,
  totalPages: 0,
  lastPage: true,
};

export const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

const stringOperators = getGridStringOperators().filter((op) =>
  ["contains"].includes(op.value)
);

export const CATEGORY_COLUMNS: GridColDef[] = [
  { field: "id", headerName: "ID", width: 60, filterable: false },
  {
    field: "name",
    headerName: "Category Name",
    width: 240,
    filterOperators: stringOperators,
  },
  {
    field: "isDeleted",
    headerName: "Is Deleted",
    width: 100,
    type: "boolean",
    filterable: false,
  },
];

export const SUB_CATEGORY_COLUMNS: GridColDef[] = [
  { field: "id", headerName: "ID", width: 60, filterable: false },
  {
    field: "name",
    headerName: "Sub-Category Name",
    width: 240,
    filterOperators: stringOperators,
  },
  {
    field: "",
    headerName: "CATEGORY",
    width: 120,
    valueGetter: (value: any, row: any) => {
      return `${row.category.name || ""} ( ${row.category.id || ""} )`;
    },
    disableColumnMenu: true,
    sortable: false,
    filterable: false,
  },

  {
    field: "isDeleted",
    headerName: "Is Deleted",
    width: 100,
    type: "boolean",
    filterable: false,
  },
];

export const PRODUCT_COLUMNS: GridColDef[] = [
  { field: "id", headerName: "ID", width: 60, filterable: false },
  {
    field: "name",
    headerName: "Product Name",
    width: 240,
    filterOperators: stringOperators,
  },

  {
    field: "",
    headerName: "CATEGORY",
    width: 120,
    valueGetter: (value: any, row: any) => {
      return `${row.subCategory.category.name || ""} ( ${
        row.subCategory.category.id || ""
      } )`;
    },
    disableColumnMenu: true,
    sortable: false,
    filterable: false,
  },

  {
    field: "subCategory",
    headerName: "SUB-CATEGORY",
    width: 140,
    valueGetter: (value: any) => {
      return `${value.name || ""} ( ${value.id || ""} )`;
    },
    disableColumnMenu: true,
    sortable: false,
    filterable: false,
  },
  {
    field: "isDeleted",
    headerName: "Is Deleted",
    width: 100,
    type: "boolean",
    filterable: false,
  },
];

export const DEFAULT_LABEL_LIST_PAYLOAD: ListPayload = {
  search: "",
  sort: { id: "asc" },
  includeDeleted: false,
  ui_only: {
    index: 0,
    size: 10,
    categoryId: 0,
  },
};
