export interface Category {
  id: number;

  name: string;

  active: boolean;

  deleted: boolean;

  createdOn: String;

  updatedOn: String;
}

export interface CategoryLabel {
  id: number;

  name: string;
}
