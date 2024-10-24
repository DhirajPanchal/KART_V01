import { Category } from "./Category";
import { SubCategory } from "./SubCategory";

export interface Product {
  id: number;

  name: string;

  active: boolean;

  isDeleted: boolean;

  createOn: String;

  updatedOn: String;

  category: Category;

  subCategory: SubCategory;

}
