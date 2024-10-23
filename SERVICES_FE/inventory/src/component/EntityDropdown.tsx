import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { CategoryLabel } from "../model/Category";
import ApiHub from "../service/ApiHub";
import { DEFAULT_LABEL_LIST_PAYLOAD, ListPayload } from "./DataGridHelper";
import { SubCategoryLabel } from "../model/SubCategory";

type CategoryDropdownProps = {
  onChange?: (id: number) => void;
};

export const CategoryDropdown = ({ onChange }: CategoryDropdownProps) => {
  // console.log("< CATEGORT DROP DOWN > ");
  const [list, setList] = useState<CategoryLabel[]>([]);

  useEffect(() => {
    // console.log("< CATEGORT DROP DOWN > EFFECT");
    loadList();
  }, []);

  const loadList = (payload: any = DEFAULT_LABEL_LIST_PAYLOAD) => {
    // console.log("< CATEGORT DROP DOWN > API - LIST : ", payload);
    // console.log(payload);
    ApiHub.loadCategoryLabelList(payload)
      .then((data) => {
        setList(data.list);
      })
      .catch(() => {});
  };

  const handleCategoryChange = (value: any) => {
    // console.log("__handleCategoryChange");
    // console.log(value);
    let id: number = 0;
    if (value && value.id) {
      id = value.id;
    }
    if (onChange) {
      onChange(id);
    }
  };

  return (
    <>
      <Autocomplete
        disablePortal
        options={list === undefined || list === null ? [] : list}
        getOptionLabel={(obj) => dropdownLabel(obj)}
        sx={{ width: 240 }}
        onChange={(event, value) => handleCategoryChange(value)}
        renderInput={(params) => (
          <TextField {...params} label="Select Category" />
        )}
      />
    </>
  );
};

type SubCategoryDropdownProps = {
  categoryId?: number;
  onChange?: (id: number) => void;
};

export const SubCategoryDropdown = ({
  categoryId = 0,
  onChange,
}: SubCategoryDropdownProps) => {
  // console.log("< SUB-CATEGORT DROP DOWN > ");
  const [list, setList] = useState<SubCategoryLabel[]>([]);

  useEffect(() => {
    // console.log("< SUB-CATEGORT DROP DOWN > EFFECT +++ " + categoryId);

    loadList();
  }, [categoryId]);

  const loadList = (payload: any = DEFAULT_LABEL_LIST_PAYLOAD) => {
    // console.log("< SUB-CATEGORT DROP DOWN > API - LIST : ", payload);
    // console.log(payload);

    const localPayload: ListPayload = {
      ...payload,
      ui_only: {
        ...payload.ui_only,
        categoryId: categoryId,
      },
    };

    ApiHub.loadSubCategoryLabelList(localPayload)
      .then((data) => {
        setList(data.list);
      })
      .catch(() => {});
  };

  const handleCategoryChange = (value: any) => {
    // console.log("__handleCategoryChange");
    // console.log(value);
    let id: number = 0;
    if (value && value.id) {
      id = value.id;
    }
    if (onChange) {
      onChange(id);
    }
  };

  return (
    <>
      <Autocomplete
        disablePortal
        options={list === undefined || list === null ? [] : list}
        getOptionLabel={(obj) => dropdownLabel(obj)}
        sx={{ width: 240 }}
        onChange={(event, value) => handleCategoryChange(value)}
        renderInput={(params) => (
          <TextField {...params} label="Select Sub-Category" />
        )}
      />
    </>
  );
};

const dropdownLabel = (item: any): string => {
  if (item !== undefined && item.name !== undefined && item.id !== undefined) {
    return ` ${item.name} ( ${item.id} ) `;
  }
  return "";
};
