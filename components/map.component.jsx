import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import styles from "./map.module.css";

const Map = ({latlong, restaurantName}) => {
    return (
        <MapContainer className={styles.mapContainer} center={latlong} zoom={16} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={latlong}>
                <Popup>
                    <h2>{restaurantName}</h2>
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map