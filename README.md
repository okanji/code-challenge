# Our Places

**Overview**

The provided codebase is a simple MERN application called “Our Places”. A user can sign up to create a profile in the app. Once the profile is created, the user can log in and create a “Place” record under their own profile. A Place record includes a place title, a description, a picture and an address. Note that the address verification takes places via the call to the Google Maps API.  The record owner can also edit their records (some fields) and delete their own records. Users can only see their own records and not the records created by other users. 

**Environment Variables**

```bash
MONGODB_URI=mongodb uri
GOOGLE_MAPS_EMBEDED_API_KEY=google cloud console api key
```

**Deploy Locally**

Set environment variables 

```bash
> npm install
> npm start
```

Navigate to ***http://localhost:4000/*** in your browser

**Deploy on Heroku**

Create a new project
Link it to your github repo
Remember to set the environment variables in project settings

