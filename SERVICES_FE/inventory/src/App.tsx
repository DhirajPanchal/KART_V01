import React from "react";
import "./index.css";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import CategoryList from "./component/CategoryList";
import SubCategoryList from "./component/SubCategoryList";
import ProductList from "./component/ProductList";

export default function App() {
  return (
    <>
      <div className="section-header">
        <h2>M A N A G E - I N V E N T O R Y </h2>
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
        <Route path="/category" element={<CategoryList />} />
        <Route path="/subcategory" element={<SubCategoryList />} />
        <Route path="/product" element={<ProductList />} />
      </Routes>
    </>
  );
}
