import { UPLOAD_PUZZLE} from '../actions'

export default function(state=[], action) {
  switch (action.type) {
    case UPLOAD_PUZZLE:
      return action.payload;
    default:
      return state;
  }
}
