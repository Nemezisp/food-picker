import styles from "./banner.module.css"
import Image from 'next/image'
import { StoreContext } from "../context/store-context";
import useLocation from "../hooks/use-location";
import PickRestaurant from "./pickRestaurant.component";
import Modal from "./modal.component";
import { useState, useRef, useEffect, useContext } from "react";

const Banner = (props) => {
    const {handleLocation, errorMessage, isFindingLocation} = useLocation();

    const {state} = useContext(StoreContext);
    const {latLong} = state;

    let isMounted = useRef(false)

    const [isModalOpen, setisModalOpen] = useState(false)
    const [shouldModalOpen, setShouldModalOpen] = useState(false)

    const handleViewNearbyButtonClick = () => {
        props.setShouldNearbyRestaurantLoad(true)
        console.log('handleview')
        handleLocation()
    }

    const handleLetUsPickButtonClick = () => {
        setShouldModalOpen(true)
    }

    const handleOpenModal = () => {
        if (shouldModalOpen) {
            console.log('shouldmodal')
            handleLocation()
        }
        if (latLong && shouldModalOpen) {
            setisModalOpen(true)
            setShouldModalOpen(false)
        }
    }

    useEffect(() => {
        if (isMounted.current) {
            handleOpenModal();
        } else {
            isMounted.current = true
        }
      }, [shouldModalOpen])

    return (
        <div className={styles.container}>
            {isModalOpen && <Modal><PickRestaurant setIsModalOpen={setisModalOpen}/></Modal>}
            <div className={styles.left_container}> 
                <h1 className={styles.title}>
                    <span className={styles.title_first_part}>Restaurant Picker</span>
                    <span className={styles.title_second_part}> Ultimativo</span>
                </h1>
                <div className={styles.small_image_container}>
                    <Image src="/static/chef.png" alt='smiling chef' height={80} width={80}/>
                </div>
                <p className={styles.subtitle}>Don&apos;t know where to eat?</p>
                {errorMessage && <p className={styles.error}>Something went wrong!</p>}
                <div className={styles.buttons}>
                    {isFindingLocation ? 
                        <button className={styles.button} onClick={() => handleViewNearbyButtonClick()}>Locating...</button>
                        : props.areNearbyRestaurantsLoading 
                        ? <button className={styles.button} onClick={() => handleViewNearbyButtonClick()}>Loading restaurants...</button>
                        : 
                        <button className={styles.button} onClick={() => handleViewNearbyButtonClick()}>View nearby places</button>
                    } 
                    {isFindingLocation ? 
                        <button className={styles.button} onClick={() => handleLetUsPickButtonClick()}>Locating...</button>
                        :
                        <button className={styles.button} onClick={() => handleLetUsPickButtonClick()}>Or let us pick for you!</button>
                    }
                </div>
            </div>
            <div className={styles.big_image_container}>
                <Image src="/static/chef.png" alt='smiling chef' height={220} width={220}/>
            </div>
        </div>
    )
}

export default Banner;