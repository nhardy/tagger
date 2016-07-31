import {
  GET_PLACES_REQUEST,
  GET_PLACES_SUCCESS,
  GET_PLACES_FAILURE,
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

    default:
      return state;
  }
}
