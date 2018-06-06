import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';
export const CREATE_USER = 'CREATE_USER';
export const FETCH_PUZZLE = 'FETCH_PUZZLE';
export const CREATE_PUZZLE = 'CREATE_PUZZLE';

// const ROOT_URL = "http://reduxblog.herokuapp.com/api";
// const API_KEY = "?key=hogu1234";

export function fetchUser(data) {
  const request = axios.get('/user/', data);
  return {
    type: FETCH_USER,
    payload: request
  }
} 

export function createUser(user) {
  // const request = axios.post('/user/signin', user);
  console.log("user to save:", user)
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
      console.log('user saved:',user); 
      return user;
    })
  return {
    type: CREATE_USER,
    payload: request
  }
  
}

  export function fetchPuzzle(data) {
  const request = axios.get('/puzzle/', data);
  return {
    type: FETCH_PUZZLE,
    payload: request
  }
} 

export function createPuzzle(puzzle, callback) {
  const request = axios.post('/puzzle/', puzzle)
    .then(()=> callback());
  return {
    type: CREATE_PUZZLE,
    payload: request
  }
}
