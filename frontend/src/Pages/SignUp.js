import styled from "styled-components";
import React, { useContext, useState } from "react";
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
import { SignUpContext } from "../State/SignupState";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { pageAnimation } from "../animation";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { createUser } = useContext(SignUpContext);

  const emailRegex = /\w+@[A-Za-z]{1,8}\.[A-Za-z]{2,5}(\.[A-za-z]{2})*/i;

  const handleSubmit = (e) => {
    e.preventDefault();

    const filledProperly =
      emailRegex.test(email) &&
      name &&
      password &&
      confirmPassword &&
      gender !== null &&
      selectedDate !== null;

    if (filledProperly) {
      if (password === confirmPassword) {
        createUser({
          username: name,
          email,
          bio,
          password,
          dob: format(selectedDate, "yyyy-MM-dd").toString(),
          gender,
        });
      } else {
        //popup modal window
        console.log("both passwords should match");
      }
    } else {
      //popup modal window
      console.log("please fill all required fields properly");
    }
  };
  return (
    <Wrapper>
      <Header />
      <motion.div
        variants={pageAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="container"
      >
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="standard"
            color="primary"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Bio"
            variant="standard"
            color="primary"
            fullWidth
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
              <MenuItem value="hidden">Prefer Not to Tell</MenuItem>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="standard"
            color="primary"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="button" onClick={handleSubmit}>
            Register
          </button>
        </form>
      </motion.div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .cross {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    a {
      width: 1.5rem;
      margin: 1.5rem;
      @media screen and (min-width: 768px) {
        width: 2.25rem;
        margin: 3rem 0;
      }

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
        @media screen and (min-width: 768px) {
          font-size: 1.2rem;
        }
      }
      input {
        color: var(--text-light);
        font-size: 1.2rem;
        font-weight: light;
        @media screen and (min-width: 768px) {
          font-size: 1.5rem;
        }
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
      @media screen and (min-width: 768px) {
        font-size: 1.5rem;
      }
    }
    .MuiSelect-icon,
    #demo-simple-select-label {
      color: white;
      font-size: 1.2rem;
    }

    @media screen and (min-width: 768px) {
      .button {
        width: 70%;
        margin: 3rem 15%;
      }
    }
  }
`;

export default SignUp;
