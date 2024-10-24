export interface Category {
  id: number;

  name: string;

  active: boolean;

  isDeleted: boolean;

  createOn: String;

  updatedOn: String;
}

export interface CategoryLabel {
  id: number;

  name: string;
}
