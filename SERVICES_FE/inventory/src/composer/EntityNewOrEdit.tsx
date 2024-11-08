import {
  Autocomplete,
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
import { CategoryLabel, defaultCategory } from "../model/Category";
import { useNavigate } from "react-router-dom";
import { dropdownLabel } from "../component/EntityDropdown";
import { DEFAULT_LABEL_LIST_PAYLOAD } from "../component/DataGridHelper";
import { SubCategoryLabel } from "../model/SubCategory";

type EntityNewOrEditProps = {
  mode: "NEW" | "EDIT";
  entityType: string;
  entityId: number;
  entityGetApi?: any;
  entityCreateApi?: any;
  entityUpdateApi?: any;
  refreshDatagrid?: any;
  catSubListApi?: any;
};

function EntityNewOrEdit({
  mode,
  entityType,
  entityId,
  entityGetApi,
  entityCreateApi,
  entityUpdateApi,
  refreshDatagrid,
  catSubListApi,
}: EntityNewOrEditProps) {
  // console.log(`< EntityNewOrEdit > ${mode}***`);

  const navigation = useNavigate();

  const [entity, setEntity] = useState<any>(undefined);

  const [categories, setCategories] = useState<CategoryLabel[]>([]);

  const [subCategories, setSubCategories] = useState<SubCategoryLabel[]>([]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // console.log("__handleSubmit");
    // console.log(entity);
    // return;
    if (mode === "NEW") {
      if (entityCreateApi) {
        entityCreateApi(entity)
          .then((data: any) => {
            // console.log("---");
            // console.log(data);
            if (refreshDatagrid) {
              refreshDatagrid();
            }
            if (data && data.id) {
              // console.log("NAV " + data.id);
              navigation(`../${data.id}`);
            }
          })
          .catch(() => {});
      }
    } else if (mode === "EDIT") {
      if (entityUpdateApi) {
        entityUpdateApi(entity.id, entity)
          .then((data: any) => {
            // console.log("---");
            // console.log(data);
            if (refreshDatagrid) {
              refreshDatagrid();
            }
            if (data && data.id) {
              // console.log("NAV " + data.id);
              navigation(`../${data.id}`);
            }
          })
          .catch(() => {});
      }
    }
  };

  const updateValue = (key: string, value: any) => {
    // console.log(`-------------------------------${key} :: ${value}`);
    let input = { ...entity };
    // // console.log(input);
    input[key] = value;
    // // console.log(input);
    setEntity(input);
  };

  useEffect(() => {
    // console.log(`< EntityNewOrEdit > EFFECT : ${entityType} - ${entityId}`);
    if (mode === "NEW") {
      setEntity(defaultCategory());
    } else if (mode === "EDIT") {
      if (!isNaN(entityId) && entityId > 0) {
        if (entityGetApi) {
          entityGetApi(entityId)
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
    // console.log(
    //   `< EntityNewOrEdit > DRAW : ${entityType} - ${entityId} `,
    //   entity
    // );
    const controls: ReactNode[] = [];
    if (entity && ENTITY_CONFIG.has(entityType)) {
      const config: ActiveEntity | undefined = ENTITY_CONFIG.get(entityType);
      if (config && config.fields) {
        // console.log(config);
        // console.log(config.fields.get("name"));
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
            } else if (formItem.type === "category") {
              controls.push(genCategoryField(formItem));
            } else if (formItem.type === "subCategory") {
              controls.push(genSubCategoryField(formItem));
            }
          });
        }
      }
    }
    // console.log(" CONTROLS : " + controls.length);
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
  function genCategoryField(formItem: ActiveEntity): ReactNode {
    if (categories.length === 0) {
      loadCategories();
    }
    if (mode === "EDIT") {
      entity.ADD_KEY = entity[formItem.key]["id"];
    }

    return (
      <FormControl key={formItem.key}>
        <Autocomplete
          value={entity[formItem.key] || null}
          disablePortal
          options={categories ? categories : []}
          getOptionLabel={(obj) => dropdownLabel(obj)}
          sx={{ width: 240 }}
          onChange={(event, value) => handleCategoryChange(value)}
          renderInput={(params) => (
            <TextField {...params} label="Select Category" required />
          )}
        />
      </FormControl>
    );
  }

  function genSubCategoryField(formItem: ActiveEntity): ReactNode {
    if (subCategories.length === 0) {
      loadSubCategories();
    }
    if (mode === "EDIT") {
      entity.ADD_KEY = entity[formItem.key]["id"];
    }

    return (
      <FormControl key={formItem.key}>
        <Autocomplete
          value={entity[formItem.key] || null}
          disablePortal
          options={subCategories ? subCategories : []}
          getOptionLabel={(obj) => dropdownLabel(obj)}
          sx={{ width: 240 }}
          onChange={(event, value) => handleSubCategoryChange(value)}
          renderInput={(params) => (
            <TextField {...params} label="Select Sub-Category" required />
          )}
        />
      </FormControl>
    );
  }

  const loadCategories = (payload: any = DEFAULT_LABEL_LIST_PAYLOAD) => {
    // console.log("< CATEGORT DROP DOWN > API - LIST : ", payload);
    // // console.log(payload);
    if (catSubListApi) {
      catSubListApi(payload)
        .then((data: any) => {
          setCategories(data.list);
        })
        .catch(() => {});
    }
  };

  const loadSubCategories = (payload: any = DEFAULT_LABEL_LIST_PAYLOAD) => {
    // console.log("< SUB-CATEGORT DROP DOWN > API - LIST : ", payload);
    // // console.log(payload);
    if (catSubListApi) {
      catSubListApi(payload)
        .then((data: any) => {
          setSubCategories(data.list);
        })
        .catch(() => {});
    }
  };

  const handleCategoryChange = (value: any) => {
    // console.log("__handleCategoryChange");
    // console.log(value);
    if (value && value.id) {
      //updateValue("ADD_KEY", value.id);
      setEntity((pre: any) => {
        return { ...pre, category: value, ADD_KEY: value.id };
      });
    }
  };

  const handleSubCategoryChange = (value: any) => {
    // console.log("__handleSubCategoryChange");
    // console.log(value);
    if (value && value.id) {
      //updateValue("ADD_KEY", value.id);
      setEntity((pre: any) => {
        return { ...pre, subCategory: value, ADD_KEY: value.id };
      });
    }
  };

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
            variant="contained"
            color="primary"
            type="submit"     
            size="large"       
            sx={{ width: "50%", backgroundColor:"#5ea2a4", ":hover":{ backgroundColor:"#006064"} }}
          >
            {mode === "NEW" ? "CREATE" : "SAVE"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EntityNewOrEdit;
