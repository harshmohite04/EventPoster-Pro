Done 
[POST] https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/send-otp  
request:- 
{
  "phoneNumber": "+917737433828"
}
response:-
{
  "message": "OTP sent successfully!",
  "sid": "SM01e8837018821602be64a8fca0fd9efb"
}

Done
[POST] https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/verify-otp
request:- 
{
  "phoneNumber": "+917737433828",
  "otp": "123456"
}
response:-
{
  "success": true,
  "message": "OTP verified successfully!!!",
  "authToken": "(authToken)"
}

DONE
[GET] https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/getuser
Headers:- 
auth-token: (authToken)
request:-
{}
response:-
{
  "_id": "6741e48bab6f062e5b0d25e3",
  "name": "User",
  "phone": 917737433828,
  "profilePic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  "isAdmin": false,
  "date": "2024-11-23T14:19:55.033Z",
  "__v": 0
}

DONE
[DEL] https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/deleteaccount
Headers:- 
auth-token: (authToken)
request:-
{}
response:-
{
  "success": true,
  "message": "User account and all associated templets have been deleted successfully"
}


[PUT] https://event-poster-pro1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/updateProfile 
Headers:- 
auth-token: (authToken) 
request:- 
{ 
  "name": "Raju Choudhary", 
  "email": "rajusirvi098@gmail.com", 
  "businessName": "fffff", 
  "websiteLink": "www.google.com", 
  "Logo": ("upload image"),
  "photo": ("upload image")
} 
response:- 
{ 
    "success": true, 
    "message": "Profile updated successfully", 
    "user": { 
        "id": "675edd1bdeb9485b2baac981", 
        "name": "jay", 
        "email": "example@gmail.com", 
        "businessName": "fffff", 
        "websiteLink": "www.google.com", 
        "photo": 
"https://res.cloudinary.com/dpstjxsrh/image/upload/v1734270298/profile_photos/spciqeae9qrvvjy7jali.png", "logo": 
"https://res.cloudinary.com/dpstjxsrh/image/upload/v1734270299/profile_logos/iupcecp1zatdvsw80rcr.png" 
    } 
} 

Done
[POST] https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/auth/logout
Headers:-
auth-token: (authToken)
request:-
{
}
response:-
{
  "success": true,
  "message": "Logout successful"
}
Done
[GET] https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/templets/fetchtemplets
Headers:-
auth-token: (authToken)
request:-
{}
response:-
[
  {
    "_id": "6741e6e9ab6f062e5b0d25e9",
    "title": "happy holi",
    "image": "https://res.cloudinary.com/dpstjxsrh/image/upload/v1732372199/templets/warb9nqjeutyfmjqrcmy.jpg",
    "category": "holi",
    "__v": 0
  },
    {
    "_id": "6741e6e9ab6f062e5b0d25e9",
    "title": "happy holi",
    "image": "https://res.cloudinary.com/dpstjxsrh/image/upload/v1732372199/templets/warb9nqjeutyfmjqrcmy.jpg",
    "category": "holi",
    "__v": 0
  }
]


[POST] https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/templets/addtemplet
Headers:-
auth-token: (authToken)
request:-
{
// form data
title = happy holi
category = holi
templetImage = (file upload)
}
response:-
{
    "user": "6741e48bab6f062e5b0d25e3",
    "title": "happy holi",
    "image": "https://res.cloudinary.com/dpstjxsrh/image/upload/v1732372199/templets/warb9nqjeutyfmjqrcmy.jpg",
    "category": "holi",
    "_id": "6741e6e9ab6f062e5b0d25e9",
    "date": "2024-11-23T14:30:01.697Z",
    "__v": 0
}


[DEL] https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/templets/deletetemplet/:imageid  > image id
Headers:-
auth-token: (authToken)
request:-
{}
response:-
{
  "message": "Templet and its image have been deleted",
  "templetId": "6741e6e9ab6f062e5b0d25e9"
}


[GET] https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/admin/getallusers
Headers:-
auth-token: (authToken)
request:-
{}
response:-
[
  {
    "_id": "675c6d76dfa8e28946a258ed",
    "name": "raju choudhary",
    "phone": 917737433828,
    "profilePic": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "isAdmin": true,
    "isBanned": false,
    "email": "example@gmail.com"
  }
]

[PUT] https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/admin/updateadminstatus/:userid
Headers:-
auth-token: (authToken)
request:-
{}
response:-
{
  "success": true,
  "message": "Admin status updated successfully"
}

[PUT] https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/admin/banuser/:userid
Headers:-
auth-token: (authToken)
request:-
{}
response:-
{
  "message": "User has been banned successfully",
  "user": {
    "id": "675d3e1eba5a1576cc64bd06",
    "name": "User",
    "isBanned": true
  }
}

[PUT] https://event-poster-pro-1mllvw3hfppqkrkjmxue8whf.onrender.com/api/templets/togglevisibility/:imageid
Headers:-
auth-token: (authToken)
request:-
{}
response:-
{
  "message": "Templet visibility has been changed to hidden",
  "templet": {
    "id": "675c7288dfa8e28946a25902",
    "title": "happy holi - admin"
  }
}