import {useReducer, createContext} from 'react';

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_NEARBY_RESTAURANTS: 'SET_NEARBY_RESTAURANTS',
  SET_NEARBY_RESTAURANT_PHOTO_URLS: 'SET_NEARBY_RESTAURANT_PHOTO_URLS'
}

const storeReducer = (state, action) => {
  switch(action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return {...state, latLong: action.payload}
    }
    case ACTION_TYPES.SET_NEARBY_RESTAURANTS: {
      return {...state, nearbyRestaurants: action.payload}
    }
    case ACTION_TYPES.SET_NEARBY_RESTAURANT_PHOTO_URLS: {
      return {...state, nearbyRestaurantPhotoUrls: action.payload}
    }
    default: {
      return state
    }
  }
} 

const StoreProvider = ({children}) => {
  const initialState = {
    latLong: "",
    nearbyRestaurants: [],
    nearbyRestaurantPhotoUrls: []
  }

  const [state, dispatch] = useReducer(storeReducer, initialState)

  return (
    <StoreContext.Provider value = {{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider;