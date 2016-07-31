export const GET_PLACES_REQUEST = 'GET_PLACES_REQUEST';
export const GET_PLACES_SUCCESS = 'GET_PLACES_SUCCESS';
export const GET_PLACES_FAILURE = 'GET_PLACES_FAILURE';

export const GET_PLACE_REQUEST = 'GET_PLACES_REQUEST';
export const GET_PLACE_SUCCESS = 'GET_PLACES_SUCCESS';
export const GET_PLACE_FAILURE = 'GET_PLACES_FAILURE';

export const SET_PLACE = 'SET_PLACE';


export function getPlaces({ latitude, longitude }) {
  return {
    types: [GET_PLACES_REQUEST, GET_PLACES_SUCCESS, GET_PLACES_FAILURE],
    endpoint: {
      url: `/api/places?lat=${latitude}&lon=${longitude}`,
    },
  };
}

export function getPlace(id) {
  return {
    types: [GET_PLACE_REQUEST, GET_PLACE_SUCCESS, GET_PLACE_FAILURE],
    endpoint: {
      url: `/api/places/${id}`,
    },
  };
}

export function setPlace(id) {
  return {
    type: SET_PLACE,
    id,
  };
}
