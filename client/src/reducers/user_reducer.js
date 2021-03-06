import { 
    CREATE_USER,  LOGIN_USER,  CONFIG_USER,
    LOGOUT, POST_SOLVED
} from '../actions';

export default function(state=null, action) {
  switch (action.type) {
    case CREATE_USER:
      return action.payload;
    case LOGIN_USER:
      return action.payload;
    case CONFIG_USER:
      return action.payload;
      case POST_SOLVED:
      return action.payload;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}
