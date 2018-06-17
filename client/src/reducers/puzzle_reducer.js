import { UPLOAD_PUZZLE, GET_PUZZLE } from '../actions'

export default function(state=[], action) {
  switch (action.type) {
    case UPLOAD_PUZZLE:
      return action.payload;
    case GET_PUZZLE:
      return action.payload;
    default:
      return state;
  }
}
