import { Global } from '../global';
import { CREATE_USER, LOGIN_USER, LOGOUT } from '../actions';

export default function(state=null, action) {
  switch (action.type) {
    case CREATE_USER:
      Global.name = action.payload.username;
      return action.payload;
    case LOGIN_USER:
      Global.name = action.payload.username;
      return action.payload;
    case LOGOUT:
      Global.name = '';
      return null;
    default:
      return state;
  }
}
