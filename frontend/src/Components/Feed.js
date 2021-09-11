import React from "react";
import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { motion } from "framer-motion";
import { pageAnimation } from "../animation";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Birthday from "./Birthday";

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

const Feed = () => {
  const classes = useStyles();

  const [filter, setFilter] = useState("");
  return (
    <Wrapper>
      <motion.div
        variants={pageAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="container"
      >
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
      </motion.div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  article {
    width: 60%;
    margin: auto;
  }

  h2 {
    font-weight: normal;
    margin: 0rem auto 2rem;
    text-align: center;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: center;
  }
`;

export default Feed;
