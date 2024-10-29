import { Category } from "./Category";

export interface SubCategory {
  id: number;

  name: string;

  active: boolean;

  createdOn: String;

  updatedOn: String;

  category: Category;
}

export interface SubCategoryLabel {
  id: number;

  name: string;
}
