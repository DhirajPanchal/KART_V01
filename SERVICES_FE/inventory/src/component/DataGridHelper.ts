import { GridColDef } from "@mui/x-data-grid";
import { ListResponse } from "../model/ListResponse";

export type SortObject = {[key: string] : string}

export interface ListPayload {
  search: string;
  sort: SortObject;
  includeDeleted: boolean;
  index: number;
  size: number;
}

export const DEFAULT_LIST_PAYLOAD: ListPayload = {
  search: "",
  sort: { name: "asc" },
  includeDeleted: false,
  index: 0,
  size: 10,
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

export const CATEGORY_COLUMNS: GridColDef[] = [
  { field: "id", headerName: "ID", width: 60 },
  { field: "name", headerName: "CATEGORY", width: 480 },
  {
    field: "isDeleted",
    headerName: "IS DELETED",
    width: 120,
    type: "boolean",
  },
];
