import React, { useEffect, useState } from "react";
import {
  CATEGORY_COLUMNS,
  DEFAULT_LIST_PAYLOAD,
  DEFAULT_LIST_RESPONSE,
} from "../DataGridHelper";
import ApiHub from "../../service/ApiHub";
import { ListResponse } from "../../model/ListResponse";
import { Category } from "../../model/Category";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { Divider, Typography } from "@mui/material";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import ActiveDataGrid from "../ActiveDataGrid";
import CategoryView from "./CategoryView";
import CategoryForm from "./CategoryForm";

export default function CategoryRoot() {
  console.log("CATEGORY-ROOT");

  const pathname = window.location.pathname;

  const navigation = useNavigate();

  const [mode, setMode] = useState<string>("NONE");

  const [listResponse, setListResponse] = useState<ListResponse<Category>>(
    DEFAULT_LIST_RESPONSE
  );

  const [categoryId, setCategoryId] = useState<number>(0);

  useEffect(() => {
    //console.log("CATEGORY-ROOT > PARAM *** : " + pathname);
    if (pathname) {
      let paths = pathname.split("/");
      let strPath = paths[paths.length - 1];
      if (strPath === "0") {
        setMode("NASCENT");
      } else if (strPath === "new") {
        setMode("NEW");
      } else if (strPath === "edit") {
        setMode("EDIT");
      } else {
        setMode("VIEW");
      }
    }
  }, [pathname]);

  useEffect(() => {
    // console.log("CATEGORY-ROOT > EFFECT");
    loadDataHandle();
  }, []);

  const loadDataHandle = (payload: any = DEFAULT_LIST_PAYLOAD) => {
    //console.log("__Category . loadDataHandle  : " + payload);
    ApiHub.loadCategoryList(DEFAULT_LIST_PAYLOAD)
      .then((data) => {
        setListResponse(data);
      })
      .catch(() => {});
  };

  const handleRowSelection = (entityId: number) => {
    console.log("__handleRowSelection : " + entityId);
    setCategoryId(entityId);
    navigation("" + entityId);
  };

  const handleNew = () => {
    console.log("__handleNew");
    setCategoryId(0);
    navigation("new");
  };

  const handleEdit = () => {
    console.log("__handleEdit");
    navigation(`${categoryId}/edit`);
  };

  const handleSave = () => {
    console.log("__handleSave");
  };

  const handleCancel = () => {
    console.log("__handleCancel");
    navigation("./");
  };

  return (
    <>
      <div className="category-main">
        <div className=" category-grid">
          <ActiveDataGrid
            columns={CATEGORY_COLUMNS}
            provider={listResponse}
            triggerDataLoad={(payload) => loadDataHandle(payload)}
            onRowSelection={(entityId) => handleRowSelection(entityId)}
          />
        </div>
        <div className="category-grid category-form">
          <div className="category-view-wrapper">
            <Box sx={{ display: "grid", gridAutoColumns: "1fr", gap: 4 }}>
              <Box
                sx={{
                  gridRow: "1",
                  gridColumn: "1/4",
                  alignContent: "center",
                  paddingLeft: 2,
                }}
              >
                <Typography
                  sx={{ letterSpacing: 8, fontWeight: "bold", fontSize: 24 }}
                >
                  CATEGORY
                </Typography>
              </Box>
              <Box
                sx={{
                  gridRow: "1",
                  gridColumn: "3/5",
                  direction: "rtl",
                  "& > :not(style)": { m: 1 },
                }}
              >
                {(mode === "NASCENT" || mode === "VIEW") && (
                  <Fab color="primary" aria-label="add">
                    <AddIcon onClick={handleNew} />
                  </Fab>
                )}
                {mode === "VIEW" && (
                  <Fab color="secondary" aria-label="edit">
                    <EditIcon onClick={handleEdit} />
                  </Fab>
                )}
                {(mode === "NEW" || mode === "EDIT") && (
                  <Fab aria-label="cancel">
                    <CancelIcon onClick={handleCancel} />
                  </Fab>
                )}
              </Box>
            </Box>
            <Divider sx={{ height: 8 }} />
            <Routes>
              <Route index element={<Navigate replace to="0" />} />
              <Route path=":id" element={<CategoryView />} />
              <Route path=":id/edit" element={<CategoryForm mode="EDIT" entityId={categoryId}/>} />
              <Route path="new" element={<CategoryForm />} />
            </Routes>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
