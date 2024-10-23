export interface Schema {
  entityType: string;
  fields: Map<string, SchemaField>;
}

export interface SchemaField {
  field: string;
  type: string;
  label: string;
  editable: boolean;
}

const categoryViewSchema: Schema = {
  entityType: "category",
  fields: new Map<string, SchemaField>([
    [
      "id",
      {
        field: "id",
        type: "number",
        label: "ID",
        editable: false,
      },
    ],
    [
      "name",
      {
        field: "name",
        type: "string",
        label: "Category Name",
        editable: true,
      },
    ],
    [
      "isDeleted",
      {
        field: "isDeleted",
        type: "boolean",
        label: "Non Active",
        editable: true,
      },
    ],
  ]),
};

const subCategoryViewSchema: Schema = {
  entityType: "category",
  fields: new Map<string, SchemaField>([
    [
      "id",
      {
        field: "id",
        type: "number",
        label: "ID",
        editable: false,
      },
    ],
    [
      "name",
      {
        field: "name",
        type: "string",
        label: "Sub-Category Name",
        editable: true,
      },
    ],
    [
      "isDeleted",
      {
        field: "isDeleted",
        type: "boolean",
        label: "Non Active",
        editable: true,
      },
    ],
  ]),
};

const productViewSchema: Schema = {
  entityType: "category",
  fields: new Map<string, SchemaField>([
    [
      "id",
      {
        field: "id",
        type: "number",
        label: "ID",
        editable: false,
      },
    ],
    [
      "name",
      {
        field: "name",
        type: "string",
        label: "Sub-Category Name",
        editable: true,
      },
    ],
    [
      "isDeleted",
      {
        field: "isDeleted",
        type: "boolean",
        label: "Non Active",
        editable: true,
      },
    ],
  ]),
};

const schemaMap = new Map<string, Schema>([
  ["category", categoryViewSchema],
  ["sub-category", subCategoryViewSchema],
  ["product", productViewSchema],
]);

export default schemaMap;
