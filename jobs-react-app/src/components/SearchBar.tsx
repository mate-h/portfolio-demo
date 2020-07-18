import React, { useState } from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { set as setAction } from "../lib/actions";
import { useAction } from "../lib/hooks";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import debounce from "lodash.debounce";
import { debounceTime } from "../lib/config";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "20px 20px",
    backgroundPosition: "10px center",
    borderRadius: theme.shape.borderRadius,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    height: 16,
    padding: "10px 12px 10px 36px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

const storeValue = debounce(
  (path: string, data: string, set) => {
    set({ path, data });
  },
  debounceTime,
  { trailing: true }
);

export function SearchBar() {
  const [form, setForm] = useState<any>({});
  const set = useAction(setAction);
  const getInputHandler = (id: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data = event.target.value;
    setForm({
      ...form,
      [id]: data,
    });
    storeValue(`searchForm.${id}`, data, set);
  };
  const onFormSubmit = () => {
    console.log(form);
  };

  return (
    <Box component="form" py={2} onSubmit={onFormSubmit}>
      <Grid container spacing={3} alignItems="flex-end">
        <Grid item xs={12} sm="auto" style={{ flexGrow: 1 }}>
          <FormControl fullWidth>
            <InputLabel shrink htmlFor="description-input">
              Job Description
            </InputLabel>
            <BootstrapInput
              id="description-input"
              inputProps={{
                style: { backgroundImage: `url(/clipboard.min.svg)` },
              }}
              title="Filter by title, benefits, companies, expertise"
              placeholder="Filter by title, benefits, companies, expertise"
              onChange={getInputHandler("descriptionField")}
              autoComplete="off"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm="auto" style={{ flexGrow: 1 }}>
          <FormControl fullWidth>
            <InputLabel shrink htmlFor="location-input">
              Location
            </InputLabel>
            <BootstrapInput
              id="location-input"
              inputProps={{ style: { backgroundImage: `url(/earth.min.svg)` } }}
              title="Filter by city, state, zip code or country"
              placeholder="Filter by city, state, zip code or country"
              onChange={getInputHandler("locationField")}
              autoComplete="off"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
