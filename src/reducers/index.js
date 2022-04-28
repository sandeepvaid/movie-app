import { combineReducers } from "redux";
import {
  ADD_MOVIES,
  ADD_FAVOURITES,
  REMOVE_FAVOURITES,
  SET_SHOW_FAVOURITES,
} from "../actions";

const movieInitialState = {
  list: [],
  favourites: [],
  showFavourites: false,
};

export function movies(state = movieInitialState, action) {
  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        list: action.movies,
      };
    case ADD_FAVOURITES:
      return {
        ...state,
        favourites: [action.movie, ...state.favourites],
      };

    case REMOVE_FAVOURITES:
      const newFav = state.favourites.filter((fav) => fav != action.movie);
      return {
        ...state,
        favourites: newFav,
      };
    case SET_SHOW_FAVOURITES:
      return {
        ...state,
        showFavourites: action.val,
      };
    default:
      return state;
  }
}

const initialSearchState = {
  result: {},
};
export function search(state = initialSearchState, action) {
  return state;
}

export default combineReducers({
  movies,
  search,
});
