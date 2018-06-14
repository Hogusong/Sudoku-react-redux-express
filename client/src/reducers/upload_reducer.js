import { CONFIG_UPLOAD } from '../actions';

export default function(state=null, action) {
  switch (action.type) {
    case CONFIG_UPLOAD:
      return action.payload;
    default:
      return state;
  }
}
