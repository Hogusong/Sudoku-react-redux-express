export const CREATE_USER = 'CREATE_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const CONFIG_USER = 'CONFIG_USER';
export const CONFIG_UPLOAD = 'CONFIG_UPLOAD';
export const LOGOUT = 'LOGOUT';
export const UPLOAD_PUZZLE = 'UPLOAD_PUZZLE';
export const GET_PUZZLE = 'GET_PUZZLE';

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

// export function configUpload(config) {
//   return {
//     type: CONFIG_UPLOAD,
//     payload: config
//   }
// }

export function configUser(username, config) {
  const request = fetch('/user/setup/', {
    method: "post",
    headers: {
      "Access-Control-Allow-Origin": 'http://localhost:3000',
      "Access-Control-Allow-Credentials": 'true',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, config })
  })
    .then(res => {
      return res.json()
    })
    .then(user => { 
      console.log('config updated:', user)
      return user;
    })
  return {
    type: CONFIG_USER,
    payload: request
  }
}

export function uploadPuzzle(username, type, puzzle) {
  const request = fetch('/puzzle/upload/', {
    method: "post",
    headers: {
      "Access-Control-Allow-Origin": 'http://localhost:3000',
      "Access-Control-Allow-Credentials": 'true',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, type, puzzle})
  })
    .then(res => {
      return res.json()
    })
    .then(respond => { 
      return respond;
    })
  return {
    type: UPLOAD_PUZZLE,
    payload: request
  }
}

export const fetchRandom = (user) => {
  const request = fetch('/puzzle/random/', {
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
    .then(respond => { 
      console.log('in fetchRandom:', respond)
      return respond;
    })
  return {
    type: GET_PUZZLE,
    payload: request
  }
}