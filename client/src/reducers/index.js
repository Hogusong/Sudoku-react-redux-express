import { combineReducers } from 'redux';
import PuzzleReducer from './puzzle_reducer';
import UserReducer from './user_reducer';
import UploadReducer from './upload_reducer';

const rootReducer = combineReducers({
  puzzle: PuzzleReducer,
  user: UserReducer,
  upload_config: UploadReducer,
});

export default rootReducer;
