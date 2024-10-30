import React, { useEffect, useState } from "react";
import "../composer/composer.css";
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
import EntityNewOrEdit from "../composer/EntityNewOrEdit";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "./AnimatedPage";

//  - - - - - - - - - - -
//
//  Entity : Product
//
//  - - - - - - - - - - -

export default function ProductEntity() {
  console.log("< PRODUCT >");

  const entityType = "product";
  const location = useLocation();
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
            <CategoryDropdown onChange={(id) => onCategoryChange(id)} />
            {/* {selectedCategoryId} */}
            {selectedCategoryId !== undefined && selectedCategoryId > 0 && (
              <SubCategoryDropdown
                categoryId={selectedCategoryId}
                onChange={(id) => onSubCategoryChange(id)}
              />
            )}
            {/* {selectedSubCategoryId} */}
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
          <AnimatedPage animaDuration={1}>
            <div className="entity-nav">
              <EntityHeaderNav
                entityId={entityId}
                onNewNaviation={() => handleRowSelection(0)}
              />
            </div>
          </AnimatedPage>
          <div className="entity-curd">
            <AnimatePresence mode="wait">
              <Routes key={location.pathname} location={location}>
                <Route index element={<Navigate replace to="0" />} />
                <Route
                  path="0"
                  element={
                    <AnimatedPage>
                      <EntityViewNone entityType={entityType} />{" "}
                    </AnimatedPage>
                  }
                />
                <Route
                  path=":id"
                  element={
                    <AnimatedPage>
                      <EntityViewRenderer
                        entityType={entityType}
                        entityGetApi={ApiHub.loadProductById}
                      />
                    </AnimatedPage>
                  }
                />
                <Route
                  path=":id/edit"
                  element={
                    <AnimatedPage>
                      <EntityNewOrEdit
                        mode="EDIT"
                        entityType={entityType}
                        entityId={entityId}
                        entityGetApi={ApiHub.loadProductById}
                        entityUpdateApi={ApiHub.updateProduct}
                        refreshDatagrid={handleDataLoadTrigger}
                        catSubListApi={ApiHub.loadSubCategoryLabelList}
                      />{" "}
                    </AnimatedPage>
                  }
                />
                <Route
                  path="new"
                  element={
                    <AnimatedPage>
                      <EntityNewOrEdit
                        mode="NEW"
                        entityType={entityType}
                        entityId={0}
                        entityGetApi={ApiHub.loadProductById}
                        entityCreateApi={ApiHub.addProduct}
                        refreshDatagrid={handleDataLoadTrigger}
                        catSubListApi={ApiHub.loadSubCategoryLabelList}
                      />{" "}
                    </AnimatedPage>
                  }
                />
              </Routes>
            </AnimatePresence>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
