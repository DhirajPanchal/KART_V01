import { Category } from "./Category";

export interface SubCategory {
  id: number;

  name: string;

  isDeleted: boolean;

  category: Category;
}
