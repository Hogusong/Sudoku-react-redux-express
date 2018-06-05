import { combineReducers } from 'redux';
import PuzzleReducer from './puzzle_reducer';

const rootReducer = combineReducers({
  puzzle: PuzzleReducer
});

export default rootReducer;
