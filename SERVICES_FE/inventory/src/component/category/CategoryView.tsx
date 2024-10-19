import React, { useEffect, useState } from "react";
import { Category } from "../../model/Category";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import ApiHub from "../../service/ApiHub";

type CategoryViewProps = {};

export default function CategoryView({}: CategoryViewProps) {
 // console.log("CATEGORY-VIEW ");
  let params = useParams();
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    //console.log("CATEGORY-VIEW > EFFECT : " + params.id);
    let categoryId = params.id ? +params.id : 0;
    if (!isNaN(categoryId) && categoryId > 0) {
      ApiHub.loadCategoryById(categoryId)
        .then((data) => {
          setCategory(data);
        })
        .catch(() => {});
    }
  }, [params.id]);

  function fieldGenerator() {
    //console.log("__View Generator");
    let fieldList: { label: string; value: string }[] = [];
    if (category) {
      for (const [key, value] of Object.entries(category)) {
        //console.log(`${key}: ${value}`);
        let strKey = key ? key.toUpperCase() : "";
        let strValue = value !== undefined ? "" + value : "";
        //console.log(`${strKey}: ${strValue} ***`);
        fieldList.push({ label: strKey, value: strValue });
      }
    }
    return fieldList;
  }

  return (
    <>
      {params.id && +params.id > 0 ? (
        <h3>V I E W</h3>
      ) : (
        <h3><i>Select Category ...</i></h3>
      )}

      <Grid container>
        {fieldGenerator().map((field) => (
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ width: "100%", mb: 1 }}
            key={field.label}
          >
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontSize: 16, width: "100px" }}
            >
              {field.label}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: 16, fontWeight: "bold" }}
            >
              {field.value}
            </Typography>
          </Stack>
        ))}
      </Grid>
    </>
  );
}
