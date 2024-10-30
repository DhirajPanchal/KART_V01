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
  CATEGORY_COLUMNS,
  DEFAULT_LIST_PAYLOAD,
  DEFAULT_LIST_RESPONSE,
} from "./DataGridHelper";
import ApiHub from "../service/ApiHub";
import { ListResponse } from "../model/ListResponse";
import { Category } from "../model/Category";
import EntityViewRenderer from "../composer/EntityViewRenderer";
import EntityNewOrEdit from "../composer/EntityNewOrEdit";
import AnimatedPage from "./AnimatedPage";
import { AnimatePresence } from "framer-motion";

//  - - - - - - - - - - -
//
//  Entity : Category
//
//  - - - - - - - - - - -

export default function CategoryEntity() {
  // console.log("< CATEGORT >");

  const entityType = "category";
  const location = useLocation();
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
    //  console.log("__handleRowSelection : " + id);
    setEntityId(id);
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
                      <EntityViewNone entityType={entityType} />
                    </AnimatedPage>
                  }
                />
                <Route
                  path=":id"
                  element={
                    <AnimatedPage>
                      <EntityViewRenderer
                        entityType={entityType}
                        entityGetApi={ApiHub.loadCategoryById}
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
                        entityGetApi={ApiHub.loadCategoryById}
                        entityUpdateApi={ApiHub.updateCategory}
                        refreshDatagrid={handleDataLoadTrigger}
                      />
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
                        entityGetApi={ApiHub.loadCategoryById}
                        entityCreateApi={ApiHub.addCategory}
                        refreshDatagrid={handleDataLoadTrigger}
                      />
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
