import React, { useEffect, useState } from "react";
import "../composer/composer.css";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import EntityHeaderNav from "../composer/EntityHeaderNav";
import EntityNew from "../composer/EntityNew";
import EntityView from "../composer/EntityView";
import EntityViewNone from "../composer/EntityViewNone";
import ActiveDataGrid from "./ActiveDataGrid";
import {
  DEFAULT_LIST_PAYLOAD,
  DEFAULT_LIST_RESPONSE,
  ListPayload,
  SUB_CATEGORY_COLUMNS,
} from "./DataGridHelper";
import ApiHub from "../service/ApiHub";
import { ListResponse } from "../model/ListResponse";
import { SubCategory, SubCategoryLabel } from "../model/SubCategory";
import { CategoryDropdown } from "./EntityDropdown";

//  - - - - - - - - - - -
//
//  Entity : SubCategory
//
//  - - - - - - - - - - -

export default function SubCategoryEntity() {
  console.log("< SUB-CATEGORT >");

  const entityType = "SubCategory";

  const navigation = useNavigate();

  const [entityId, setEntityId] = useState<number>(0);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();

  const [listResponse, setListResponse] = useState<ListResponse<SubCategory>>(
    DEFAULT_LIST_RESPONSE
  );

  useEffect(() => {
    console.log("< SUB-CATEGORT > EFFECT - LIST");
    handleDataLoadTrigger();
  }, []);

  const handleDataLoadTrigger = (
    payload: ListPayload = DEFAULT_LIST_PAYLOAD
  ) => {
    // console.log("< SUB-CATEGORT > API - LIST : ", payload);
    // console.log(_payload);
    ApiHub.loadSubCategoryList(payload)
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

  const onCategoryChange = (id: number) => {
    // console.log("__onCategoryChange : " + id);
    setSelectedCategoryId(id);
  };
  const handleOnClear = () => {
    // console.log("< SUB-CATEGORY > __handleOnClear");
    setSelectedCategoryId(undefined);
  };
  return (
    <>
      <div className="entity-root">
        <div className="entity-listing">
          <div className="cb-arrange-horizontally">
            <CategoryDropdown onChange={(id) => onCategoryChange(id)} />
            {selectedCategoryId}
          </div>

          <ActiveDataGrid
            columns={SUB_CATEGORY_COLUMNS}
            provider={listResponse}
            onRowSelection={(entityId) => handleRowSelection(entityId)}
            triggerDataLoad={(payload) => handleDataLoadTrigger(payload)}
            categoryId={selectedCategoryId}
            onClear={handleOnClear}
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
                element={<EntityView entityType={entityType} apiMethod={ApiHub.loadSubCategoryById} />}
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
