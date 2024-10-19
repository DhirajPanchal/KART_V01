import { Category } from "./Category";
import { SubCategory } from "./SubCategory";

export interface Product {
  id: number;

  name: string;

  isDeleted: boolean;

  category: Category;

  subCategory: SubCategory;
}
