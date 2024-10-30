import React from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./composer/form.css";
import CategoryEntity from "./component/CategoryEntity";
import ProductEntity from "./component/ProductEntity";
import SubCategoryEntity from "./component/SubCategoryEntity";

export default function App() {
  console.log("<APP> *** ");

  const loadConfig = (): void => {
    console.log("[CONFIG]");
    
  };
  
  loadConfig();

  return (
    <div className="application-contianer">
      <div className="section-header">
        <span>MANAGE - INVENTORY </span>
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
        <Route path="category/*" element={<CategoryEntity />} />
        <Route path="subcategory/*" element={<SubCategoryEntity />} />
        <Route path="product/*" element={<ProductEntity />} />
      </Routes>

      <ToastContainer autoClose={400} pauseOnFocusLoss={false} />
    </div>
  );
}
