import { useContext, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../context/store-context";

const useLocation = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [isFindingLocation, setIsFindingLocation] = useState(false)
 
    const {dispatch} = useContext(StoreContext)

    const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        dispatch({
            type: ACTION_TYPES.SET_LAT_LONG,
            payload: `${latitude},${longitude}`
        })
        setErrorMessage('');
        setIsFindingLocation(false)
    }
 
    const error = () => {
        setErrorMessage('Unable to retrieve your location');
        setIsFindingLocation(false)
    }

    const handleLocation = () => {
        console.log('test')
        setIsFindingLocation(true)
        if(!navigator.geolocation) {
            setErrorMessage('Geolocation is not supported by your browser');
            setIsFindingLocation(false)
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return {handleLocation, errorMessage, isFindingLocation}
}

export default useLocation;