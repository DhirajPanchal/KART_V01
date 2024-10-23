import React from "react";

type EntityViewNoneProps = {
  entityType: string;
};

export default function EntityViewNone({
  entityType = "ENTITY",
}: EntityViewNoneProps) {
  return (
    <div className="entity-view-none">
      {`Select ${entityType} from the list for more details/options or click '`}{" "}
      <b> + </b> {`' to add new ${entityType}.`}
    </div>
  );
}
