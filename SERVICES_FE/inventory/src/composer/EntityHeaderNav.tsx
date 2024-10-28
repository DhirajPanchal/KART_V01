import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";

type EntityHeaderNavProp = {
  entityId: number;
  onNewNaviation?: () => void;
};

export default function EntityHeaderNav({
  entityId = 0,
  onNewNaviation,
}: EntityHeaderNavProp) {
  const pathname = window.location.pathname;

  const navigation = useNavigate();

  const [mode, setMode] = React.useState<string>("NONE");

  React.useEffect(() => {
    //console.log("[EntityHeaderNav] pathname : " + pathname);
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

  const handleNew = () => {
    console.log("__handleNew");
    if (onNewNaviation) {
      onNewNaviation();
    }
    navigation("new");
  };

  const handleEdit = () => {
    console.log("__handleEdit "+entityId);
    navigation(`${entityId}/edit`);
  };

  const handleCancel = () => {
    // console.log("__handleCancel");
    if (onNewNaviation) {
      onNewNaviation();
    }
    navigation("./");
  };

  return (
    <>
      {/* {` - ${mode} / ${entityId} -  `} */}

      {mode === "VIEW" && (
        <button onClick={handleEdit}>
          {" "}
          <EditIcon />{" "}
        </button>
      )}

      {(mode === "NASCENT" || mode === "VIEW") && (
        <button onClick={handleNew}>
          {" "}
          <AddIcon />{" "}
        </button>
      )}

      {(mode === "NEW" || mode === "EDIT" || mode === "VIEW") && (
        <button onClick={handleCancel}>
          <CancelIcon />
        </button>
      )}
    </>
  );
}
