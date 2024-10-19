import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ApiHub from "../service/ApiHub";
import { useParams } from "react-router-dom";
import { Chip } from "@mui/material";

type EntityViewProps = {
  entityType: string;
};

export default function EntityView({ entityType = "" }: EntityViewProps) {
  console.log(`[EntityView]*** : ${entityType} `);

  let params = useParams();

  const [entity, setEntity] = useState<any>();

  useEffect(() => {
    console.log(`[EntityView] - useEffect() : ${entityType}`);
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
    console.log(`[EntityView] - fieldGenerator() : ${entityType}`);
    let fieldList: { label: string; value: string }[] = [];
    if (entity) {
      for (const [key, value] of Object.entries(entity)) {
        //console.log(`${key}: ${value}`);
        let strKey = key ? key.toUpperCase() + ":" : "";
        let strValue = value !== undefined ? "" + value : "";
        //console.log(`${strKey}: ${strValue} ***`);
        fieldList.push({ label: strKey, value: strValue });
      }
    }
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
            <tr>
              <td>{field.label}</td>
              <th>{field.value}</th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>Last updated on 21/09/2024 22:30 by Dhiraj Panchal</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

