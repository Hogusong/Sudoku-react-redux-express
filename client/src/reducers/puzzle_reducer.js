import { FETCH_PUZZLE} from '../actions'

export default function(state=[], action) {
  switch (action.type) {
    case FETCH_PUZZLE:
      return action.puzzle;
    default:
      return state;
  }
}
