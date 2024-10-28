import {
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { ENTITY_CONFIG } from "../config/config";
import { ActiveEntity, entityMapToFormList } from "../config/ConfigMetadata";
import { defaultCategory } from "../model/Category";
import { useNavigate } from "react-router-dom";

type EntityNewOrEditProps = {
  mode: "NEW" | "EDIT";
  entityType: string;
  entityId: number;
  getApiMethod?: any;
  postApiMethod?: any;
};

function EntityNewOrEdit({
  mode,
  entityType,
  entityId,
  getApiMethod,
  postApiMethod,
}: EntityNewOrEditProps) {
  console.log(`< EntityNewOrEdit > ${mode}***`);
  const navigation = useNavigate();
  const [entity, setEntity] = useState<any>(undefined);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("__handleSubmit");
    console.log(entity);
    if (mode === "NEW") {
      if (postApiMethod) {
        postApiMethod(entity)
          .then((data: any) => {
            console.log("---");
            console.log(data);
            if (data && data.id) {
              console.log("NAV " + data.id);
              navigation(`../${data.id}`);
            }
          })
          .catch(() => {});
      }
    } else if (mode === "EDIT") {
    }
  };

  const updateValue = (key: string, value: any) => {
    console.log(`-------------------------------${key} :: ${value}`);
    let input = { ...entity };
    // console.log(input);
    input[key] = value;
    // console.log(input);
    setEntity(input);
  };

  useEffect(() => {
    console.log(`< EntityNewOrEdit > EFFECT : ${entityType} - ${entityId}`);
    if (mode === "NEW") {
      setEntity(defaultCategory());
    } else if (mode === "EDIT") {
      if (!isNaN(entityId) && entityId > 0) {
        if (getApiMethod) {
          getApiMethod(entityId)
            .then((data: any) => {
              setEntity(data);
            })
            .catch(() => {
              setEntity(null);
            });
        }
      }
    }
  }, [entityType, entityId]);

  function drawForm(): ReactNode[] {
    console.log(
      `< EntityNewOrEdit > DRAW : ${entityType} - ${entityId} `,
      entity
    );
    const controls: ReactNode[] = [];
    if (entity && ENTITY_CONFIG.has(entityType)) {
      const config: ActiveEntity | undefined = ENTITY_CONFIG.get(entityType);
      if (config && config.fields) {
        console.log(config);
        console.log(config.fields.get("name"));
        const formList: ActiveEntity[] = entityMapToFormList(
          config.fields.getInternalMap()
        );

        if (formList) {
          formList.map((formItem: ActiveEntity) => {
            if (mode === "EDIT" && formItem.mode === "generated") {
              controls.push(genGeneratedField(formItem));
            } else if (formItem.type === "string") {
              controls.push(genTextField(formItem));
            } else if (formItem.type === "boolean") {
              controls.push(genBooleanField(formItem));
            }
          });
        }
      }
    }
    console.log(" CONTROLS : " + controls.length);
    return controls;
  }

  function genTextField(formItem: ActiveEntity): ReactNode {
    return (
      <FormControl key={formItem.key}>
        <TextField
          type="text"
          name={entity[formItem.key]}
          label={formItem.label}
          value={entity[formItem.key]}
          onChange={(e) => updateValue(formItem.key, e.target.value)}
          sx={{ width: "80%" }}
          required
        />
      </FormControl>
    );
  }

  function genBooleanField(formItem: ActiveEntity): ReactNode {
    return (
      <FormControlLabel
        control={<Switch />}
        label={formItem.label}
        checked={entity[formItem.key]}
        key={formItem.key}
        onChange={(event, checked) => {
          updateValue(formItem.key, checked);
        }}
      />
    );
  }

  function genGeneratedField(formItem: ActiveEntity): ReactNode {
    return (
      <FormControl key={formItem.key}>
        <TextField
          type="text"
          variant="filled"
          size="small"
          label={formItem.label}
          value={entity[formItem.key]}
          disabled
          sx={{ width: "20%" }}
        />
      </FormControl>
    );
  }

  return (
    <div className="entity-new">
      {/* <button onClick={navi}> NAV </button> */}
      <div className="entity-view-type">
        <Chip
          label={entityType ? entityType.toUpperCase() : ""}
          variant="outlined"
          sx={{ backgroundColor: "#E0F7FA" }}
        />
        {/* <span className="entity-view-name">{entity?.name}</span> */}

        <form onSubmit={handleSubmit} className="active-g-form">
          {drawForm().map((field) => field)}
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            sx={{ width: "50%" }}
          >
            {mode === "NEW" ? "CREATE" : "SAVE"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EntityNewOrEdit;
