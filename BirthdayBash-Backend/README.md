# Api Routes

## Sign Up Route(POST Request)

> **`http://localhost:4000/api/v1/signup`**

- **Gender Should Only Contain male/female/hidden/other**

**Data To Pass Into Request
Ex:-**

```
{
"username":"test" ,
"email":"test@test.com",
"password":"123456789",
"dob":"2021-05-20",
"gender":"male",
"bio":"this is bio"
}
```

## Login Route(POST Request)

> **`http://localhost:4000/api/v1/login`**

**Data To Pass Into Request
Ex :-**

```

{
 "email": "test@test.com",
 "password": "123456789"
}

```

>

- **Returns a access , refresh token cookie that is set in the browser**

## User Profile Route(GET Request) (Proctected Route)

> **`http://localhost:4000/api/v1/userProfile/showUserProfile`**

- **It returns the particular user data**

## User Logout Route(GET Request) (Proctected Route)

> **`http://localhost:4000/api/v1/logout`**

- **It deletes the cookies from browser and logout user**

## User Search Route(GET Request) (Proctected Route)

> **`http://localhost:4000/api/v1/userProfile/searchUser`**

**Data To Pass Into Request
Ex :-**

```

{
 "searchterm":"test"
}

```

- **It returns the 10 results at a time from the search and a last_seen_id (id of the last search result).**

### **Like This Data**

```
searchResults:[
    {
    "username": "test",
    "user_id": "a729a41b-f439-48d5-925e-67ba6fc7fe20",
    "id": 2
    },
    {
    "username": "testa",
    "user_id": "a729a41b-f439-48d5-925e-67ba6fc7fe20",
    "id": 3
    }
]
```

- For the first time it will the first matched 10 results

- For the next 10 results , Pagination is used

- For next results put the **last_seen_id** in the request body.

- **last_seen_id** is automatically given by the backend when there are more than 10 results.Other than that no need to use it if results are less than 10.

**Data To Pass Into Request For Pagination
Ex :-**

```

{
 "searchterm":"test",
 "last_seen_id":3
}

```

## User Edit Profile Route(PUT Request) (Proctected Route)

> **`http://localhost:4000/api/v1/userProfile/editProfile`**

**Data To Pass Into Request
Ex :-**

```

{
 "newUsername":"test",
 "newPassword":"testpasswrd",
 "newBio":"test bio",
}

```

- **When changing password "currentPassword" should be sent with the request body**
  <br>

```
{
"currentPassword":"testpass123",
"newPassword":"testpasswrd",
}
```

<br>

- **User have the ability to change one property at a time , So it is not important to send all the properties in one request**

### **Like This Data**

```

{
"newUsername": "test new username",
}

```

## Show Specific User Profile Route(GET Request) (Proctected Route)

> **`http://localhost:4000/api/v1/userProfile/showUserProfile/:id`**

- In this id of the user to see data of is passed into the parameters **id** in the url .
- This Route is used when a user visits the user profile of some other user
- For seeing his/her own profile the showUserProfile route is used:
  **`http://localhost:4000/api/v1/userProfile/showUserProfile`**

## Follow A User Route(POST Request) (Proctected Route)

> **`http://localhost:4000/api/v1/userProfile/follow`**

- user id is passed to userToFollow in the request body.

### **Like This Data**

```

{
"userToFollow": "a729a41b-f439-48d5-925e-67ba6fc7fe20",
}
```

## Unfollow A User Route(DELETE Request) (Proctected Route)

> **`http://localhost:4000/api/v1/userProfile/unfollow`**

- user id is passed to userToUnFollow in the request body.

### **Like This Data**

```

{
"userToUnFollow": "a729a41b-f439-48d5-925e-67ba6fc7fe20",
}
```

## User Home Timeline Route(DELETE Request) (Proctected Route)

> **`http://localhost:4000/api/v1/userProfile/home`**

- For the first time it will the first matched 10 results whom user **follow**.

- For the next 10 results , Pagination is used.

- For next results put the **last_seen_id** in the request body.

- **last_seen_id** is automatically given by the backend when there are more than 10 results.Other than that no need to use it if results are less than 10.

### **Like This Data**

```

{
"last_seen_id": 2,
}
```
