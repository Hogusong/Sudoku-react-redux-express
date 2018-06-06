import { CREATE_USER } from '../actions'

export default function(state=[], action) {
  console.log("in user_reducer:", action)
  switch (action.type) {
    case CREATE_USER:
      return action.payload;
    default:
      return state;
  }
}
