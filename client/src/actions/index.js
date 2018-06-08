export const CREATE_USER = 'CREATE_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT = 'LOGOUT';

export const FETCH_PUZZLE = 'FETCH_PUZZLE';
export const CREATE_PUZZLE = 'CREATE_PUZZLE';

export function createUser(user) {
  const request = fetch('/user/signin/', {
    method: "post",
    headers: {
      "Access-Control-Allow-Origin": 'http://localhost:3000',
      "Access-Control-Allow-Credentials": 'true',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },      
    body: JSON.stringify(user)
  }).then(res => {
      return res.json()
    })
    .then(user => { 
      return user;
    })
  return {
    type: CREATE_USER,
    payload: request
  }
}

export function loginUser(user) {
  const request = fetch('/user/login/', {
    method: "post",
    headers: {
      "Access-Control-Allow-Origin": 'http://localhost:3000',
      "Access-Control-Allow-Credentials": 'true',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },      
    body: JSON.stringify(user)    
  })
    .then(res => {
      return res.json()
    })
    .then(user => { 
      return user;
    })
  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function logoutUser() {
  return {
    type: LOGOUT,
    payload: null
  }
}
