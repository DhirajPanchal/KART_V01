import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chip } from "@mui/material";
import schemaMap, { SchemaField } from "./Schema";
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
    let fieldList: { label: string; value: string }[] = [];
    if (entity) {
      let fields: Map<string, SchemaField> | undefined;
      if (schemaMap && schemaMap.has(entityType)) {
        fields = schemaMap.get(entityType)?.fields;

        for (const [key, value] of Object.entries(entity)) {
          console.log(`    (F) ${key}: ${value}`);
          let strKey = key ? key + "" : "";
          let strValue =
            value === undefined || value === null ? "" : value + "";
          let strLabel: any = fields?.get(strKey)?.label;
          if (strLabel === undefined || strLabel === "") {
            strLabel = strKey;
          }
          // console.log("            > " + strLabel + " : " + strValue);
          fieldList.push({ label: strLabel, value: strValue });
        }
      }

      // if (entity.category) {
      //   console.log("|-> ", entity.category);
      //   if (entity.category) {
      //     console.log("   |-> ", entity.category.name);
      //   }
      // }

      // for (const [key, value] of Object.entries(entity)) {
      //   //console.log(`(F) ${key}: ${value}`);
      //   let strKey = key ? key + ":" : "";
      //   let strValue = value !== undefined ? "" + value : "";
      //   fieldList.push({ label: strKey, value: strValue });
      // }
    }
    //console.log(` FIELDS : ${fieldList.length}`);
    return fieldList;
  };

  // const memoFieldGenerator = memo((a:any) => fieldGenerator());

  // function arePropsEqual(oldProps: any, newProps: any) {
  //   console.log("=======================================");
  //   console.log(oldProps);
  //   console.log(newProps);
  //   return false;
  // }

  const entityName = () => {
    if (entity && entity["name"]) {
      return entity["name"];
    }
    return "";
  };

  return (
    <div className="entity-view">
      <div className="entity-view-type">
        <Chip
          label={entityType ? entityType.toUpperCase() : ""}
          variant="outlined"
          sx={{ backgroundColor: "#E0F7FA" }}
        />
        <span className="entity-view-name">{entityName()}</span>
      </div>

      <table>
        <tbody>
          {fieldGenerator().map((field) => (
            <tr key={field.label}>
              <td>{field.label}</td>
              <th>{field.value}</th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              Last updated on 21/09/2024 22:30 by Dhiraj Panchal
            </td>
          </tr>
        </tfoot>
      </table>
      {/* <button onClick={() => memoFieldGenerator()}>Memo</button> */}
    </div>
  );
}

{
  /* {!entity && (
        <span className="entity-not-load">
          Error while loading {entityType}   ***
        </span>
      )}

      {entity && fieldGenerator().length === 0 && (
        <span className="entity-schema-error">
          No schema view found for entityType : {entityType} ***
        </span>
      )} */
}

{
  /* {entity && fieldGenerator().length > 0 && (
      )}         */
}
