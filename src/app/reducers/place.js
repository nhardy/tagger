import {
  GET_PLACE_REQUEST,
  GET_PLACE_SUCCESS,
  GET_PLACE_FAILURE,
} from 'app/actions/PLACEActions';


const initialState = {

};

export default function placeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLACE_REQUEST:
      return {
        ...state,
      };

    case GET_PLACE_SUCCESS:
      return {
        ...state,
        items: action.response.items,
      };

    case GET_PLACE_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
}
