import { Category } from "./Category";

export interface SubCategory {
  id: number;

  name: string;

  active: boolean;

  isDeleted: boolean;

  createOn: String;

  updatedOn: String;

  category: Category;
}

export interface SubCategoryLabel {
  id: number;

  name: string;
}
