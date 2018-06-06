import { combineReducers } from 'redux';
import PuzzleReducer from './puzzle_reducer';
import UserReducer from './user_reducer';

const rootReducer = combineReducers({
  puzzle: PuzzleReducer,
  user: UserReducer
});

export default rootReducer;
