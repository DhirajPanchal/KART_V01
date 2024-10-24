import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Checkbox, Chip, FormControlLabel } from "@mui/material";
import schemaMap, { SchemaField } from "./Schema";

type RenderItem = {
  label: string;
  value: string;
  key?: string;
  depth?: number;
  type?: any;
  typeLabel?: string;
  renderer?: string;
};

type EntityViewProps = {
  entityType?: string;
  apiMethod?: any;
};

export default function EntityView({
  entityType = "category",
  apiMethod,
}: EntityViewProps) {
  let params = useParams();

  const [entity, setEntity] = useState<any>();

  console.log(`[EntityView]*** : ${entityType} `, entity);

  useEffect(() => {
    console.log(`*** [EntityView] - useEffect() : ${params.id}`);
    let entityId = params.id ? +params.id : 0;
    if (!isNaN(entityId) && entityId > 0) {
      //ApiHub.loadCategoryById(entityId)
      if (apiMethod) {
        apiMethod(entityId)
          .then((data: any) => {
            setEntity(data);
          })
          .catch(() => {
            setEntity(null);
          });
      }
    }
  }, [params.id]);

  const fieldGenerator = (): any[] => {
    console.log(`[EntityView] - fieldGenerator() : ${entityType}`);
    let fieldList: RenderItem[] = [];
    fieldList = entityFieldMining(entity, entityType, fieldList);
    console.log(` FIELDS : ${fieldList.length}`);
    return fieldList;
  };

  const entityFieldMining = (
    node: any,
    nodeType: string,
    fieldList: RenderItem[],
    depth: number = 0
  ) => {
    console.log("-------------------------------------- " + depth);

    if (node) {
      let config: Map<string, SchemaField> | undefined;
      if (schemaMap && schemaMap.has(nodeType)) {
        config = schemaMap.get(nodeType)?.fields;

        console.log(config);

        for (const [key, value] of Object.entries(node)) {
          console.log(`    (F) ${key} : ${value}`);
          let strKey = key ? key + "" : "";
          console.log("         * :", config?.has(strKey));
          if (config?.has(strKey)) {
            console.log("         K : ", config?.get(strKey));
            console.log("         L : ", config?.get(strKey)?.label);
            const type: any = config?.get(strKey)?.type;
            console.log("         T : ", type);
            console.log("        VT : ", typeof value);

            let strLabel: any = config?.get(strKey)?.label;
            if (strLabel === undefined || strLabel === "") {
              strLabel = strKey;
            }

            if (
              type === "string" ||
              type === "number" ||
              type === "boolean" ||
              type === "" ||
              type === undefined
            ) {
              let strValue =
                value === undefined || value === null ? "" : value + "";

              console.log("               > " + strLabel + " : " + strValue);
              fieldList.push({
                label: strLabel,
                value: strValue,
                key: strLabel + depth,
                depth,
                type: type,
              });
            } else {
              console.log(type, ", Type Found :", schemaMap.has(type));

              if (schemaMap.has(type)) {
                const typeLabel = schemaMap.get(type)?.entityLabel
                  ? schemaMap.get(type)?.entityLabel
                  : type;
                fieldList.push({
                  label: strLabel,
                  value: "",
                  key: strLabel + depth,
                  depth,
                  type: type,
                  typeLabel: typeLabel,
                  renderer: "clip",
                });

                entityFieldMining(value, type, fieldList, ++depth);
              }
            }
          }
        }
      }
    }
    return fieldList;
  };

  const entityName = () => {
    if (entity && entity["name"]) {
      return entity["name"];
    }
    return "";
  };

  const labelDepthLeveler = (depth: number): any => {
    return Array.from({ length: depth }, (_, i) => (
      <div key={i} className="entity-field-space" />
    ));
  };

  const valueRenderer = (item: RenderItem): any => {
    if (item.renderer !== undefined) {
      if (item.renderer === "clip") {
        const typeLabel = item.typeLabel ? item.typeLabel : item.type;
        return (
          <Chip
            label={typeLabel.toUpperCase()}
            variant="outlined"
            sx={{
              height: "24px",
              alignContent: "center",
              backgroundColor: "#e7d6e1",
            }}
          />
        );
      }
    }
    return item.value;
  };

  const genLabel = (item: RenderItem): any => {
    if (item) {
      console.log(" ITEM ", item);
      if (item.depth !== undefined && !isNaN(item.depth)) {
        return (
          <div className="entity-field">
            {labelDepthLeveler(item.depth)}
            {item.label}
          </div>
        );
      }

      return <i>{item.label}</i>;
    }

    return "";
  };

  return (
    <div className="entity-view">
      <div className="entity-view-header">
        <Chip
          label={entityType ? entityType.toUpperCase() : ""}
          variant="outlined"
          sx={{ backgroundColor: "#E0F7FA" }}
        />
        <span className="entity-view-name">{entityName()}</span>
        <div className="entity-view-cb">
          <FormControlLabel
            value="end"
            control={
              <Checkbox
                checked={true}
                sx={{
                  color: "#006064",
                  "&.Mui-checked": {
                    color: "#006064",
                  },
                }}
              ></Checkbox>
            }
            label="Show more"
            // onChange={(event, checked) => handleIncludeDeleted(checked)}
          />
        </div>
      </div>
      <div className="entity-table-wrapper">
        <table>
          <tbody>
            {fieldGenerator().map((field) => (
              <tr key={field.key}>
                {/* <td>{field.label}</td> */}
                <td>{genLabel(field)}</td>
                <th>{valueRenderer(field)}</th>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Footer</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
