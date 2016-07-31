import {
  GET_PLACES_REQUEST,
  GET_PLACES_SUCCESS,
  GET_PLACES_FAILURE,
  GET_PLACE_REQUEST,
  GET_PLACE_SUCCESS,
  GET_PLACE_FAILURE,
} from 'app/actions/placesActions';


const initialState = {
  items: [],
};

export default function placesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLACES_REQUEST:
      return {
        ...state,
      };

    case GET_PLACES_SUCCESS:
      return {
        ...state,
        items: action.response.items,
      };

    case GET_PLACES_FAILURE:
      return {
        ...state,
      };

    case GET_PLACE_REQUEST:
      return {
        ...state,
      };

    case GET_PLACE_SUCCESS:
      const newState = {
        ...state,
      };
      const item = newState.items.filter((i) => i.id === action.response.item.id);
      if (item.length) {
        newState.items = newState.items.map((i) => {
          if (i.id === action.response.item.id) return action.response.item;
          return i;
        });
      } else {
        newState.items = [...newState.items, action.response.item];
      }
      return newState;

    case GET_PLACE_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
}
