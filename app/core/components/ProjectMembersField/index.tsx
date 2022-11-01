import React, { Fragment, useState } from "react";
import {
  Autocomplete,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { SkillsSelect } from "app/core/components/SkillsSelect";
import { DisciplinesSelect } from "app/core/components/DisciplineSelect";

interface ProfilesSelectProps {
  name: string;
  label: string;
  helperText?: string;
  handleChange: React.Dispatch<React.SetStateAction<any>>;
  values: object;
}

export const ProjectMembersField = ({
  name,
  label,
  helperText,
  handleChange,
  values,
}: ProfilesSelectProps) => {
  const profiles: readonly any[] = ["diego", "jorge", "jose"];
  return (
    <React.Fragment>
      <Autocomplete
        multiple
        options={profiles}
        value={values.contributors}
        onChange={(_e, newValue) =>
          handleChange({ name: "contributors", newValue: newValue })
        }
        renderInput={(params) => <TextField {...params} label={label} />}
      />
      <Grid
        container
        spacing={1}
        alignItems="baseline"
        rowSpacing={{ xs: 2, sm: 1 }}
        style={{ paddingTop: 20 }}
      >
        <React.Fragment>
          <Grid item xs={12} sm={2}>
            <Chip label={values.owner} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              multiple
              fullWidth
              style={{ margin: "1em 0" }}
              value={values.roles}
              onChange={(_e, newValue) =>
                handleChange({ name: "roles", newValue: newValue })
              }
              size="small"
              options={profiles}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  id={name}
                  label={"role(s)"}
                  size="small"
                  style={{ margin: 0 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              multiple
              fullWidth
              style={{ margin: "1em 0" }}
              value={values.skills}
              onChange={(_e, newValue) =>
                handleChange({ name: "skills", newValue: newValue })
              }
              options={["deded", "dwdw"]}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  id={name}
                  label={"skills"}
                  size={"small"}
                  style={{ margin: 0 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={1}>
            <TextField
              label="Hours"
              helperText="H. per week"
              name="hours"
              size="small"
              type="number"
              onChange={(event) =>
                handleChange({ name: "hours", newValue: event.target.value })
              }
              sx={{
                "& .MuiFormHelperText-root": {
                  marginLeft: 0,
                  marginRight: 0,
                  textAlign: "center",
                },
              }}
            />
          </Grid>
          <Grid item xs={2} sm={1} style={{ textAlign: "center" }}>
            <FormControlLabel
              label="Active"
              control={
                <Checkbox
                  size="small"
                  checked={values.active}
                  onChange={(event) =>
                    handleChange({
                      name: "active",
                      newValue: event.target.checked,
                    })
                  }
                />
              }
            />
          </Grid>
          <hr className="rows__separator" />
        </React.Fragment>
      </Grid>
    </React.Fragment>
  );
};
export default ProjectMembersField;