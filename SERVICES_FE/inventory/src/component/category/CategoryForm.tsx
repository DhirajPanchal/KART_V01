import React, { FormEvent } from "react";

type CategoryFormProp = {
  mode?: string;
  entityId?: number | undefined;
};
export default function CategoryForm({ mode = "NEW" }: CategoryFormProp) {
  function handleSubmit(event: any) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (data.isDeleted && data.isDeleted === "on") {
      data.isDeleted = "1";
    } else {
      data.isDeleted = "0";
    }

    console.log(data);
  }

  return (
    <>
      <h3>{mode}</h3>

      <form className="a1-form" onSubmit={handleSubmit}>
        <div className="a1-control-row">
          <div className="a1-control">
            <label htmlFor="category-name">Name</label>
            <input type="text" id="category-name" name="name" required />
          </div>
        </div>
        <div className="a1-control-row">
          <div className="a1-control">
            <label htmlFor="is_deleted">
              <input type="checkbox" id="is_deleted" name="isDeleted" />
              Is Deleted
            </label>
          </div>
        </div>
        {/* <p className="a1-form-actions">
          <button type="reset" className="a1-button button-flat">
            Reset
          </button>
          <button type="submit" className="a1-button">
            {mode === "NEW" ? "Create" : "Save"}
          </button>
        </p> */}
      </form>
    </>
  );
}
