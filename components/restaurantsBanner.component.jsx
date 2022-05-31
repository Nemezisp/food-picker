import styles from "./banners.module.css";
import Image from 'next/image';
import { StoreContext } from "../context/store-context";
import useLocation from "../hooks/use-location";
import PickRestaurant from "./pickRestaurant.component";
import Modal from "./modal.component";
import { useState, useEffect, useContext } from "react";
import cls from "classnames";


const RestaurantsBanner = (props) => {
    const {handleLocation, errorMessage, isFindingLocation} = useLocation();

    const {state} = useContext(StoreContext);
    const {latLong} = state;

    const [isModalOpen, setisModalOpen] = useState(false)
    const [shouldModalOpen, setShouldModalOpen] = useState(false)

    const handleViewNearbyButtonClick = () => {
        if (!latLong) {
            props.setShouldNearbyRestaurantsLoad(true)
            handleLocation()
        } else {
            props.fetchNearbyRestaurants()
        }
    }

    const handleLetUsPickButtonClick = () => {
        if(!latLong) {
            setShouldModalOpen(true)
            handleLocation()
        } else {
            setisModalOpen(true)
        }
    }

    useEffect(() => {
        if (shouldModalOpen) {
            setisModalOpen(true)
            setShouldModalOpen(false)
        }
    }, [latLong])

    return (
        <div className={styles.container}>
            {isModalOpen && <Modal><PickRestaurant setIsModalOpen={setisModalOpen}/></Modal>}
            <div className={styles.left_container}> 
                <h1 className={styles.title}>
                    <span className={styles.title_first_part}>Restaurant Picker</span>
                    <span className={styles.color_restaurants}> Ultimativo</span>
                </h1>
                <div className={styles.small_image_container}>
                    <Image src="/static/chef.png" alt='smiling chef' height={80} width={80}/>
                </div>
                <p className={styles.subtitle}>Don&apos;t know where to eat?</p>
                {errorMessage && <p className={styles.error}>Something went wrong!</p>}
                <div className={styles.buttons}>
                    {isFindingLocation ? 
                        <button className={cls(styles.button, styles.background_restaurants)} onClick={null}>Locating...</button>
                        : props.areNearbyRestaurantsLoading 
                        ? <button className={cls(styles.button, styles.background_restaurants)} onClick={null}>Loading restaurants...</button>
                        : 
                        <button className={cls(styles.button, styles.background_restaurants)} onClick={() => handleViewNearbyButtonClick()}>View nearby places</button>
                    } 
                    {isFindingLocation ? 
                        <button className={cls(styles.button, styles.background_restaurants)} onClick={null}>Locating...</button>
                        :
                        <button className={cls(styles.button, styles.background_restaurants)} onClick={() => handleLetUsPickButtonClick()}>Or let us pick for you!</button>
                    }
                </div>
            </div>
            <div className={styles.big_image_container}>
                <Image src="/static/chef.png" alt='smiling chef' height={220} width={220}/>
            </div>
        </div>
    )
}

export default RestaurantsBanner;