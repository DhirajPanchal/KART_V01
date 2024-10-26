export interface Category {
  id: number;

  name: string;

  active: boolean;

  isDeleted: boolean;

  createdOn: String;

  updatedOn: String;
}

export interface CategoryLabel {
  id: number;

  name: string;
}
