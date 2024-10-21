import React, { useEffect, useState } from "react";
import ApiHub from "../service/ApiHub";
import { useParams } from "react-router-dom";
import { Chip } from "@mui/material";
import schemaMap, { SchemaField } from "./Schema";
type EntityViewProps = {
  entityType: string;
};

export default function EntityView({ entityType = "" }: EntityViewProps) {
  console.log(`[EntityView]*** : ${entityType} `);

  let params = useParams();

  const [entity, setEntity] = useState<any>();

  useEffect(() => {
    //console.log(`[EntityView] - useEffect() : ${params.id}`);
    let entityId = params.id ? +params.id : 0;
    if (!isNaN(entityId) && entityId > 0) {
      ApiHub.loadCategoryById(entityId)
        .then((data) => {
          setEntity(data);
        })
        .catch(() => {});
    }
  }, [params.id]);

  function fieldGenerator() {
    //console.log(`[EntityView] - fieldGenerator() : ${entityType}`);
    let fieldList: { label: string; value: string }[] = [];
    if (entity) {
      let fields: Map<string, SchemaField> | undefined;
      if (schemaMap && schemaMap.has(entityType)) {
        fields = schemaMap.get(entityType)?.fields;
        for (const [key, value] of Object.entries(entity)) {
          //console.log(`(F) ${key}: ${value}`);
          let strKey = key ? key + "" : "";
          let strValue =
            value === undefined || value === null ? "" : value + "";
          let strLabel: any = fields?.get(strKey)?.label;
          if (strLabel === undefined || strLabel === "") {
            strLabel = strKey;
          }
          fieldList.push({ label: strLabel, value: strValue });
        }
      }

      // for (const [key, value] of Object.entries(entity)) {
      //   //console.log(`(F) ${key}: ${value}`);
      //   let strKey = key ? key + ":" : "";
      //   let strValue = value !== undefined ? "" + value : "";
      //   fieldList.push({ label: strKey, value: strValue });
      // }
    }
    //console.log(` FIELDS : ${fieldList.length}`);
    return fieldList;
  }

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
    </div>
  );
}
