export interface Schema {
  entityType: string;
  entityLabel?: string;
  fields: Map<string, SchemaField>;
}

export interface SchemaField {
  field: string;
  label: string;
  type?: string;
  editable?: boolean;
  entityLabel?: string;
}

const categoryViewSchema: Schema = {
  entityType: "Category",
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
      "active",
      {
        field: "active",
        type: "boolean",
        label: "Active",
        editable: true,
      },
    ],
    [
      "createOn",
      {
        field: "createOn",
        type: "string",
        label: "Created On",
        editable: false,
      },
    ],
    [
      "updatedOn",
      {
        field: "updatedOn",
        type: "string",
        label: "Updated On",
        editable: false,
      },
    ],
    [
      "isDeleted",
      {
        field: "isDeleted",
        type: "boolean",
        label: "Is Deleted",
        editable: true,
      },
    ],
  ]),
};

const subCategoryViewSchema: Schema = {
  entityType: "SubCategory",
  entityLabel: "Sub-Category",
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
      "active",
      {
        field: "active",
        type: "boolean",
        label: "Active",
        editable: true,
      },
    ],
    [
      "createOn",
      {
        field: "createOn",
        type: "string",
        label: "Created On",
        editable: false,
      },
    ],
    [
      "updatedOn",
      {
        field: "updatedOn",
        type: "string",
        label: "Updated On",
        editable: false,
      },
    ],
    [
      "isDeleted",
      {
        field: "isDeleted",
        type: "boolean",
        label: "Is Delete",
        editable: true,
      },
    ],
    [
      "category",
      {
        field: "category",
        type: "Category",
        label: "Category",
      },
    ],
  ]),
};

const productViewSchema: Schema = {
  entityType: "Product",
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
      "active",
      {
        field: "active",
        type: "boolean",
        label: "Active",
        editable: true,
      },
    ],
    [
      "createOn",
      {
        field: "createOn",
        type: "string",
        label: "Created On",
        editable: false,
      },
    ],
    [
      "updatedOn",
      {
        field: "updatedOn",
        type: "string",
        label: "Updated On",
        editable: false,
      },
    ],
    [
      "isDeleted",
      {
        field: "isDeleted",
        type: "boolean",
        label: "Is Deleted",
        editable: true,
      },
    ],
    [
      "subCategory",
      {
        field: "subCategory",
        type: "SubCategory",
        label: "Sub-Category",
      },
    ],
  ]),
};

const schemaMap = new Map<string, Schema>([
  ["Category", categoryViewSchema],
  ["SubCategory", subCategoryViewSchema],
  ["Product", productViewSchema],
]);

export default schemaMap;
