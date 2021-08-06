## Libraries Used

- Material UI 
- Axios
- Framer Motion
- React-router-dom
- react-icons
- styled-componets
- date-fns

## Usage of Import
  1. each component is first imported into a index.js file in its folder
  2. from index.js all components are exported
  3. to use components in different file simply import the index.js file instead of individual imports
  4. same is true for every folder

## How State (context API) Works
 - state is divided into 3 categories
  - GlobalContext
    - to share global constants between different componets
    - available for everyone
  - LoginContext
    - handles the login state
    - available only for login page
  - SignupContext
    - handle the signup state
    - available only for signup page
