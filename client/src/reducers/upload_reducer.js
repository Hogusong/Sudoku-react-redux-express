import { CONFIG_UPLOAD } from '../actions';

// it may be deleted soon after confirm
export default function(state=null, action) {
  switch (action.type) {
    case CONFIG_UPLOAD:
      return action.payload;
    default:
      return state;
  }
}
