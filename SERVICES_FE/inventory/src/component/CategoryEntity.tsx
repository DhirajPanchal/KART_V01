import React, { useEffect, useState } from "react";
import "../composer/composer.css";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import EntityHeaderNav from "../composer/EntityHeaderNav";
import EntityNew from "../composer/EntityNew";
import EntityView from "../composer/EntityView";
import EntityViewNone from "../composer/EntityViewNone";
import ActiveDataGrid from "./ActiveDataGrid";
import {
  CATEGORY_COLUMNS,
  DEFAULT_LIST_PAYLOAD,
  DEFAULT_LIST_RESPONSE,
  top100Films,
} from "./DataGridHelper";
import ApiHub from "../service/ApiHub";
import { ListResponse } from "../model/ListResponse";
import { Category } from "../model/Category";
import { Autocomplete, TextField } from "@mui/material";

//  - - - - - - - - - - -
//
//  Entity : Category
//
//  - - - - - - - - - - -

export default function CategoryEntity() {
  console.log("< CATEGORT >");

  const entityType = "category";

  const navigation = useNavigate();

  const [entityId, setEntityId] = useState<number>(0);

  const [listResponse, setListResponse] = useState<ListResponse<Category>>(
    DEFAULT_LIST_RESPONSE
  );

  useEffect(() => {
    console.log("< CATEGORT > EFFECT");
    handleDataLoadTrigger();
  }, []);

  const handleDataLoadTrigger = (payload: any = DEFAULT_LIST_PAYLOAD) => {
    console.log("< CATEGORT > API - LIST : ", payload);
    // console.log(payload);
    ApiHub.loadCategoryList(payload)
      .then((data) => {
        setListResponse(data);
      })
      .catch(() => {});
  };

  const handleRowSelection = (entityId: number) => {
    // console.log("__handleRowSelection : " + entityId);
    setEntityId(entityId);
    navigation("" + entityId);
  };

  const handleCategoryChange = (value: any) => {
    console.log("__handleCategoryChange");
    console.log(value);
  };

  return (
    <>
      <div className="entity-root">
        <div className="entity-listing">

          {/* <div className="cb-arrange-horizontally">

            <Autocomplete
              disablePortal
              options={top100Films}
              sx={{ width: 300 }}
              onChange={(event, value) => handleCategoryChange(value)}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />

            <Autocomplete
              disablePortal
              options={top100Films}
              sx={{ width: 300 }}
              onChange={(event, value) => handleCategoryChange(value)}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />
          </div> */}

          <ActiveDataGrid
            columns={CATEGORY_COLUMNS}
            provider={listResponse}
            onRowSelection={(entityId) => handleRowSelection(entityId)}
            triggerDataLoad={(payload) => handleDataLoadTrigger(payload)}
          />
        </div>

        <div className="entity-body">
          <div className="entity-nav">
            <EntityHeaderNav
              entityId={entityId}
              onNewNaviation={() => handleRowSelection(0)}
            />
          </div>

          <div className="entity-curd">
            <Routes>
              <Route index element={<Navigate replace to="0" />} />
              <Route
                path="0"
                element={<EntityViewNone entityType={entityType} />}
              />
              <Route
                path=":id"
                element={<EntityView entityType={entityType} />}
              />
              <Route path=":id/edit" element={<h1>EDIT</h1>} />
              <Route
                path="new"
                element={<EntityNew entityType={entityType} />}
              />
            </Routes>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
