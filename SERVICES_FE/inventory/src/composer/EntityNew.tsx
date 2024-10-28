import React, { FormEvent } from "react";
import "./form.css";
import { Chip } from "@mui/material";
import ApiHub from "../service/ApiHub";
import { Category } from "../model/Category";
import { useNavigate } from "react-router-dom";

type EntityNewProps = {
  entityType: string;
};

export default function EntityNew({ entityType }: EntityNewProps) {
  const navigation = useNavigate();
  function handleSubmit(event: any) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const input = Object.fromEntries(fd.entries());

    console.log(input);

    input.active = "" + true;
    input.deleted = "" + false;

    ApiHub.addCategory(input)
      .then((data: Category) => {
        console.log("---");
        console.log(data);
        if (data && data.id) {
          console.log("NAV " + data.id);
          navigation(`../${data.id}`);
        }
      })
      .catch(() => {});
  }

  const navi = () => {
    navigation("../10");
  };

  return (
    <div className="entity-new">
      {/* <button onClick={navi}> NAV </button> */}
      <div className="entity-view-type">
        <Chip
          label={entityType ? entityType.toUpperCase() : ""}
          variant="outlined"
          sx={{ backgroundColor: "#E0F7FA" }}
        />
        <span className="entity-view-name">New</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="control-row">
          <div className="control">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" name="name" />
          </div>
        </div>

        <div className="control-row">
          <div className="control">
            <label htmlFor="active">
              <input type="checkbox" id="active" name="active" />
              Active.
            </label>
          </div>
        </div>

        <div className="control-row">
          <div className="control">
            <label htmlFor="terms-and-conditions">
              <input type="checkbox" id="terms-and-conditions" name="deleted" />
              Deleted
            </label>
          </div>
        </div>
        <div className="entity-new-space"></div>
        <p className="form-actions">
          <button type="reset" className="button button-flat">
            R e s e t
          </button>
          <button type="submit" className="button">
            S a v e
          </button>
        </p>
      </form>
    </div>
  );
}
