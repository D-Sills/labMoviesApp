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

export const getInCinema = async() => {
  return fetch(
      '/api/now-playing',{headers: {'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};