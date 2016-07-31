export const GET_PLACES_REQUEST = 'GET_PLACES_REQUEST';
export const GET_PLACES_SUCCESS = 'GET_PLACES_SUCCESS';
export const GET_PLACES_FAILURE = 'GET_PLACES_FAILURE';

export function getPlaces({ latitude, longitude }) {
  return {
    types: [GET_PLACES_REQUEST, GET_PLACES_SUCCESS, GET_PLACES_FAILURE],
    endpoint: {
      url: `/api/places?lat=${latitude}&lon=${longitude}`,
    },
  };
}
