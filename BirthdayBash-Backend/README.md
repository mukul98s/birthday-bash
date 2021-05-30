# Api Routes

### Sign Up Route

`http://localhost:4000/api/v1/signup/`

### Login Route

`http://localhost:4000/api/v1/login/`

    -> Returns a accesstoken

### User Profile Route (Proctected Route ,Only accessed by use of accesstoken )

`http://localhost:4000/api/v1/userProfile/showUserProfile/`

    ->Use a Authorization header and put value in it like this: Bearer acccesstoken

    ->It returns the particular user data whose accesstoken is given in the header
