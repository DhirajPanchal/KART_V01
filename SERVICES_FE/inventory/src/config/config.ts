import { ActiveEntity, ActiveMap, entityListToMap } from "./ConfigMetadata";

const categoryConfig: ActiveEntity = {
  key: "category",
  type: "category",
  label: "Category",
  fields: entityListToMap([
    {
      key: "id",
      type: "number",
      label: "ID",
      optional: true,
      mode: "generated",
    },
    {
      key: "name",
      type: "string",
      label: "Category Name",
      optional: false,
      mode: "write",
    },
    {
      key: "active",
      type: "boolean",
      label: "Active",
      optional: false,
      mode: "write",
    },
    {
      key: "createdOn",
      type: "date",
      label: "Created On",
      optional: true,
      mode: "ready",
    },
    {
      key: "updatedOn",
      type: "date",
      label: "Updated On",
      optional: true,
      mode: "ready",
    },
  ]),
};

const subCategoryConfig: ActiveEntity = {
  key: "subCategory",
  type: "subCategory",
  label: "Sub-Category",
  fields: entityListToMap([
    {
      key: "id",
      type: "number",
      label: "ID",
      optional: true,
      mode: "generated",
    },
    {
      key: "name",
      type: "string",
      label: "Sub-Category Name",
      optional: false,
      mode: "write",
    },
    {
      key: "active",
      type: "boolean",
      label: "Active",
      optional: false,
      mode: "write",
    },
    {
      key: "createdOn",
      type: "date",
      label: "Created On",
      optional: true,
    },
    {
      key: "updatedOn",
      type: "date",
      label: "Updated On",
      optional: true,
    },
    {
      key: "category",
      type: "category",
      label: "Category",
      optional: false,
      mode: "write",
    },
  ]),
};

const productConfig: ActiveEntity = {
  key: "product",
  type: "product",
  label: "Product",
  fields: entityListToMap([
    {
      key: "id",
      type: "number",
      label: "ID",
      optional: true,
      mode: "generated",
    },
    {
      key: "name",
      type: "string",
      label: "Product Name",
      optional: false,
      mode: "write",
    },
    {
      key: "active",
      type: "boolean",
      label: "Active",
      optional: false,
      mode: "write",
    },
    {
      key: "createdOn",
      type: "date",
      label: "Created On",
      optional: true,
    },
    {
      key: "updatedOn",
      type: "date",
      label: "Updated On",
      optional: true,
    },
    {
      key: "subCategory",
      type: "subCategory",
      label: "Sub-Category",
      optional: false,
      mode: "write",
    },
  ]),
};

export const ENTITY_CONFIG: ActiveMap<ActiveEntity> = new ActiveMap();
ENTITY_CONFIG.add("category", categoryConfig);
ENTITY_CONFIG.add("subCategory", subCategoryConfig);
ENTITY_CONFIG.add("product", productConfig);
