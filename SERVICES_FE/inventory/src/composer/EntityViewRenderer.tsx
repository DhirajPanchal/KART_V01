import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ENTITY_CONFIG } from "../config/config";
import { Chip, FormControlLabel, Checkbox, Switch } from "@mui/material";

type EntityViewRendererProps = {
  entityType?: string;
  apiMethod?: any;
};

type RowRenderer = {
  key: string;
  label: string;
  value: any;
  depth?: number;
  valueRenderer?: string;
};

function EntityViewRenderer({
  entityType = "",
  apiMethod,
}: EntityViewRendererProps) {
  let params = useParams();

  const [entity, setEntity] = useState<any>();

  const [showMore, setShowMore] = useState<boolean>(true);

  console.log(`<EVR> : ${entityType} `, entity);
  // console.log("[SCHEMA]", ENTITY_CONFIG);

  useEffect(() => {
    console.log(`<EVR> - LOAD : ${params.id}`);
    let entityId = params.id ? +params.id : 0;
    if (!isNaN(entityId) && entityId > 0) {
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

  const tableGenerator = (): RowRenderer[] => {
    console.log(`[EVR] - ViewGenerator() : ${entityType}`);
    let rowList: RowRenderer[] = [];
    rowList = entityMining(entity, entityType, rowList);
    console.log(` FIELDS : ${rowList.length}`);

    console.table(rowList);

    return rowList;
  };

  const entityMining = (
    node: any,
    nodeType: string,
    rowList: RowRenderer[],
    depth: number = 0
  ): RowRenderer[] => {
    console.log("-------------------------------------- " + depth);

    if (node && ENTITY_CONFIG.has(nodeType)) {
      const config = ENTITY_CONFIG.get(nodeType);

      for (const [key, value] of Object.entries(node)) {
        console.log(`(F) ${key} : ${value} ? ${config?.fields?.has(key)}`);
        if (config?.fields?.has(key)) {
          const fieldConfig = config?.fields?.get(key);
          // console.log(" _ ", fieldConfig);

          if (fieldConfig) {
            let fieldLabel = fieldConfig.label ? fieldConfig.label : "";
            let fieldValue = value;
            const isOptional = fieldConfig.optional
              ? fieldConfig.optional
              : false;
            // console.log(
            //   ` _ _ ${fieldLabel} : ${fieldValue} (optional ${isOptional} )`
            // );

            if (showMore || !isOptional) {
              if (ENTITY_CONFIG.has(fieldConfig.type)) {
                // console.log(" _ _ _ Managed : " + fieldConfig.type);

                rowList.push({
                  label: fieldLabel + (isOptional ? "*" : ""),
                  value: fieldConfig.type,
                  key: fieldLabel + "_" + depth,
                  depth: depth,
                  valueRenderer: "clip",
                });

                entityMining(fieldValue, fieldConfig.type, rowList, ++depth);
              } else {
                // console.log(" _ _ _ NOT Managed : " + fieldConfig.type);

                if (fieldConfig.type === "date") {
                  let strDate =
                    value === undefined || value === null ? "" : value + "";

                  fieldValue = strDate.split("T")[0];
                } else {
                  fieldValue =
                    value === undefined || value === null ? "" : value + "";
                }

                rowList.push({
                  label: fieldLabel + (isOptional ? "*" : ""),
                  value: fieldValue,
                  key: fieldLabel + "_" + depth,
                  depth: depth,
                });
              }
            }
          }
        }
      }
    }

    return rowList;
  };

  const labelDepthLeveler = (depth: number): any => {
    return Array.from({ length: depth }, (_, i) => (
      <div key={i} className="entity-field-space">
        -
      </div>
    ));
  };

  const valueRenderer = (item: RowRenderer): any => {
    if (item.valueRenderer) {
      if (item.valueRenderer === "clip") {
        const typeLabel = item.valueRenderer ? item.value : "";
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

  const genLabel = (item: RowRenderer): any => {
    if (item) {
      // console.log(" ITEM ", item);
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
        <span className="entity-view-name">{entity?.name}</span>

        <div className="entity-view-cb">
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Show all fields"
            onChange={(event, checked) => {
              setShowMore(checked);
            }}
          />
        </div>
      </div>
      <div className="entity-table-wrapper">
        <table>
          <tbody>
            {tableGenerator().map((field) => (
              <tr key={field.key}>
                {/* <td>{field.label}</td>
                <th>{field.value}</th> */}
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

export default EntityViewRenderer;
