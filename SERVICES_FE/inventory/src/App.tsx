import React from "react";
import "./index.css";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import SubCategoryList from "./component/SubCategoryListing";
import ProductList from "./component/ProductListing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryRoot from "./component/category/CategoryRoot";
import EntityRoot from "./composer/EntityRoot";

export default function App() {
  return (
    <div className="application-contianer">
      <div className="section-header">
        <span>M A N A G E - I N V E N T O R Y </span>
      </div>
      <div className="inventory-curd-nav">
        <NavLink to="category" className="inventory-curd-nav-item">
          {({ isActive, isPending, isTransitioning }) => (
            <span
              className={
                isActive
                  ? "inventory-curd-nav-item-link-active"
                  : "inventory-curd-nav-item-link"
              }
            >
              C A T E G O R Y
            </span>
          )}
        </NavLink>

        <span className={"inventory-curd-nav-item-link"}>|</span>
        <NavLink to="entity" className="inventory-curd-nav-item">
          {({ isActive, isPending, isTransitioning }) => (
            <span
              className={
                isActive
                  ? "inventory-curd-nav-item-link-active"
                  : "inventory-curd-nav-item-link"
              }
            >
              E N T I T Y
            </span>
          )}
        </NavLink>

        <span className={"inventory-curd-nav-item-link"}>|</span>
        <NavLink to="subcategory" className="inventory-curd-nav-item">
          {({ isActive, isPending, isTransitioning }) => (
            <span
              className={
                isActive
                  ? "inventory-curd-nav-item-link-active"
                  : "inventory-curd-nav-item-link"
              }
            >
              S U B - C A T E G O R Y
            </span>
          )}
        </NavLink>
        <span className={"inventory-curd-nav-item-link"}>|</span>
        <NavLink to="product" className="inventory-curd-nav-item">
          {({ isActive, isPending, isTransitioning }) => (
            <span
              className={
                isActive
                  ? "inventory-curd-nav-item-link-active"
                  : "inventory-curd-nav-item-link"
              }
            >
              P R O D U C T
            </span>
          )}
        </NavLink>
      </div>

      <Routes>
        <Route index element={<Navigate replace to="category" />} />
        <Route path="category/*" element={<CategoryRoot />}>
          {/* <Route index element={<Navigate replace to="0" />} />
          <Route path=":id" element={<CategoryView />} />
          <Route path=":id/edit" element={<h5> E D I T</h5>} />
          <Route path="new" element={<CategoryForm />} /> */}
        </Route>
        <Route path="subcategory" element={<SubCategoryList />} />
        <Route path="product" element={<ProductList />} />
        <Route path="entity/*" element={<EntityRoot entityType="category"/>} />
      </Routes>

      <ToastContainer autoClose={400} pauseOnFocusLoss={false} />
    </div>
  );
}
