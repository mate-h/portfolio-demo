import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { set as setAction } from "../lib/actions";
import { useAction, useSearchForm } from "../lib/hooks";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import debounce from "lodash.debounce";
import { debounceTime } from "../lib/config";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useHistory } from "react-router-dom";
import { BootstrapInput } from ".";

const storeValue = debounce(
  (path: string, data: string, set) => {
    set({ path, data });
  },
  debounceTime,
  { trailing: true }
);

export function SearchBar() {
  const searchForm = useSearchForm();
  const history = useHistory();
  const [form, setForm] = useState<any>(searchForm);
  const [autoSearch, setAutoSearch] = useState(true);
  const emptyForm = (f: any) => Object.values(f).filter((a) => a).length === 0;
  const set = useAction(setAction);
  const handler = (event: React.ChangeEvent<any>) => {
    const data = event.target.value;
    const name = event.target.name;
    const newForm = {
      ...form,
      [name]: data,
    };
    setForm(newForm);
    if (autoSearch) {
      storeValue(`searchForm.${name}`, data, set);
    } else if (emptyForm(newForm)) {
      set({ path: `searchForm`, data: form });
    }
  };
  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    set({ path: `searchForm`, data: form });
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
              name="descriptionField"
              inputProps={{
                style: { backgroundImage: `url(/clipboard.min.svg)` },
              }}
              title="Filter by title, benefits, companies, expertise"
              placeholder="Filter by title, benefits, companies, expertise"
              onChange={handler}
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
              name="locationField"
              inputProps={{ style: { backgroundImage: `url(/earth.min.svg)` } }}
              title="Filter by city, state, zip code or country"
              placeholder="Filter by city, state, zip code or country"
              onChange={handler}
              autoComplete="off"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            disabled={emptyForm(form)}
            type="submit"
            variant="contained"
            color="primary"
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <FormControlLabel
        control={
          <Checkbox
            name="autoSearch"
            checked={autoSearch}
            onChange={() => setAutoSearch(!autoSearch)}
            color="primary"
          />
        }
        label="Search as you type"
      />
    </Box>
  );
}
