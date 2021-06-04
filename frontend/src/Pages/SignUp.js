import styled from "styled-components";
import React, { useState } from "react";
import { Header } from "../Components";
import { Link } from "react-router-dom";
import cancel from "../assets/cancel.svg";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

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

const SignUp = () => {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <Wrapper>
      <Header />
      <div className="container">
        <div className="cross">
          <Link to="/">
            <img src={cancel} alt="" />
          </Link>
        </div>

        <form>
          <TextField
            label="Name"
            variant="standard"
            color="primary"
            fullWidth
            required
          />
          <TextField
            label="Email"
            variant="standard"
            color="primary"
            fullWidth
            required
          />
          <TextField label="Bio" variant="standard" color="primary" fullWidth />

          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
              <MenuItem value="private">Prefer Not to Tell</MenuItem>
            </Select>
          </FormControl>

          <div className="date-of-birth">
            <h2>Date of Birth</h2>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                format="do MMMM yyyy"
                disableFuture
                allowKeyboardControl={false}
              />
            </MuiPickersUtilsProvider>
          </div>

          <TextField
            label="Password"
            type="password"
            variant="standard"
            color="primary"
            fullWidth
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="standard"
            color="primary"
            fullWidth
            required
          />

          <button className="button">Register</button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .cross {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    a {
      width: 2.25rem;
      margin: 2rem;

      img {
        width: 100%;
      }
    }
  }

  form {
    .MuiTextField-root {
      color: white;
      border-bottom: 2px var(--text-light) solid;
      margin: 2rem auto;
      label {
        color: var(--text-light);
      }
      input {
        color: var(--text-light);
        font-size: 1.2rem;
        font-weight: light;
      }
    }

    .date-of-birth {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: space-evenly;
      margin: 2rem auto 1rem;

      .MuiTextField-root {
        margin: 0;
      }

      h2 {
        font-weight: lighter;
        text-transform: capitalize;
        font-size: 1.3rem;
      }
    }
    .MuiSelect-select {
      color: white;
      font-size: 1.1rem;
      border-bottom: 2px solid white;
    }
    .MuiSelect-icon,
    #demo-simple-select-label {
      color: white;
    }
  }
`;

export default SignUp;
