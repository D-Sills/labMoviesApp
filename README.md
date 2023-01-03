# Assignment 2 - Web API.

Name: Darren Sills

## Features.

 + Feature 1 - New API Routes

 + Feature 2 - Mongo Integration for top,upcoming and now playing movies

 + Feature 3 - Mongo Integration for users and authentication using those details, instead of firebase used in previous assignment 

## Installation Requirements

```bat
git clone https://github.com/D-Sills/labMoviesApp
```

followed by installation

```bat

cd moviesAPI
npm install

cd reactApp
npm install

```

## API Configuration
The .env should look the following:

```bat

REACT_APP_TMDB_KEY=<TMDBKey>
FAST_REFRESH=false
MONGO_DB=mongodb+srv://<MongoUsername>:<MongoPassword>@<ClusterName>.h8fjzov.mongodb.net/?retryWrites=true&w=majority
SECRET=ilikecake
seedDb=true
DANGEROUSLY_DISABLE_HOST_CHECK=true

```
I have no idea what DANGEROUSLY_DISABLE_HOST_CHECK does but the app crashes after adding the new API stuff if I don't use it.

## API Design

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| /api/upcomming | Gets upcoming movies | N/A | N/A | N/A
| /api/top | Gets top movies | N/A | N/A | N/A
| /api/now-playing | Gets movies that are currently in cinemas | N/A | N/A | N/A
| /api/users | Gets users | user log in | N/A | N/A
| /api/users?action=register | N/A | registers a user to the DB | N/A | N/A


## Security and Authentication

Json Web Tokens are used to authenticate users. 

All routes outlined in the index.js file of the src folder should be private aside from the sign up and login routes.

## Integrating with React App

~~~Javascript
export const login = async(username, password) => {
  return fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({username: username, password:password }),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
};

export const signup = async(username, password) => {
  return fetch('/api/users?action=register', {
      method: 'POST',
      body: JSON.stringify({username: username, password: password }),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
}

export const getMovies = async() => {
  return fetch(
      '/api/movies',{headers: {'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};

export const getGenres = async() => {
  return fetch(
      '/api/genres',{headers: {'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};

export const getTopMovies = async() => {
  return fetch(
      '/api/top',{headers: {'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};

export const getUpcomingMovies = async() => {
  return fetch(
      '/api/upcomming',{headers: {'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};

~~~

## Extra features

None

## Independent learning.

None
