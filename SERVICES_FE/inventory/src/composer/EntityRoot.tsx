import React, { useState } from "react";
import "./composer.css";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import CategoryDataGrid from "./CategoryDataGrid";
import EntityHeaderNav from "./EntityHeaderNav";
import EntityView from "./EntityView";
import EntityViewNone from "./EntityViewNone";
import EntityNew from "./EntityNew";

type EntityRootProps = {
  entityType: string;
};

export default function EntityRoot({
  entityType = "category",
}: EntityRootProps) {
  const navigation = useNavigate();

  const [entityId, setEntityId] = useState<number>(0);

  const handleRowSelection = (entityId: number) => {
    // console.log("__handleRowSelection : " + entityId);
    setEntityId(entityId);
    navigation("" + entityId);
  };

  return (
    <>
      <div className="entity-root">
        <div className="entity-listing">
          <CategoryDataGrid
            onRowSelection={(entityId) => handleRowSelection(entityId)}
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
              <Route path="new" element={<EntityNew  entityType={entityType} />} />
            </Routes>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
