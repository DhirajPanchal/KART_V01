import React, { useEffect, useState } from "react";
import "../composer/composer.css";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import EntityHeaderNav from "../composer/EntityHeaderNav";

import EntityViewNone from "../composer/EntityViewNone";
import ActiveDataGrid from "./ActiveDataGrid";
import {
  DEFAULT_LIST_PAYLOAD,
  DEFAULT_LIST_RESPONSE,
  PRODUCT_COLUMNS,
} from "./DataGridHelper";
import ApiHub from "../service/ApiHub";
import { ListResponse } from "../model/ListResponse";
import { Product } from "../model/Product";
import { CategoryDropdown, SubCategoryDropdown } from "./EntityDropdown";
import EntityViewRenderer from "../composer/EntityViewRenderer";
import EntityNew from "../composer/EntityNew";

//  - - - - - - - - - - -
//
//  Entity : Product
//
//  - - - - - - - - - - -

export default function ProductEntity() {
  console.log("< PRODUCT >");

  const entityType = "product";

  const navigation = useNavigate();

  const [entityId, setEntityId] = useState<number>(0);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number>();

  const [listResponse, setListResponse] = useState<ListResponse<Product>>(
    DEFAULT_LIST_RESPONSE
  );

  useEffect(() => {
    console.log("< PRODUCT > EFFECT");
    handleDataLoadTrigger();
  }, []);

  const handleDataLoadTrigger = (payload: any = DEFAULT_LIST_PAYLOAD) => {
    console.log("< PRODUCT > API - LIST : ", payload);
    // console.log(payload);
    ApiHub.loadProductList(payload)
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
    console.log("__onCategoryChange : " + id);
    setSelectedCategoryId(id);
  };

  const onSubCategoryChange = (id: number) => {
    console.log("__onCategoryChange : " + id);
    if (selectedCategoryId !== undefined && selectedCategoryId !== 0) {
      setSelectedSubCategoryId(id);
    }
  };

  const handleOnClear = () => {
    console.log("< PRODUCT > __handleOnClear");
    setSelectedCategoryId(undefined);
    setSelectedSubCategoryId(undefined);
  };

  return (
    <>
      <div className="entity-root">
        <div className="entity-listing">
          <div className="cb-arrange-horizontally">
            <div className="cb-arrange-horizontally">
              {/* {entityId} */}
              <CategoryDropdown onChange={(id) => onCategoryChange(id)} />
              {selectedCategoryId}

              {selectedCategoryId !== undefined && selectedCategoryId > 0 && (
                <SubCategoryDropdown
                  categoryId={selectedCategoryId}
                  onChange={(id) => onSubCategoryChange(id)}
                />
              )}

              {selectedSubCategoryId}
            </div>
          </div>

          <ActiveDataGrid
            columns={PRODUCT_COLUMNS}
            provider={listResponse}
            onRowSelection={(entityId) => handleRowSelection(entityId)}
            triggerDataLoad={(payload) => handleDataLoadTrigger(payload)}
            categoryId={selectedCategoryId}
            subCategoryId={selectedSubCategoryId}
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
                element={
                  <EntityViewRenderer
                    entityType={entityType}
                    entityGetApi={ApiHub.loadProductById}
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
