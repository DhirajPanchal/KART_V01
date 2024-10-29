export interface Category {
  id?: number;

  name: string;

  active: boolean;

  createdOn?: String;

  updatedOn?: String;
}

export interface CategoryLabel {
  id: number;

  name: string;
}

export const defaultCategory = (): any => {
  return {
    name: "",
    active: true,
    // CAT: undefined,
    // SUB:undefined
  };
};
