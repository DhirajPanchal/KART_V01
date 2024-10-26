import React, { useEffect, useState } from "react";
import "../composer/composer.css";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import EntityHeaderNav from "../composer/EntityHeaderNav";
import EntityNew from "../composer/EntityNew";
import EntityViewNone from "../composer/EntityViewNone";
import ActiveDataGrid from "./ActiveDataGrid";
import {
  CATEGORY_COLUMNS,
  DEFAULT_LIST_PAYLOAD,
  DEFAULT_LIST_RESPONSE,
} from "./DataGridHelper";
import ApiHub from "../service/ApiHub";
import { ListResponse } from "../model/ListResponse";
import { Category } from "../model/Category";
import EntityViewRenderer from "../composer/EntityViewRenderer";

//  - - - - - - - - - - -
//
//  Entity : Category
//
//  - - - - - - - - - - -

export default function CategoryEntity() {
  // console.log("< CATEGORT >");

  const entityType = "category";

  const navigation = useNavigate();

  const [listResponse, setListResponse] = useState<ListResponse<Category>>(
    DEFAULT_LIST_RESPONSE
  );

  const [entityId, setEntityId] = useState<number>(0);

  useEffect(() => {
    console.log("*** < CATEGORT > EFFECT - LIST");
    handleDataLoadTrigger();
  }, []);

  const handleDataLoadTrigger = (payload: any = DEFAULT_LIST_PAYLOAD) => {
    console.log("### < CATEGORT > API - LIST : ", payload);
    ApiHub.loadCategoryList(payload)
      .then((data) => {
        setListResponse(data);
      })
      .catch(() => {});
  };

  const handleRowSelection = (id: number) => {
    // console.log("__handleRowSelection : " + id);
    // setEntityId(id);
    navigation("" + id);
  };

  return (
    <>
      <div className="entity-root">
        <div className="entity-listing">
          {/* {entityId} */}
          <ActiveDataGrid
            columns={CATEGORY_COLUMNS}
            provider={listResponse}
            onRowSelection={(id) => handleRowSelection(id)}
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
              {/* <Route
                path=":id"
                element={<EntityView entityType={entityType} apiMethod={ApiHub.loadCategoryById} />}
              /> */}
              <Route
                path=":id"
                element={
                  <EntityViewRenderer
                    entityType={entityType}
                    apiMethod={ApiHub.loadCategoryById}
                  />
                }
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
