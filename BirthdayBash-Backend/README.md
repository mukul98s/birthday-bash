# Api Routes

### Sign Up Route

`http://localhost:4000/api/v1/signup/`

Data To Pass Into Request

Ex :-

{

"username":"test" ,

"email":"test@test.com",

"password":"123456789",

"dob":"2021-05-20",

"bio":"this is bio"

}

### Login Route

`http://localhost:4000/api/v1/login/`

Data To Pass Into Request

Ex :-

{

"email": "test@test.com",

"password": "123456789"

}

-> Returns a accesstoken

### User Profile Route (Proctected Route ,Only accessed by use of accesstoken )

`http://localhost:4000/api/v1/userProfile/showUserProfile/`

->Use a Authorization header and put value in it like this: Bearer acccesstoken

->It returns the particular user data whose accesstoken is given in the header

### User Search Route (Proctected Route ,Only accessed by use of accesstoken )

`http://localhost:4000/api/v1/userProfile/searchUser/`

Data To Pass Into Request

Ex :-

{

"searchterm":"test"

}

->It returns the 10 results at a time from the search

Like This Data

{

"username": "test",

"user_id": "a729a41b-f439-48d5-925e-67ba6fc7fe20",

"id": 2

}

->For the first time it will the first matched 10 results

->For the next 10 results , Pagination is used

->Store the last user `id` from the first 10 results to get next 10 results after that `id`

Data To Pass Into Request For Pagination

Ex :-

{

"searchterm":"test",

"last_seen_id":2

}
