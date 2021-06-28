import React, { useState } from "react";
import styled from "styled-components";
import { Birthday, Header, BottomNavbar } from "../Components";

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const UserHome = () => {
  const classes = useStyles();

  const [filter, setFilter] = useState("");
  return (
    <Wrapper>
      <Header />
      <div className="container">
        <article>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              required
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="tommorrow">Tommorrow</MenuItem>
              <MenuItem value="week">Next Week</MenuItem>
              <MenuItem value="month">Next Month</MenuItem>
            </Select>
          </FormControl>
        </article>

        <h2>Upcoming Birthdays</h2>

        <section>
          <Birthday />
          <Birthday />
          <Birthday />
          <Birthday />
          <Birthday />
          <Birthday />
        </section>
      </div>
      <BottomNavbar />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  article {
    margin: 1rem auto;
    width: 50%;
    .MuiSelect-select {
      color: white;
      font-size: 1rem;
      border-bottom: 2px solid white;
      @media screen and (min-width: 768px) {
        font-size: 1.5rem;
      }
    }
    .MuiSelect-icon,
    #demo-simple-select-label {
      color: white;
      font-size: 1rem;
    }
  }

  h2 {
    text-align: center;
    font-weight: lighter;
    font-size: 1.5rem;
    letter-spacing: var(--letter-spacing-basic);
  }

  section {
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

export default UserHome;
